import { type TokenCache, type TokenStore } from '@commercetools/sdk-client-v2';

const ANONYMOUS_TOKEN_STORAGE_KEY = 'lava-lamps-anonymous-token';

function makeTokenCache(): TokenCache {
  let current: TokenStore | object = {};

  const storedValue = localStorage.getItem(ANONYMOUS_TOKEN_STORAGE_KEY);
  if (storedValue) {
    const parsed = JSON.parse(storedValue) as TokenStore;
    if ('expirationTime' in parsed && parsed.expirationTime >= Date.now()) {
      current = parsed;
    } else {
      localStorage.removeItem(ANONYMOUS_TOKEN_STORAGE_KEY);
      current = {};
    }
  }

  return {
    get: () => {
      if (current) {
        return current as TokenStore;
      }
      const storedValue = localStorage.getItem(ANONYMOUS_TOKEN_STORAGE_KEY);
      if (storedValue) {
        const parsed = JSON.parse(storedValue) as TokenStore;
        if ('expirationTime' in parsed && parsed.expirationTime >= Date.now()) {
          current = parsed;
        } else {
          localStorage.removeItem(ANONYMOUS_TOKEN_STORAGE_KEY);
          current = {};
        }
        return current as TokenStore;
      }
      return {} as TokenStore;
    },
    set: (newValue: TokenStore) => {
      current = newValue;
      localStorage.setItem(ANONYMOUS_TOKEN_STORAGE_KEY, JSON.stringify(current));
      return current;
    },
  };
}

export { makeTokenCache };
