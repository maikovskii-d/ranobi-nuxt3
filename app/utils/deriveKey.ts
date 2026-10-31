import { CRYPT_ITERATIONS, DEFAULT_AES_GCM_LENGTH } from '~/constants';
import type { TextObjectInfo } from '~/types';

export async function deriveKey(keyMaterial: CryptoKey, textObjectInfo: TextObjectInfo) {
  return crypto.subtle.deriveKey(
    {
      name: textObjectInfo.kdf,
      salt: fromBase64(textObjectInfo.salt),
      iterations: CRYPT_ITERATIONS,
      hash: textObjectInfo.kdfHash,
    },
    keyMaterial,
    { name: textObjectInfo.algorithm, length: DEFAULT_AES_GCM_LENGTH },
    false,
    ['encrypt', 'decrypt'],
  );
}
