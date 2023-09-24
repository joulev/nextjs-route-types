// @ts-check
/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  semi: true,
  printWidth: 100,
  arrowParens: "avoid",
  tabWidth: 2,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-packagejson",
  ],
  importOrder: ["^~/.*$", "^\\.\\.?/.*$"],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
};
