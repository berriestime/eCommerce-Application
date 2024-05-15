import { type TokenCache, type TokenStore } from '@commercetools/sdk-client-v2';

const TOKEN_STORAGE_KEY = 'lava-lamps-refresh-token';

function makeTokenCache(): TokenCache {
  let current: TokenStore | object = {};

  return {
    get: () => {
      const storedValue = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (storedValue) {
        try {
          const parsedToken = JSON.parse(storedValue) as TokenStore;
          if ('expirationTime' in parsedToken && parsedToken.expirationTime >= Date.now()) {
            current = parsedToken;
          } else {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            current = {};
          }
          return current as TokenStore;
        } catch {
          console.error("Invalid data.Can't get a refresh token.");
        }
      }
      return {} as TokenStore;
    },
    set: (newValue: TokenStore) => {
      current = newValue;
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(current));
      return current;
    },
  };
}

const getRefreshToken = (): string => {
  const tokenCache = makeTokenCache();
  const refreshToken = tokenCache.get().refreshToken;

  if (refreshToken) {
    return refreshToken;
  }

  return '';
};

export { getRefreshToken, makeTokenCache };
