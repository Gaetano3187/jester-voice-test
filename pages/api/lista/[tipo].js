// pages/api/lista/[tipo].js

import data from './data';

export default function handler(req, res) {
  const {
    query: { tipo }
  } = req;

  // Only GET method allowed
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Metodo non consentito. Usa GET.' });
    return;
  }

  // Validiamo il tipo di lista
  if (!['supermercato', 'online'].includes(tipo)) {
    res.status(400).json({ error: 'Tipo di lista non valido.' });
    return;
  }

  // UserId fisso “default” per questo demo
  const userId = 'default';
  // Ritorniamo l’array di stringhe
  res.status(200).json({
    items: data[userId][tipo]
  });
}
