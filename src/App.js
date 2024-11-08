import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import CipherForm from "./components/CipherForm";
import OutputDecrypt from "./components/OutputDecrypt";
import OutputEncrypt from "./components/OutputEncrypt";
import {
  vigenereEncrypt,
  vigenereDecrypt,
  autokeyVigenereEncrypt,
  autokeyVigenereDecrypt,
  extendedVigenereEncrypt,
  extendedVigenereDecrypt,
  playfairDecrypt,
  playfairEncrypt,
  affineDecrypt,
  affineEncrypt,
  hillEncrypt,
  hillDecrypt,
  superDecrypt,
  superEncrypt,
} from "./utils/ciphers";

function App() {
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [cipherType, setCipherType] = useState("vigenere");
  const [key, setKey] = useState("");
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [hillKey, setHillKey] = useState([
    [1, 0],
    [0, 1],
  ]);
  const [displayEncrypted, setDisplayEncrypted] = useState(false);
  const [displayDecrypted, setDisplayDecrypted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [vigenereKey, setVigenereKey] = useState("");
  const [transpositionKey, setTranspositionKey] = useState("");

  const handleAffineKeyChange = (type, value) => {
    if (type === "a") setA(value);
    if (type === "b") setB(value);
  };

  const handleHillKeyChange = (row, col, value) => {
    const updatedKey = [...hillKey];
    updatedKey[row][col] = value;
    setHillKey(updatedKey);
  };

  const handleEncrypt = () => {
    setDisplayDecrypted(false);
    setErrorMessage("");
    try {
      let encryptedText;
      switch (cipherType) {
        case "vigenere":
          encryptedText = vigenereEncrypt(plainText, key);
          break;
        case "autokey":
          encryptedText = autokeyVigenereEncrypt(plainText, key);
          break;
        case "extended":
          encryptedText = extendedVigenereEncrypt(plainText, key);
          break;
        case "playfair":
          encryptedText = playfairEncrypt(plainText, key);
          break;
        case "affine":
          encryptedText = affineEncrypt(plainText, a, b);
          break;
        case "hill":
          encryptedText = hillEncrypt(plainText, hillKey);
          break;
        case "super":
          encryptedText = superEncrypt(
            plainText,
            vigenereKey,
            transpositionKey
          );
          break;
        default:
          encryptedText = "Cipher tidak ditemukan";
      }
      setCipherText(encryptedText);
      setDisplayEncrypted(true);
      setDisplayDecrypted(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDecrypt = () => {
    setDisplayEncrypted(false);
    setErrorMessage("");
    try {
      let decryptedText;
      switch (cipherType) {
        case "vigenere":
          decryptedText = vigenereDecrypt(cipherText, key);
          break;
        case "autokey":
          decryptedText = autokeyVigenereDecrypt(cipherText, key);
          break;
        case "extended":
          decryptedText = extendedVigenereDecrypt(cipherText, key);
          break;
        case "playfair":
          decryptedText = playfairDecrypt(cipherText, key);
          break;
        case "affine":
          decryptedText = affineDecrypt(cipherText, a, b);
          break;
        case "hill":
          decryptedText = hillDecrypt(cipherText, hillKey);
          break;
        case "super":
          decryptedText = superDecrypt(
            cipherText,
            vigenereKey,
            transpositionKey
          );
          break;
        default:
          decryptedText = "Cipher tidak ditemukan";
      }
      setPlainText(decryptedText);
      setDisplayDecrypted(true);
      setDisplayEncrypted(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleInputChange = () => {
    setDisplayEncrypted(false);
    setDisplayDecrypted(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Aplikasi Enkripsi</h1>
      <div className="max-w-2xl mx-auto space-y-6">
        <UploadForm
          onUpload={setPlainText}
          onTextChange={(text) => {
            setPlainText(text);
            handleInputChange();
          }}
        />
        <CipherForm
          onCipherChange={(cipher) => {
            setCipherType(cipher);
            handleInputChange();
          }}
          onKeyChange={(key) => {
            setKey(key);
            handleInputChange();
          }}
          onVigenereKeyChange={(key) => {
            setVigenereKey(key);
            handleInputChange();
          }}
          onTranspositionKeyChange={(key) => {
            setTranspositionKey(key);
            handleInputChange();
          }}
          onAffineKeyChange={(type, value) => {
            handleAffineKeyChange(type, value);
            handleInputChange();
          }}
          onHillKeyChange={(row, col, value) => {
            handleHillKeyChange(row, col, value);
            handleInputChange();
          }}
          onAction={(action) =>
            action === "encrypt" ? handleEncrypt() : handleDecrypt()
          }
        />
        {displayEncrypted && (
          <OutputEncrypt cipherText={cipherText} plainText={plainText} />
        )}
        {displayDecrypted && (
          <OutputDecrypt cipherText={cipherText} plainText={plainText} />
        )}
        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default App;
