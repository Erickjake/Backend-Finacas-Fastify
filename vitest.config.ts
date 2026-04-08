import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true, // Permite usar 'describe', 'it', 'expect' sem importar
    environment: 'node',
  },
});
