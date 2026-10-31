export interface TextObjectInfo {
  version: 1;
  algorithm: 'AES-GCM';
  kdf: 'PBKDF2';
  kdfHash: 'SHA-256';
  iterations: number;
  salt: string; // base64
  iv: string; // base64
}

export interface TextObject extends TextObjectInfo {
  ciphertext: string; // base64
}