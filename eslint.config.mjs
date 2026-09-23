// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

// eslint-config-next(core-web-vitals)가 eslint-plugin-jsx-a11y를 이미 내장·등록한다 —
// 별도로 jsxA11y.flatConfigs.recommended를 추가하면 플러그인 중복 등록 에러가 난다.
// eslint-plugin-jsx-a11y는 devDependency로만 유지해 버전을 명시적으로 고정한다.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
  ]),
  ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
