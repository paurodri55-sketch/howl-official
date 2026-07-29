#!/usr/bin/env node
// CLI para el "diseñador gráfico" HOWL conectado a Gemini (Google AI Studio).
// Uso:
//   node scripts/gemini-designer.mjs review <imagen.png> ["pregunta opcional"]
//   node scripts/gemini-designer.mjs generate "<prompt>" <salida.png>
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function loadApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envPath = join(ROOT, ".env.local");
  if (existsSync(envPath)) {
    const line = readFileSync(envPath, "utf8")
      .split("\n")
      .find((l) => l.startsWith("GEMINI_API_KEY="));
    if (line) return line.slice("GEMINI_API_KEY=".length).trim();
  }
  throw new Error("No se encontró GEMINI_API_KEY (ni en env ni en .env.local)");
}

const API_KEY = loadApiKey();
const TEXT_MODEL = "gemini-flash-latest";
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
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts }] }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Gemini API error ${res.status}: ${JSON.stringify(data.error ?? data)}`);
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
  } else {
    console.error('Uso:\n  gemini-designer.mjs review <imagen.png> ["pregunta"]\n  gemini-designer.mjs generate "<prompt>" <salida.png>');
    process.exit(1);
  }
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
