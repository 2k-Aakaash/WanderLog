import CryptoJS from 'crypto-js';

// ⚙️ Choose your key or get it securely from user/session
const secretKey = "wanderlog-secret-key";

// Encrypt plain JS object → encrypted base64 string
export function encryptData(obj) {
    const jsonString = JSON.stringify(obj);
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
}

// Decrypt base64 string → plain JS object
export function decryptData(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}
