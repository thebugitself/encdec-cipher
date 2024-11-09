// ciphers.js

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

// Extended Vigenere Cipher

export function extendedVigenereEncrypt(plainText, key) {
  let result = "";
  for (let i = 0; i < plainText.length; i++) {
    const plainChar = plainText.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    const encryptedChar = String.fromCharCode((plainChar + keyChar) % 256);
    result += encryptedChar;
  }
  const base64Encoded = encodeBase64(result);
  return base64Encoded;
}

export function extendedVigenereDecrypt(cipherText, key) {
  const decodedText = decodeBase64(cipherText);
  if (!decodedText) {
    return "Error: Failed to decode Base64.";
  }

  let result = "";
  for (let i = 0; i < decodedText.length; i++) {
    const cipherChar = decodedText.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    const decryptedChar = String.fromCharCode(
      (cipherChar - keyChar + 256) % 256
    );
    result += decryptedChar;
  }
  return result;
}

// Playfair Cipher

function createPlayfairTable(key) {
  key = key.toUpperCase().replace(/J/g, "I");
  let table = "";
  let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

  for (let char of key) {
    if (!table.includes(char)) {
      table += char;
    }
  }

  for (let char of alphabet) {
    if (!table.includes(char)) {
      table += char;
    }
  }

  const tableMatrix = [];
  for (let i = 0; i < 5; i++) {
    tableMatrix.push(table.slice(i * 5, i * 5 + 5).split(""));
  }

  return tableMatrix;
}

function getPosition(table, char) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (table[row][col] === char) {
        return [row, col];
      }
    }
  }
  return null;
}

export function playfairEncrypt(plainText, key) {
  const table = createPlayfairTable(key);
  plainText = plainText
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");

  let pairs = [];
  for (let i = 0; i < plainText.length; i += 2) {
    let a = plainText[i];
    let b = plainText[i + 1] || "X";

    if (a === b) {
      pairs.push([a, "X"]);
      i--;
    } else {
      pairs.push([a, b]);
    }
  }

  let encryptedText = "";
  for (let [a, b] of pairs) {
    let [rowA, colA] = getPosition(table, a);
    let [rowB, colB] = getPosition(table, b);

    if (rowA === rowB) {
      encryptedText += table[rowA][(colA + 1) % 5];
      encryptedText += table[rowB][(colB + 1) % 5];
    } else if (colA === colB) {
      encryptedText += table[(rowA + 1) % 5][colA];
      encryptedText += table[(rowB + 1) % 5][colB];
    } else {
      encryptedText += table[rowA][colB];
      encryptedText += table[rowB][colA];
    }
  }

  return encryptedText;
}

export function playfairDecrypt(cipherText, key) {
  const table = createPlayfairTable(key);
  cipherText = cipherText
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");

  let pairs = [];
  for (let i = 0; i < cipherText.length; i += 2) {
    pairs.push([cipherText[i], cipherText[i + 1]]);
  }

  let decryptedText = "";
  for (let [a, b] of pairs) {
    let [rowA, colA] = getPosition(table, a);
    let [rowB, colB] = getPosition(table, b);

    if (rowA === rowB) {
      decryptedText += table[rowA][(colA + 4) % 5];
      decryptedText += table[rowB][(colB + 4) % 5];
    } else if (colA === colB) {
      decryptedText += table[(rowA + 4) % 5][colA];
      decryptedText += table[(rowB + 4) % 5][colB];
    } else {
      decryptedText += table[rowA][colB];
      decryptedText += table[rowB][colA];
    }
  }

  decryptedText = decryptedText.replace(/X(?=.)/g, "").replace(/X$/, "");

  return decryptedText;
}

// Affine Cipher

function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function modInverseAffine(a, m) {
  if (gcd(a, m) !== 1) {
    throw new Error(
      `Nilai 'a' = ${a} tidak memiliki invers modular dengan ${m}. Pilih nilai 'a' yang relatif prima terhadap ${m}.`
    );
  }

  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  throw new Error(`Tidak ada invers modular untuk a = ${a} dan m = ${m}`);
}

export function affineEncrypt(plainText, a, b) {
  const m = 26;
  plainText = plainText.toUpperCase();
  let result = "";

  for (let i = 0; i < plainText.length; i++) {
    const char = plainText[i];
    if (char >= "A" && char <= "Z") {
      const x = char.charCodeAt(0) - 65;
      const encryptedChar = String.fromCharCode(((a * x + b) % m) + 65);
      result += encryptedChar;
    } else {
      result += char;
    }
  }

  return result;
}

export function affineDecrypt(cipherText, a, b) {
  const m = 26;
  const a_inv = modInverseAffine(a, m);
  cipherText = cipherText.toUpperCase();
  let result = "";

  for (let i = 0; i < cipherText.length; i++) {
    const char = cipherText[i];
    if (char >= "A" && char <= "Z") {
      const y = char.charCodeAt(0) - 65;
      const decryptedChar = String.fromCharCode(
        ((a_inv * (y - b + m)) % m) + 65
      );
      result += decryptedChar;
    } else {
      result += char;
    }
  }

  return result;
}

function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  throw new Error(`Tidak ada invers modular untuk a = ${a} dan m = ${m}`);
}

function matrixDeterminant(matrix) {
  const [[a, b], [c, d]] = matrix;
  return (a * d - b * c) % 26;
}

function invertMatrix(matrix) {
  const det = matrixDeterminant(matrix);
  const detInv = modInverse(det, 26);

  const [[a, b], [c, d]] = matrix;

  return [
    [(d * detInv) % 26, (-b * detInv + 26) % 26],
    [(-c * detInv + 26) % 26, (a * detInv) % 26],
  ];
}

