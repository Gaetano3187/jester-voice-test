(function() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const recognition = new SpeechRecognition();
  recognition.lang = 'it-IT';
  recognition.interimResults = false;

  window.startVoiceRecognition = function() {
    recognition.start();
  };

  recognition.addEventListener('result', e => {
    const text = e.results[0][0].transcript;
    processCommand(text);
  });

  function processCommand(text) {
    const lower = text.toLowerCase();
    const db = window.commandsDB || {};
    const listEl = document.getElementById('list');
    let item = '';

    if (matchAndExtract(db.add)) {
      addItem(item);
    } else if (matchAndExtract(db.remove)) {
      removeItem(item);
    } else if (matchAndExtract(db.markPurchased)) {
      markPurchased(item);
    } else if (db.clearList && db.clearList.some(p => lower.includes(p))) {
      listEl.innerHTML = '';
    } else if (db.showList && db.showList.some(p => lower.includes(p))) {
      alert(Array.from(listEl.children).map(li => li.innerText).join('\n'));
    }

    function matchAndExtract(arr) {
      if (!Array.isArray(arr)) return false;
      for (const phrase of arr) {
        if (lower.startsWith(phrase + ' ')) {
          item = lower.slice(phrase.length).trim();
          return true;
        }
      }
      return false;
    }
  }

  function addItem(name) {
    if (!name) return;
    const li = document.createElement('li');
    li.textContent = name;
    li.setAttribute('role', 'listitem');
    li.setAttribute('aria-checked', 'false');
    li.addEventListener('click', () => {
      const checked = li.classList.toggle('checked');
      li.setAttribute('aria-checked', checked ? 'true' : 'false');
    });
    document.getElementById('list').appendChild(li);
  }

  function removeItem(name) {
    const items = document.querySelectorAll('#list li');
    items.forEach(li => {
      if (li.textContent === name) li.remove();
    });
  }

  function markPurchased(name) {
    const items = document.querySelectorAll('#list li');
    items.forEach(li => {
      if (li.textContent === name) {
        li.classList.add('checked');
        li.setAttribute('aria-checked', 'true');
      }
    });
  }
})();
