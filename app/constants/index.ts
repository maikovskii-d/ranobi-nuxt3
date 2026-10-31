export const APP_NAME = 'Ranobi';

export const STORAGE_AUTOSAVE_KEY = 'autosave';

export const CRYPT_VERSION = 1;
export const CRYPT_ALGORITHM = 'AES-GCM';
export const CRYPT_KDF = 'PBKDF2';
export const CRYPT_KDF_HASH = 'SHA-256';
export const CRYPT_ITERATIONS = 100_000;
export const DEFAULT_AES_GCM_LENGTH = 256;

export const CRYPT_PASSWORD = String(import.meta.env.PASSWORD ?? '');