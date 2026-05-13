import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

// old ver
// export default defineConfig([
//   {
//     files: ["**/*.{js,mjs,cjs}"],
//     plugins: { js },
//     extends: ["js/recommended"],
//     languageOptions: { globals: globals.browser },
//     rules: {
//       semi: ["warn", "always"],
//       quotes: ["warn", "double"],
//     },
//   },
// ]);

//updated ver
export default defineConfig([
  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },

    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
]);
