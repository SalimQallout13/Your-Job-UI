module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "tailwindcss"],
  rules: {
    // Désactiver la règle tailwindcss/no-custom-classname
    'tailwindcss/no-custom-classname': 'off',
    // Désactiver la règle pour les dépendances de hooks
    'react-hooks/exhaustive-deps': 'off',
    "react-refresh/only-export-components": "off",
    "@typescript-eslint/no-explicit-any": "warn",
  },
}
