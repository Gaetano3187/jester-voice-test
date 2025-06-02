import React from 'react';

export default function ChatAssistButton({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      title="Apri ChatGPT Operator"
      className="btn btn-secondary"
      style={{ marginLeft: 8 }}
    >
      💬 Chat Assist
    </button>
  );
}
