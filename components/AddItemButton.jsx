import React, { useState } from 'react';

export default function AddItemButton({ listName, onAdd }) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value.trim(), listName);
    setValue('');
  };

  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Aggiungi a ${listName}…`}
        className="input"
      />
      <button onClick={handleAdd} className="btn btn-primary">+</button>
    </div>
  );
}
