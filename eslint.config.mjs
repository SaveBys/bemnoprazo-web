import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      prettier: eslintPluginPrettier,
      "unused-imports": unusedImports,
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@phosphor-icons/react",
              message: "Use @phosphor-icons/react/ssr para evitar problemas de SSR.",
            },
          ],
        },
      ],
      "prettier/prettier": "error",
      "unused-imports/no-unused-imports": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules", "dist"]),
]);

export default eslintConfig;
