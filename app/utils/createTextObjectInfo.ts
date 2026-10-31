import type { TextObjectInfo } from '~/types';
import { CRYPT_VERSION, CRYPT_ALGORITHM, CRYPT_KDF, CRYPT_KDF_HASH, CRYPT_ITERATIONS } from '~/constants';
import { generateIV } from '~/utils/generateIV';
import { generateSalt } from '~/utils/generateSalt';
import { toBase64 } from '~/utils/toBase64';

export function createTextObjectInfo() {
  const textObjectInfo: TextObjectInfo = {
    version: CRYPT_VERSION,
    algorithm: CRYPT_ALGORITHM,
    kdf: CRYPT_KDF,
    kdfHash: CRYPT_KDF_HASH,
    iterations: CRYPT_ITERATIONS,
    salt: toBase64(generateSalt().buffer),
    iv: toBase64(generateIV().buffer),
  };

  return textObjectInfo;
}