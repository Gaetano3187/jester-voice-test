// pages/api/lista/data.js

/**
 * Questo oggetto in memoria contiene, per ogni userId, le due liste:
 *   data[userId].supermercato → array di stringhe (label prodotto)
 *   data[userId].online       → array di stringhe (label prodotto)
 *
 * In un ambiente serverless i dati restano in memoria finché la funzione
 * rimane “calda”. Può resettarsi su cold start, ma è sufficiente per un demo.
 */
const data = {
  default: {
    supermercato: [],
    online: []
  }
};

export default data;