export function hillEncrypt(plainText, keyMatrix) {
  plainText = plainText.toUpperCase().replace(/[^A-Z]/g, "");
  if (plainText.length % 2 !== 0) plainText += "X";

  let cipherText = "";

  for (let i = 0; i < plainText.length; i += 2) {
    const vector = [
      plainText.charCodeAt(i) - 65,
      plainText.charCodeAt(i + 1) - 65,
    ];

    const encryptedVector = [
      (keyMatrix[0][0] * vector[0] + keyMatrix[0][1] * vector[1]) % 26,
      (keyMatrix[1][0] * vector[0] + keyMatrix[1][1] * vector[1]) % 26,
    ];

    cipherText += String.fromCharCode(encryptedVector[0] + 65);
    cipherText += String.fromCharCode(encryptedVector[1] + 65);
  }

  return cipherText;
}

export function hillDecrypt(cipherText, keyMatrix) {
  const inverseKeyMatrix = invertMatrix(keyMatrix);

  let plainText = "";

  for (let i = 0; i < cipherText.length; i += 2) {
    const vector = [
      cipherText.charCodeAt(i) - 65,
      cipherText.charCodeAt(i + 1) - 65,
    ];

    const decryptedVector = [
      (inverseKeyMatrix[0][0] * vector[0] +
        inverseKeyMatrix[0][1] * vector[1]) %
        26,
      (inverseKeyMatrix[1][0] * vector[0] +
        inverseKeyMatrix[1][1] * vector[1]) %
        26,
    ];

    plainText += String.fromCharCode(((decryptedVector[0] + 26) % 26) + 65);
    plainText += String.fromCharCode(((decryptedVector[1] + 26) % 26) + 65);
  }

  return plainText;
}

// Super Enkripsi(Gabungan Extended Vigenere dan Cipher Transposition)

function extendedVigenereEncryptForSuper(plainText, key) {
  let result = "";
  for (let i = 0; i < plainText.length; i++) {
    const plainChar = plainText.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    const encryptedChar = String.fromCharCode((plainChar + keyChar) % 256);
    result += encryptedChar;
  }
  return result;
}

function extendedVigenereDecryptForSuper(cipherText, key) {
  let result = "";
  for (let i = 0; i < cipherText.length; i++) {
    const cipherChar = cipherText.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    const decryptedChar = String.fromCharCode(
      (cipherChar - keyChar + 256) % 256
    );
    result += decryptedChar;
  }
  return result;
}

function columnarTransposeEncrypt(text, key) {
  const numRows = Math.ceil(text.length / key.length);
  let matrix = Array.from({ length: numRows }, () => []);

  for (let i = 0; i < text.length; i++) {
    matrix[Math.floor(i / key.length)].push(text[i]);
  }

  const sortedKey = key
    .split("")
    .map((char, i) => [char, i])
    .sort();
  let cipherText = "";

  for (let [, index] of sortedKey) {
    for (let row = 0; row < numRows; row++) {
      cipherText += matrix[row][index] || "";
    }
  }

  return cipherText;
}

function columnarTransposeDecrypt(text, key) {
  const numRows = Math.ceil(text.length / key.length);
  const numCols = key.length;
  let matrix = Array.from({ length: numRows }, () => Array(numCols).fill(""));

  const sortedKey = key
    .split("")
    .map((char, i) => [char, i])
    .sort();
  const colLengths = Array(numCols).fill(numRows);
  const numEmptyCells = numCols * numRows - text.length;

  for (let i = numCols - numEmptyCells; i < numCols; i++) {
    colLengths[sortedKey[i][1]]--;
  }

  let index = 0;
  for (let [, colIndex] of sortedKey) {
    for (let row = 0; row < colLengths[colIndex]; row++) {
      matrix[row][colIndex] = text[index++] || "";
    }
  }

  return matrix.flat().join("");
}

function encodeBase64(text) {
  try {
    return btoa(text);
  } catch (e) {
    console.error("Encoding to Base64 failed:", e);
    return null;
  }
}

function decodeBase64(base64Text) {
  try {
    while (base64Text.length % 4 !== 0) {
      base64Text += "=";
    }
    return atob(base64Text);
  } catch (e) {
    console.error("Decoding from Base64 failed:", e);
    return null;
  }
}

export function superEncrypt(plainText, vigenereKey, transpositionKey) {
  const vigenereEncrypted = extendedVigenereEncryptForSuper(
    plainText,
    vigenereKey
  );
  console.log("After Vigenere Encryption:", vigenereEncrypted);

  const base64Encoded = encodeBase64(vigenereEncrypted);
  console.log("After Base64 Encoding:", base64Encoded);

  if (!base64Encoded) {
    console.error("Failed to encode Vigenere encrypted text to Base64.");
    return null;
  }

  const transposedCipherText = columnarTransposeEncrypt(
    base64Encoded,
    transpositionKey
  );
  console.log("After Columnar Transposition Encryption:", transposedCipherText);

  return transposedCipherText;
}

export function superDecrypt(cipherText, vigenereKey, transpositionKey) {
  console.log("Input to superDecrypt:", cipherText);

  const transposedDecrypted = columnarTransposeDecrypt(
    cipherText,
    transpositionKey
  );
  console.log("After Transposition Decryption:", transposedDecrypted);

  const base64Decoded = decodeBase64(transposedDecrypted);
  console.log("After Base64 Decoding:", base64Decoded);

  if (!base64Decoded) {
    console.error("Failed to decode Base64 to Vigenere encrypted text.");
    return "Error: Failed to decode Base64.";
  }

  const decryptedText = extendedVigenereDecryptForSuper(
    base64Decoded,
    vigenereKey
  );
  console.log("Final Decrypted Text:", decryptedText);

  return decryptedText || "Error in decryption process.";
}
