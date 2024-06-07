import { type TokenCache, type TokenStore } from '@commercetools/sdk-client-v2';
import { z } from 'zod';

export type TokenKey = 'lava-lamps-anonymous-token' | 'lava-lamps-password-token';

const schemaToken = z.object({
  expirationTime: z.number(),
  refreshToken: z.string().optional(),
  token: z.string(),
});

function makeTokenCache(token: TokenKey): TokenCache {
  let current: TokenStore;

  return {
    get: () => {
      const storedValue = localStorage.getItem(token);
      if (storedValue) {
        try {
          const parsedToken: unknown = JSON.parse(storedValue);
          const correctToken = schemaToken.parse(parsedToken);
          if (correctToken.expirationTime >= Date.now()) {
            current = correctToken;
          } else {
            localStorage.removeItem(token);
            current = {
              expirationTime: -1,
              token: '',
            } satisfies TokenStore;
          }
          return current;
        } catch (err) {
          console.error(err);
          localStorage.removeItem(token);
        }
      }
      return {
        expirationTime: -1,
        token: '',
      } satisfies TokenStore;
    },
    set: (newValue: TokenStore) => {
      current = newValue;
      localStorage.setItem(token, JSON.stringify(current));
      return current;
    },
  };
}

const getRefreshToken = (token: TokenKey): string => {
  const tokenCache = makeTokenCache(token);
  const refreshToken = tokenCache.get().refreshToken;

  if (refreshToken) {
    return refreshToken;
  }

  return '';
};

const deleteToken = (token: TokenKey): void => {
  const storedValue = localStorage.getItem(token);
  if (storedValue) {
    localStorage.removeItem(token);
  }
};

export { deleteToken, getRefreshToken, makeTokenCache };
