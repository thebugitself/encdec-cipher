import React from "react";

function OutputEncrypt({ cipherText }) {
  if (!cipherText) return null;

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Hasil Enkripsi:</h3>
      <textarea
        readOnly
        value={cipherText}
        placeholder="Hasil enkripsi akan muncul di sini"
        className="w-full p-2 border border-gray-300 rounded resize-none"
      />
    </div>
  );
}

export default OutputEncrypt;
