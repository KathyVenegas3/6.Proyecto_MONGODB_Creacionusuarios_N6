import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function suggestTaskTitles(context) {
  const prompt = `Genera 5 títulos breves de tareas sobre: ${context}. Devuelve JSON {"ideas":[...]}`
  const res = await client.responses.create({ model: "gpt-4.1-mini", input: prompt });
  const text = res.output_text || "";
  try { return JSON.parse(text); } catch { return { ideas: text.split("\n").filter(Boolean).slice(0,5) }; }
}
