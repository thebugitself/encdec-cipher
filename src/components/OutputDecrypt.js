import React from "react";

function OutputDisplay({ plainText }) {
  return (
    <div>
      <h3>Hasil Dekripsi:</h3>
      <textarea
        readOnly
        value={plainText}
        placeholder="Hasil dekripsi akan muncul di sini"
      />
    </div>
  );
}

export default OutputDisplay;
