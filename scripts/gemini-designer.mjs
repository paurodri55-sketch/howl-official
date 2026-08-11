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

async function callGemini(model, parts) {
  const url = USE_VERTEX
    ? `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${model}:generateContent`
    : `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
  const headers = { "Content-Type": "application/json" };
  if (USE_VERTEX) headers.Authorization = `Bearer ${getVertexAccessToken()}`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ contents: [{ role: "user", parts }] }),
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
  } else {
    console.error('Uso:\n  gemini-designer.mjs review <imagen.png> ["pregunta"]\n  gemini-designer.mjs generate "<prompt>" <salida.png>\n  gemini-designer.mjs edit <entrada.png> "<instrucción>" <salida.png>\n  gemini-designer.mjs compose "<prompt>" <salida.png> <ref1.png> [ref2.png ...]');
    process.exit(1);
  }
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
