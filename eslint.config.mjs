// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals").map((cfg) => ({
    ...cfg,
    parser: typeof cfg.parser === "string" ? cfg.parser : undefined, // ✅ ensure parser is string
  })),
];

export default eslintConfig;
