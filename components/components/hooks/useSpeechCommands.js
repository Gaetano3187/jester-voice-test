import { useEffect } from 'react';

export default function useSpeechCommands(handlers) {
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT';
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log('[Speech]', transcript);

      if (transcript.includes('apri assistente')) handlers.onOpenChat?.();
      if (transcript.includes('scansiona scontrino')) handlers.onScanReceipt?.();

      const addMatch = transcript.match(/aggiungi (.+) a lista (.+)/);
      if (addMatch) handlers.onAdd?.(addMatch[1], addMatch[2]);

      const delMatch = transcript.match(/rimuovi (.+) da lista (.+)/);
      if (delMatch) handlers.onDelete?.(delMatch[1], delMatch[2]);
    };

    recognition.start();
    return () => recognition.stop();
  }, [handlers]);
}
