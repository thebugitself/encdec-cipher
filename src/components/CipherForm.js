import React from "react";

function CipherForm({ onCipherChange, onKeyChange, onAction }) {
  return (
    <div>
      <select onChange={(e) => onCipherChange(e.target.value)}>
        <option value="vigenere">Vigenere Cipher Standard</option>
        <option value="autokey">Vigenere Cipher Autokey</option>
      </select>
      <input
        type="text"
        placeholder="Masukkan kunci"
        onChange={(e) => onKeyChange(e.target.value)}
      />
      <button onClick={() => onAction("encrypt")}>Enkripsi</button>
      <button onClick={() => onAction("decrypt")}>Dekripsi</button>
    </div>
  );
}

export default CipherForm;
