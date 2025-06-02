// pages/api/lista/rimuovi.js

import data from './data';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito. Usa POST.' });
    return;
  }

  const { userId, lista, prodotto } = req.body;

  if (!lista || !prodotto) {
    res.status(400).json({ error: 'Payload non conforme.' });
    return;
  }

  const u = userId || 'default';
  if (!data[u]) {
    data[u] = { supermercato: [], online: [] };
  }

  if (!['supermercato', 'online'].includes(lista)) {
    res.status(400).json({ error: 'Tipo di lista non valido.' });
    return;
  }

  // Trova la prima occorrenza di un elemento che contenga la stringa “prodotto”
  const idx = data[u][lista].findIndex(item =>
    item.toLowerCase().includes(prodotto.toLowerCase())
  );
  if (idx !== -1) {
    data[u][lista].splice(idx, 1);
  }

  res.status(200).json({
    success: true,
    items: data[u][lista]
  });
}
