import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import { main, typings } from './package.json';

const input = 'index.ts';

export default defineConfig([
    {
        input,
        plugins: [nodeResolve(), commonjs(), esbuild({ target: 'es2018' })],
        external: ['fs-extra', '@nestjs/common', 'child_process', 'path', 'yaml', 'axios', 'fast-glob'],
        output: {
            format: 'cjs',
            exports: 'auto',
            plugins: [minify()],
            file: main,
        },
    },
    {
        input,
        plugins: [dts()],
        output: {
            format: 'esm',
            file: typings,
        },
    },
]);
