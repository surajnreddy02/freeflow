import { gzipSync, gunzipSync } from 'fflate';
import CryptoJS from 'crypto-js';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const encrypt = (text: string) => {
  const compressed = gzipSync(encoder.encode(text));
  const base64 = btoa(String.fromCharCode(...compressed));
  return CryptoJS.AES.encrypt(base64, import.meta.env.VITE_ENCRYPTION_KEY).toString();
};

export const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, import.meta.env.VITE_ENCRYPTION_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  const buffer = new Uint8Array([...atob(decrypted)].map(c => c.charCodeAt(0)));
  return decoder.decode(gunzipSync(buffer));
};
