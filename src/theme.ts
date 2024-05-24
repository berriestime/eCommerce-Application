import {
  Loader,
  VariantColorsResolver,
  createTheme,
  defaultVariantColorsResolver,
  rem,
  virtualColor,
} from '@mantine/core';

import { CssLoader } from './components/loader/loader';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  if (input.variant === 'light') {
    return {
      background: 'transparent',
      border: `${rem(1)} solid transparent`,
      color: '#F3E7E4',
      hover: 'transparent',
    };
  }

  return defaultResolvedColors;
};

export const theme = createTheme({
  autoContrast: true,
  black: '#1f1b1b',
  colors: {
    customBg: virtualColor({
      dark: '#1f1b1b',
      light: '#AA9F9C',
      name: 'customBg',
    }),
    customColor: virtualColor({
      dark: '#f3e7e4',
      light: '#1f1b1b',
      name: 'customColor',
    }),
  },
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: 'custom',
      },
    }),
  },
  cursorType: 'pointer',
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'Martel' },
  primaryColor: 'red',
  variantColorResolver,
  white: '#f3e7e4',
});
