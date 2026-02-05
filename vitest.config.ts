// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true, // Importante para no tener que importar 'describe' e 'it' siempre
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts', // <--- Aquí le dices donde está el setup
    },
});