export interface TextObject {
  version: 1;
  algorithm: 'AES-GCM';
  kdf: 'PBKDF2';
  kdfHash: 'SHA-256';
  iterations: number;
  salt: string;
  iv: string;
  ciphertext: string;
}