#!/usr/bin/env node
// CLI para el "diseñador gráfico" HOWL conectado a Gemini.
// Método principal: Vertex AI (usa el crédito gratuito de Google Cloud),
// vía Application Default Credentials — requiere VERTEX_PROJECT_ID
// explícito (env o .env.local), sin project ID por defecto quemado en el
// código.
//   Setup: gcloud auth application-default login
//          gcloud auth application-default set-quota-project <PROJECT_ID>
//          export VERTEX_PROJECT_ID=<PROJECT_ID> (o añadir a .env.local)
// Fallback automático: si no hay VERTEX_PROJECT_ID configurado, usa la API
// key de Google AI Studio (GEMINI_API_KEY) en su lugar.
// Uso:
//   node scripts/gemini-designer.mjs review <imagen.png> ["pregunta opcional"]
//   node scripts/gemini-designer.mjs generate "<prompt>" <salida.png>
//   node scripts/gemini-designer.mjs edit <imagen_entrada.png> "<instrucción>" <salida.png>
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function readEnvLocal(key) {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return undefined;
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : undefined;
}

const API_KEY = process.env.GEMINI_API_KEY || readEnvLocal("GEMINI_API_KEY");
const VERTEX_PROJECT_ID = process.env.VERTEX_PROJECT_ID || readEnvLocal("VERTEX_PROJECT_ID");
const USE_VERTEX = Boolean(VERTEX_PROJECT_ID);

if (!API_KEY && !VERTEX_PROJECT_ID) {
  throw new Error(
    "No se encontró GEMINI_API_KEY ni VERTEX_PROJECT_ID (env o .env.local). Configura al menos uno."
  );
}

function getVertexAccessToken() {
  try {
    return execSync("gcloud auth application-default print-access-token", {
      encoding: "utf8",
    }).trim();
  } catch {
    throw new Error(
      "No hay credenciales de Application Default Credentials. Corre: gcloud auth application-default login"
    );
  }
}

const LOCATION = process.env.VERTEX_LOCATION || "us-central1";
const TEXT_MODEL = "gemini-2.5-flash";
const IMAGE_MODEL = "gemini-2.5-flash-image";
// Fast tier por defecto: más barato e iterativo. Para calidad final usar
// VEO_MODEL=veo-3.1-generate-001 (o pasar "standard" como 5º argumento CLI).
const VIDEO_MODEL_FAST = "veo-3.1-fast-generate-001";
const VIDEO_MODEL_STANDARD = "veo-3.1-generate-001";
const TTS_MODEL = "gemini-2.5-flash-tts";

const DESIGNER_PERSONA = `Eres el Director de Arte y Diseñador Jefe autónomo de la marca de ropa urbana HOWL.

## ADN estético de la marca
- Atemporalidad vintage: gráficos y texturas que evocan estéticas de culto de los 70-80, con
  ejecución técnica actual, limpia y de alta gama.
- La tipografía como protagonista: ilustraciones potentes combinadas con textos tipográficos de
  gran carácter (retro, bold, serifas marcadas o letreros de estilo cartel).
- Narrativa underground: cada diseño cuenta una historia, encarna una subcultura (motera, musical,
  alternativa, futurista o de estilo de vida).
- Paleta base: negro, blanco, rojo, verde oliva y azul marino, con coherencia cromática entre
  colecciones.

## Criterio de calidad (no negociable)
Prioridad absoluta: que el diseño NO parezca generado por IA. Puede parecer perfectamente un dibujo
o ilustración hecha a mano por un buen ilustrador — eso es aceptable y deseable. Lo que se rechaza
siempre: renders 3D glossy, brillos plásticos, geometría/anatomía rota, composición de "sticker"
centrado sin personalidad, sombras de Photoshop mal aplicadas, manchas o artefactos flotantes, halos
o recuadros de fondo mal recortados. Sé directo, técnico y crítico como un director de arte senior
— nada de cumplidos vacíos. Responde siempre en español.`;

async function callGemini(model, parts, extraBody = {}) {
  const url = USE_VERTEX
    ? `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${model}:generateContent`
    : `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
  const headers = { "Content-Type": "application/json" };
  if (USE_VERTEX) headers.Authorization = `Bearer ${getVertexAccessToken()}`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ contents: [{ role: "user", parts }], ...extraBody }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Vertex AI error ${res.status}: ${JSON.stringify(data.error ?? data)}`);
  }
  return data;
}

async function review(imagePath, question) {
  const imgBuffer = readFileSync(imagePath);
  const b64 = imgBuffer.toString("base64");
  const mimeType = imagePath.endsWith(".jpg") || imagePath.endsWith(".jpeg")
    ? "image/jpeg"
    : "image/png";
  const prompt = question
    || "Critica esta foto de producto: composición, contraste, integración del estampado en la tela, y si algo delata que es IA. Sé concreto y señala coordenadas/zonas si ves defectos.";
  const data = await callGemini(TEXT_MODEL, [
    { text: `${DESIGNER_PERSONA}\n\n${prompt}` },
    { inline_data: { mime_type: mimeType, data: b64 } },
  ]);
  const text = data.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text;
  console.log(text ?? JSON.stringify(data, null, 2));
}

