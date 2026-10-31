export async function passwordToKeyMaterial(passwordPhrase: string, name: string) {
  const encoder = new TextEncoder();

  return crypto.subtle.importKey(
    'raw',
    encoder.encode(passwordPhrase),
    { name },
    false,
    ['deriveBits', 'deriveKey'],
  );
}
