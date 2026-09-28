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
  {
    // storybook/viewport(내장 애드온, Storybook 9+부터 "storybook" 코어 패키지의
    // 서브패스 export)를 no-uninstalled-addons가 아직 인식하지 못해서(별도 npm 패키지로
    // 설치된 게 아니라서) 오탐한다 — ignore 옵션으로 예외 처리
    files: [".storybook/main.@(js|cjs|mjs|ts)"],
    rules: {
      "storybook/no-uninstalled-addons": ["error", { ignore: ["storybook/viewport"] }],
    },
  },
]);

export default eslintConfig;
