import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { isVue2 } from "vue-demi";
import vue3 from "@vitejs/plugin-vue";
import { createVuePlugin } from "vite-plugin-vue2";
import * as compiler from "@vue/compiler-sfc";
import ScriptSetup from "unplugin-vue2-script-setup/vite";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { getDistDir } from "./scripts/utils.mjs";

const VERSION = isVue2 ? "2" : "3";
const resolve = (str) => {
  return path.resolve(__dirname, str);
};

function replaceExternalModules(from, to) {
  const fromRegex = new RegExp(`from\\s+['"]${from}['"]`, "g");
  return {
    name: `replace-${from}-with-${to}`,
    renderChunk(code) {
      return code.replace(fromRegex, `from '${to}'`);
    },
  };
}

console.log("--isVue2", isVue2);
export default defineConfig(({ command }) => {
  const isBuild = command === "build";
  return {
    root: "./example",
    base: "./",
    server: {
      open: true,
      host: "0.0.0.0",
    },
    resolve: {
      alias: {
        vue: isVue2 ? "vue2" : "vue3",
        "element-plus": isVue2 ? "element-ui" : "element-ui",
        "element-ui": isVue2 ? "element-ui" : "element-plus",
      },
    },
    build: {
      lib: {
        entry: resolve("./src/index.ts"),
        name: "Fatty",
      },
      rollupOptions: {
        external: ["vue", "vue-demi", "element-plus", "element-ui"],
        output: [
          {
            dir: getDistDir(VERSION),
            entryFileNames: "index.es.js",
            format: "es",
          },
          {
            dir: getDistDir(VERSION),
            entryFileNames: "index.cjs.js",
            format: "cjs",
            exports: "default",
          },
          {
            dir: getDistDir(VERSION),
            entryFileNames: "index.umd.js",
            format: "umd",
            name: "bundle",
            globals: {
              vue: "Vue",
              "element-plus": "elementPlus",
            },
          },
        ],
        plugins: [
          isVue2
            ? replaceExternalModules("element-plus", "element-ui")
            : replaceExternalModules("element-ui", "element-plus"),
        ],
      },
    },
    plugins: [
      isVue2
        ? createVuePlugin()
        : vue3({
            compiler: compiler,
          }),
      isVue2 ? ScriptSetup() : undefined,
      isBuild
        ? null
        : createHtmlPlugin({
            template: "./index.html",
            minify: true,
            entry: "./index.ts",
            inject: {
              data: {
                cssLink: isVue2
                  ? `<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">`
                  : `  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />`,
              },
            },
          }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  };
});
