import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig(() => {
  return {
    splitting: true,
    clean: true, // clean up the dist folder
    dts: true, // generate dts files
    format: ['esm', 'cjs'], // generate cjs and esm files
    skipNodeModulesBundle: true,
    entryPoints: ['src/index.ts'],
    entry: ['src/**/*.ts'], //include all files under src
  };
});
