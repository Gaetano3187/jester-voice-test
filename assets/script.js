/****************** ELEMENTI ******************/
const lista     = document.getElementById('lista');
const btnAdd    = document.getElementById('btn-add');
const btnVoice  = document.getElementById('btn-voice');
const btnScan   = document.getElementById('btn-scan');

/****************** FUNZIONI ******************/
function addItem(text) {
  const li = document.createElement('li');
  li.className = 'item';
  li.innerHTML = `
    <span>${text}</span>
    <button class="btn secondary small">🗑</button>
  `;
  li.querySelector('button').addEventListener('click', () => li.remove());
  lista.appendChild(li);
}

/****************** PULSANTE + ******************/
btnAdd.addEventListener('click', () => {
  const item = prompt('Inserisci voce:');
  if (item) addItem(item);
});

/****************** VOICE CONTROL ******************/
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'it-IT';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (e) => {
    const testo = e.results[0][0].transcript;
    addItem(testo);
  };

  btnVoice.addEventListener('click', () => recognition.start());
} else {
  btnVoice.disabled = true;
  btnVoice.title = 'API non supportata';
}

/****************** SCANSIONE SCONTRINO ******************/
btnScan.addEventListener('click', async () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // OCR
    const { data: { text } } = await Tesseract.recognize(file, 'ita');
    text.split('\n').forEach(riga => {
      const cleaned = riga.trim();
      if (cleaned) addItem(cleaned);
    });
  };
  input.click();
});
