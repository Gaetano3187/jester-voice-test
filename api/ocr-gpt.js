export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { base64Image } = req.body || {};
  if (!base64Image) {
    res.status(400).json({ error: 'Missing base64Image' });
    return;
  }

  if (base64Image.length > 10 * 1024 * 1024) {
    res.status(413).json({ error: 'Payload Too Large' });
    return;
  }

  const messages = [
    {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: { url: base64Image }
        },
        {
          type: 'text',
          text: 'Estrai i prodotti e le quantità dallo scontrino.'
        }
      ]
    }
  ];

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages,
        max_tokens: 200
      })
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      res.status(openaiRes.status).send(err);
      return;
    }

    const data = await openaiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}
