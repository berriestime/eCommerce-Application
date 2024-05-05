import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
  },
  css: {
    transformer: 'lightningcss',
  },
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      all: true,
      exclude: [
        'src/test/**/*',
        '**/types.ts',
        '**/types/*',
        '**/*.d.ts',
        '**/index.ts',
        'src/main.tsx',
        'src/config/**/*',
        'src/**/*/enums.ts',
      ],
      extension: ['.ts', '.tsx'],
      include: ['src/**/*'],
      provider: 'v8',
      reporter: ['text'],
    },
    css: false,
    environment: 'jsdom',
    globals: true,
    maxConcurrency: 8,
    setupFiles: ['./src/test/setupTests.ts'],
  },
});
