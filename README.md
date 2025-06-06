# 🤓 JESTER – Assistente Vocale per la Spesa
Web app pronta per il deploy su Vercel che unisce comandi vocali, OCR tramite GPT‑ Vision e funzioni PWA.

## Funzionalità principali
- Aggiunta e rimozione prodotti con voce o clic
- Gestione due liste: supermercato e online
- Preferiti con aggiunta rapida
- Pulsante "segna come acquistato" con statistiche dinamiche
- Import prodotti da scontrino tramite `/api/ocr-gpt`
- Generazione lista `.txt` scaricabile
- Installabile come PWA e funzionante offline
- Database frasario per comandi vocali in `voice-db.js`

## Struttura progetto
```
index.html          ─ interfaccia principale
serviceWorker.js    ─ caching offline
manifest.json       ─ configurazione PWA
api/ocr-gpt.js      ─ endpoint serverless per GPT‑ Vision
icon-192.png        ─ icona applicazione
voice-db.js         ─ elenco varianti sintattiche per i comandi
voice.js            ─ logica di riconoscimento vocale
```

## Deploy su Vercel
1. Carica il repository su GitHub
2. Collega il repo a Vercel
3. In **Settings → Environment Variables** aggiungi
   `OPENAI_API_KEY = sk-xxxxx`
4. Imposta come runtime Node 18 (necessario per `fetch`)
5. Avvia il deploy

Dopo il primo caricamento l'app potrà funzionare anche offline.
