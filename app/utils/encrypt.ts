import type { TextObject, TextObjectInfo } from '~/types';

export async function encrypt(key: CryptoKey, text: string, textObjectInfo: TextObjectInfo): Promise<TextObject> {
  const encoder = new TextEncoder();

  const encryptedArrayBuffer = await crypto.subtle.encrypt(
    { name: textObjectInfo.algorithm, iv: fromBase64(textObjectInfo.iv) },
    key,
    encoder.encode(text),
  );

  return { ...textObjectInfo, ciphertext: toBase64(encryptedArrayBuffer) };
}