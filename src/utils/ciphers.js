// Vigenere Cipher
export function vigenereEncrypt(plainText, key) {
  let result = "";
  key = key.toUpperCase();
  plainText = plainText.toUpperCase();
  for (let i = 0, j = 0; i < plainText.length; i++) {
    const c = plainText.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(
        ((c - 65 + (key.charCodeAt(j % key.length) - 65)) % 26) + 65
      );
      j++;
    } else {
      result += plainText[i];
    }
  }
  return result;
}

export function vigenereDecrypt(cipherText, key) {
  let result = "";
  key = key.toUpperCase();
  cipherText = cipherText.toUpperCase();
  for (let i = 0, j = 0; i < cipherText.length; i++) {
    const c = cipherText.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(
        ((c - 65 - (key.charCodeAt(j % key.length) - 65) + 26) % 26) + 65
      );
      j++;
    } else {
      result += cipherText[i];
    }
  }
  return result;
}

export function autokeyVigenereEncrypt(plainText, key) {
  let result = "";
  key = key.toUpperCase();
  plainText = plainText.toUpperCase();

  let extendedKey = key;
  for (let i = 0; i < plainText.length; i++) {
    const plainChar = plainText.charCodeAt(i);

    if (plainChar >= 65 && plainChar <= 90) {
      const keyChar = extendedKey.charCodeAt(i);
      const encryptedChar = String.fromCharCode(
        ((plainChar - 65 + (keyChar - 65)) % 26) + 65
      );
      result += encryptedChar;

      extendedKey += plainText[i];
    } else {
      result += plainText[i];
    }
  }

  return result;
}

export function autokeyVigenereDecrypt(cipherText, key) {
  let result = "";
  key = key.toUpperCase();
  cipherText = cipherText.toUpperCase();

  let extendedKey = key;

  for (let i = 0; i < cipherText.length; i++) {
    const cipherChar = cipherText.charCodeAt(i);

    if (cipherChar >= 65 && cipherChar <= 90) {
      const keyChar = extendedKey.charCodeAt(i);
      const decryptedChar = String.fromCharCode(
        ((cipherChar - 65 - (keyChar - 65) + 26) % 26) + 65
      );
      result += decryptedChar;

      extendedKey += decryptedChar;
    } else {
      result += cipherText[i];
    }
  }

  return result;
}
