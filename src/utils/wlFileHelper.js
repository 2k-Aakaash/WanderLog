// src/utils/wlFileHelper.js
import CryptoJS from 'crypto-js';

// ⚙️ change to your secure key or get from user input
const secretKey = "wanderlog-secret-key";

// Encrypt & save data to .wl
export function encryptAndSaveWLFile(dataObj) {
    try {
        const jsonString = JSON.stringify(dataObj, null, 2);
        const ciphertext = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
        // use custom type, not strictly required but useful
        const blob = new Blob([ciphertext], { type: "application/wanderlog" });
        return blob;
    } catch (e) {
        console.error("Encryption failed:", e);
        throw e;
    }
}

// Load & decrypt .wl file content
export async function loadAndDecryptWLFile(file) {
    try {
        const text = await file.text();
        const bytes = CryptoJS.AES.decrypt(text, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(decrypted);
        return obj;
    } catch (e) {
        console.error("Decryption failed:", e);
        throw e;
    }
}
