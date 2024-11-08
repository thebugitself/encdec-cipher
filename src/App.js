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
} from "./utils/ciphers";

function App() {
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [cipherType, setCipherType] = useState("vigenere");
  const [key, setKey] = useState("");
  const [displayEncrypted, setDisplayEncrypted] = useState(false);
  const [displayDecrypted, setDisplayDecrypted] = useState(false);

  const handleEncrypt = () => {
    setDisplayDecrypted(false);
    let encryptedText;
    switch (cipherType) {
      case "vigenere":
        encryptedText = vigenereEncrypt(plainText, key);
        break;
      case "autokey":
        encryptedText = autokeyVigenereEncrypt(plainText, key);
        break;
      default:
        encryptedText = "Cipher tidak ditemukan";
    }
    setCipherText(encryptedText);
    setDisplayEncrypted(true);
  };

  const handleDecrypt = () => {
    setDisplayEncrypted(false);
    let decryptedText;
    switch (cipherType) {
      case "vigenere":
        decryptedText = vigenereDecrypt(cipherText, key);
        break;
      case "autokey":
        decryptedText = autokeyVigenereDecrypt(cipherText, key);
        break;
      default:
        decryptedText = "Cipher tidak ditemukan";
    }
    setPlainText(decryptedText);
    setDisplayDecrypted(true);
  };

  return (
    <div>
      <h1>Aplikasi Enkripsi</h1>
      <UploadForm onUpload={setPlainText} onTextChange={setPlainText} />
      <CipherForm
        onCipherChange={setCipherType}
        onKeyChange={setKey}
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
    </div>
  );
}

export default App;
