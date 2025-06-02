import { OpenAI } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      items = [],
      budgetMax = 999,
      minRating = 0,
      maxDays = 30,
    } = req.body || {};

    // Costruiamo il prompt in italiano, con istruzioni chiare per ottenere un JSON valido
    const prompt = `Sei un assistente shopping.
Ricevi una lista di prodotti e questi vincoli:
- Prezzo massimo per articolo: €${budgetMax}
- Rating venditore minimo: ${minRating}/5
- Consegna massima: ${maxDays} giorni

Rispondi **solo** con un JSON con questo schema (nessun testo extra):
[
  {
    "name": "string",
    "price": number,
    "seller": "string",
    "rating": number,
    "deliveryDays": number,
    "link": "string"
  }
]

Lista prodotti:
${items.join("\n")}`;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // oppure gpt-4o se disponibile
      temperature: 0.3,
      messages: [
        { role: "system", content: "Sei un assistente che restituisce solo JSON valido." },
        { role: "user", content: prompt },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content?.trim() || "[]";

    let results;
    try {
      results = JSON.parse(raw);
    } catch (err) {
      // Se il parsing fallisce, restituiamo il testo grezzo per debug
      return res.status(500).json({ error: "Invalid JSON from OpenAI", raw });
    }

    return res.status(200).json({ results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