async function generate(prompt, outputPath) {
  const data = await callGemini(IMAGE_MODEL, [
    { text: `${DESIGNER_PERSONA}\n\nGenera esta imagen: ${prompt}` },
  ]);
  const imgPart = data.candidates?.[0]?.content?.parts?.find((p) => p.inline_data || p.inlineData);
  const inline = imgPart?.inline_data ?? imgPart?.inlineData;
  if (!inline) {
    console.error("No se recibió imagen. Respuesta completa:");
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  writeFileSync(outputPath, Buffer.from(inline.data, "base64"));
  console.log("Guardado en", outputPath);
}

async function edit(imagePath, instruction, outputPath) {
  const imgBuffer = readFileSync(imagePath);
  const b64 = imgBuffer.toString("base64");
  const mimeType = imagePath.endsWith(".jpg") || imagePath.endsWith(".jpeg")
    ? "image/jpeg"
    : "image/png";
  const data = await callGemini(IMAGE_MODEL, [
    { text: `${DESIGNER_PERSONA}\n\nEdita esta imagen exacta según esta instrucción, sin cambiar nada más (mismo encuadre, mismo diseño, misma composición, solo el cambio pedido): ${instruction}` },
    { inline_data: { mime_type: mimeType, data: b64 } },
  ]);
  const imgPart = data.candidates?.[0]?.content?.parts?.find((p) => p.inline_data || p.inlineData);
  const inline = imgPart?.inline_data ?? imgPart?.inlineData;
  if (!inline) {
    console.error("No se recibió imagen editada. Respuesta completa:");
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  writeFileSync(outputPath, Buffer.from(inline.data, "base64"));
  console.log("Guardado en", outputPath);
}

async function compose(prompt, outputPath, refPaths) {
  const parts = [
    {
      text: `${DESIGNER_PERSONA}\n\nTe adjunto ${refPaths.length} imagen(es) de referencia. Úsalas EXACTAMENTE como se indique en las instrucciones (p.ej. reproducir un crest/artwork tal cual sin rediseñarlo, o mantener una forma/silueta/paleta exacta de una referencia), combinándolas en una imagen final nueva. Instrucciones: ${prompt}`,
    },
  ];
  for (const refPath of refPaths) {
    const buf = readFileSync(refPath);
    const mimeType = refPath.endsWith(".jpg") || refPath.endsWith(".jpeg") ? "image/jpeg" : "image/png";
    parts.push({ inline_data: { mime_type: mimeType, data: buf.toString("base64") } });
  }
  const data = await callGemini(IMAGE_MODEL, parts);
  const imgPart = data.candidates?.[0]?.content?.parts?.find((p) => p.inline_data || p.inlineData);
  const inline = imgPart?.inline_data ?? imgPart?.inlineData;
  if (!inline) {
    console.error("No se recibió imagen. Respuesta completa:");
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  writeFileSync(outputPath, Buffer.from(inline.data, "base64"));
  console.log("Guardado en", outputPath);
}

function writeWav(pcmBuffer, outputPath, sampleRate = 24000) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcmBuffer.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcmBuffer.length, 40);
  writeFileSync(outputPath, Buffer.concat([header, pcmBuffer]));
}

async function generateSpeech(text, outputPath, { voice = "Kore", languageCode = "es-ES" } = {}) {
  const data = await callGemini(TTS_MODEL, [{ text }], {
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        languageCode,
        voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } },
      },
    },
  });
  const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inline_data || p.inlineData);
  const inline = part?.inline_data ?? part?.inlineData;
  if (!inline) {
    console.error("No se recibió audio. Respuesta completa:");
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  const pcm = Buffer.from(inline.data, "base64");
  writeWav(pcm, outputPath);
  console.log("Guardado en", outputPath);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateVideo(prompt, outputPath, { aspectRatio, durationSeconds, quality, refImagePath } = {}) {
  if (!USE_VERTEX) {
    throw new Error(
      "generate-video requiere Veo 3.1, solo disponible vía Vertex AI. Configura VERTEX_PROJECT_ID en .env.local."
    );
  }
  const model = quality === "standard" ? VIDEO_MODEL_STANDARD : VIDEO_MODEL_FAST;
  const startUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${model}:predictLongRunning`;
  const fetchOpUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${model}:fetchPredictOperation`;

  const instance = { prompt };
  if (refImagePath) {
    const buf = readFileSync(refImagePath);
    const mimeType = refImagePath.endsWith(".jpg") || refImagePath.endsWith(".jpeg") ? "image/jpeg" : "image/png";
    instance.image = { bytesBase64Encoded: buf.toString("base64"), mimeType };
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getVertexAccessToken()}`,
  };

  const startRes = await fetch(startUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      instances: [instance],
      parameters: {
        aspectRatio: aspectRatio || "9:16",
        durationSeconds: durationSeconds || 8,
        sampleCount: 1,
      },
    }),
  });
  const startData = await startRes.json();
  if (!startRes.ok) {
    if (startRes.status === 429) {
      throw new Error("429 rate limit de Vertex/Veo — parar aquí, no reintentar en bucle.");
    }
    throw new Error(`Veo error ${startRes.status}: ${JSON.stringify(startData.error ?? startData)}`);
  }
  const operationName = startData.name;
  if (!operationName) {
    throw new Error(`No se recibió nombre de operación. Respuesta: ${JSON.stringify(startData)}`);
  }

  console.log("Operación de vídeo en marcha:", operationName);
  const MAX_POLLS = 30;
  const POLL_INTERVAL_MS = 10000;
  for (let i = 0; i < MAX_POLLS; i++) {
    await sleep(POLL_INTERVAL_MS);
    const pollRes = await fetch(fetchOpUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ operationName }),
    });
    const pollData = await pollRes.json();
    if (!pollRes.ok) {
      if (pollRes.status === 429) {
        throw new Error("429 rate limit de Vertex/Veo durante el polling — parar, no reintentar en bucle.");
      }
      throw new Error(`Veo polling error ${pollRes.status}: ${JSON.stringify(pollData.error ?? pollData)}`);
    }
    if (pollData.done) {
      const video = pollData.response?.videos?.[0];
      if (!video?.bytesBase64Encoded) {
        console.error("Operación terminada sin vídeo. Respuesta completa:");
        console.error(JSON.stringify(pollData, null, 2));
        process.exit(1);
      }
      writeFileSync(outputPath, Buffer.from(video.bytesBase64Encoded, "base64"));
      console.log("Guardado en", outputPath);
      return;
    }
    console.log(`Generando... (${i + 1}/${MAX_POLLS})`);
  }
  throw new Error("Timeout esperando el vídeo (5 min). La operación puede seguir corriendo en Vertex.");
}

const [, , cmd, ...args] = process.argv;

try {
  if (cmd === "review") {
    const [imagePath, question] = args;
    if (!imagePath) throw new Error("Uso: review <imagen.png> [\"pregunta\"]");
    await review(imagePath, question);
  } else if (cmd === "generate") {
    const [prompt, outputPath] = args;
    if (!prompt || !outputPath) throw new Error('Uso: generate "<prompt>" <salida.png>');
    await generate(prompt, outputPath);
  } else if (cmd === "edit") {
    const [imagePath, instruction, outputPath] = args;
    if (!imagePath || !instruction || !outputPath) throw new Error('Uso: edit <entrada.png> "<instrucción>" <salida.png>');
    await edit(imagePath, instruction, outputPath);
  } else if (cmd === "compose") {
    // compose "<prompt>" <salida.png> <ref1.png> [ref2.png ...]
    const [prompt, outputPath, ...refPaths] = args;
    if (!prompt || !outputPath || refPaths.length === 0) {
      throw new Error('Uso: compose "<prompt>" <salida.png> <ref1.png> [ref2.png ...]');
    }
    await compose(prompt, outputPath, refPaths);
  } else if (cmd === "generate-video") {
    // generate-video "<prompt>" <salida.mp4> [aspectRatio=9:16] [durationSeconds=8] [fast|standard] [imagen_referencia.png]
    const [prompt, outputPath, aspectRatio, durationSecondsArg, quality, refImagePath] = args;
    if (!prompt || !outputPath) {
      throw new Error(
        'Uso: generate-video "<prompt>" <salida.mp4> [aspectRatio=9:16] [durationSeconds=8] [fast|standard] [imagen_referencia.png]'
      );
    }
    await generateVideo(prompt, outputPath, {
      aspectRatio,
      durationSeconds: durationSecondsArg ? Number(durationSecondsArg) : undefined,
      quality,
      refImagePath,
    });
  } else if (cmd === "generate-speech") {
    // generate-speech "<texto>" <salida.wav> [voz=Kore] [languageCode=es-ES]
    const [text, outputPath, voice, languageCode] = args;
    if (!text || !outputPath) {
      throw new Error('Uso: generate-speech "<texto>" <salida.wav> [voz] [languageCode]');
    }
    await generateSpeech(text, outputPath, { voice, languageCode });
  } else {
    console.error('Uso:\n  gemini-designer.mjs review <imagen.png> ["pregunta"]\n  gemini-designer.mjs generate "<prompt>" <salida.png>\n  gemini-designer.mjs edit <entrada.png> "<instrucción>" <salida.png>\n  gemini-designer.mjs compose "<prompt>" <salida.png> <ref1.png> [ref2.png ...]\n  gemini-designer.mjs generate-video "<prompt>" <salida.mp4> [aspectRatio] [durationSeconds] [fast|standard] [imagen_ref.png]\n  gemini-designer.mjs generate-speech "<texto>" <salida.wav> [voz] [languageCode]');
    process.exit(1);
  }
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
