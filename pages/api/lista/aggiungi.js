// pages/api/lista/aggiungi.js

import data from './data';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito. Usa POST.' });
    return;
  }

  const { userId, lista, prodotti } = req.body;

  // Se manca userId o lista o prodotti
  if (!lista || !prodotti || !Array.isArray(prodotti)) {
    res.status(400).json({ error: 'Payload non conforme.' });
    return;
  }

  // Default a “default” se userId non presente
  const u = userId || 'default';

  // Se l’utente non esiste ancora, lo inizializziamo
  if (!data[u]) {
    data[u] = { supermercato: [], online: [] };
  }

  // Validazione “lista”
  if (!['supermercato', 'online'].includes(lista)) {
    res.status(400).json({ error: 'Tipo di lista non valido.' });
    return;
  }

  // Per ciascun prodotto, creiamo un’etichetta e aggiungiamo
  prodotti.forEach((p) => {
    const nome = p.nome.trim();
    const qty  = p.quantita || 1;
    const un   = p.unita || '';
    const label = qty > 1 ? `${qty} ${un} ${nome}` : nome;
    data[u][lista].push(label);
  });

  // Risposta: array aggiornato
  res.status(200).json({
    success: true,
    items: data[u][lista]
  });
}
