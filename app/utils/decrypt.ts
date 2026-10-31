export async function decrypt(key: CryptoKey, textObject: TextObject): Promise<string> {
  const decoder = new TextDecoder();

  const iv = fromBase64(textObject.iv);
  const ciphertextBytes = fromBase64(textObject.ciphertext);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: textObject.algorithm, iv },
    key,
    ciphertextBytes,
  );

  return decoder.decode(decryptedBuffer);
}