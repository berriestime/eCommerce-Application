import { VariantColorsResolver, createTheme, defaultVariantColorsResolver, rem } from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  if (input.variant === 'light') {
    return {
      background: 'transparent',
      border: `${rem(1)} solid transparent`,
      color: '#ffffff',
      hover: 'transparent',
    };
  }

  return defaultResolvedColors;
};

export const theme = createTheme({
  autoContrast: true,
  black: '#1f1b1b',
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'Martel' },
  primaryColor: 'red',
  variantColorResolver,
  white: '#f3e7e4',
});
