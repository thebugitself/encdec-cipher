import React, { useState } from "react";

function CipherForm({
  onCipherChange,
  onKeyChange,
  onAffineKeyChange,
  onHillKeyChange,
  onAction,
  onVigenereKeyChange,
  onTranspositionKeyChange,
}) {
  const [isAffine, setIsAffine] = useState(false);
  const [isHill, setIsHill] = useState(false);
  const [isSuper, setIsSuper] = useState(false);

  const handleCipherChange = (e) => {
    const selectedCipher = e.target.value;
    setIsAffine(selectedCipher === "affine");
    setIsHill(selectedCipher === "hill");
    setIsSuper(selectedCipher === "super");
    onCipherChange(selectedCipher);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md space-y-4">
      <select
        onChange={handleCipherChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="vigenere">Vigenere Cipher Standard</option>
        <option value="autokey">Vigenere Cipher Autokey</option>
        <option value="extended">Extended Vigenere Cipher</option>
        <option value="playfair">Playfair Cipher</option>
        <option value="affine">Affine Cipher</option>
        <option value="hill">Hill Cipher</option>
        <option value="super">Super Enkripsi</option>
      </select>

      {isSuper && (
        <>
          <input
            type="text"
            placeholder="Masukkan Vigenere Key"
            onChange={(e) => onVigenereKeyChange(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Masukkan Transposition Key"
            onChange={(e) => onTranspositionKeyChange(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      {!isAffine && !isHill && !isSuper && (
        <input
          type="text"
          placeholder="Masukkan kunci"
          onChange={(e) => onKeyChange(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {isAffine && (
        <>
          <input
            type="number"
            placeholder="Masukkan a (relatif prima dengan 26)"
            onChange={(e) => onAffineKeyChange("a", parseInt(e.target.value))}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Masukkan b"
            onChange={(e) => onAffineKeyChange("b", parseInt(e.target.value))}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      {isHill && (
        <>
          <input
            type="number"
            placeholder="Key matrix [0][0]"
            onChange={(e) => onHillKeyChange(0, 0, parseInt(e.target.value))}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Key matrix [0][1]"
            onChange={(e) => onHillKeyChange(0, 1, parseInt(e.target.value))}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Key matrix [1][0]"
            onChange={(e) => onHillKeyChange(1, 0, parseInt(e.target.value))}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Key matrix [1][1]"
            onChange={(e) => onHillKeyChange(1, 1, parseInt(e.target.value))}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      <div className="flex space-x-2">
        <button
          onClick={() => onAction("encrypt")}
          className="w-full p-2 bg-purple-950 text-white rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Enkripsi
        </button>
        <button
          onClick={() => onAction("decrypt")}
          className="w-full p-2 bg-green-950 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Dekripsi
        </button>
      </div>
    </div>
  );
}

export default CipherForm;
