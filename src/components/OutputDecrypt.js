import React from "react";

function OutputDecrypt({ plainText }) {
  if (!plainText) return null;

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Hasil Dekripsi:</h3>
      <textarea
        readOnly
        value={plainText}
        placeholder="Hasil dekripsi akan muncul di sini"
        className="w-full p-2 border border-gray-300 rounded resize-none"
      />
    </div>
  );
}

export default OutputDecrypt;
