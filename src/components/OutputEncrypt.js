import React from "react";

function OutputDisplay({ cipherText }) {
  return (
    <div>
      <h3>Hasil Enkripsi:</h3>
      <textarea
        readOnly
        value={cipherText}
        placeholder="Hasil enkripsi akan muncul di sini"
      />
    </div>
  );
}

export default OutputDisplay;
