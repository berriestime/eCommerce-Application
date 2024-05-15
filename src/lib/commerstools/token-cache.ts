import { type TokenCache, type TokenStore } from '@commercetools/sdk-client-v2';
import { z } from 'zod';

const TOKEN_STORAGE_KEY = 'lava-lamps-refresh-token';

const schemaToken = z.object({
  expirationTime: z.number(),
  refreshToken: z.string().optional(),
  token: z.string(),
});

function makeTokenCache(): TokenCache {
  let current: TokenStore;

  return {
    get: () => {
      const storedValue = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (storedValue) {
        try {
          const parsedToken: unknown = JSON.parse(storedValue);
          const correctToken = schemaToken.parse(parsedToken);
          if (correctToken.expirationTime >= Date.now()) {
            current = correctToken;
          } else {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            current = {
              expirationTime: -1,
              token: '',
            } satisfies TokenStore;
          }
          return current;
        } catch (err) {
          console.error(err);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      }
      return {
        expirationTime: -1,
        token: '',
      } satisfies TokenStore;
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
