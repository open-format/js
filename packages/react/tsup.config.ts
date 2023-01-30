import path from 'path';

import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig(options => {
  return {
    splitting: false,
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
    clean: true, // clean up the dist folder
    dts: true, // generate dts files
    format: ['cjs', 'esm'], // generate cjs and esm files
    minify: env === 'production',
    bundle: env === 'production',
    skipNodeModulesBundle: true,
    entryPoints: ['src/index.ts'],
    watch: env === 'development',
    target: 'es5',
    entry: ['src/**/*.ts'], //include all files under src
  };
});
