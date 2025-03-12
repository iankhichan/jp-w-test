module.exports = {
  '{apps,libs,tools}/**/*.{ts,tsx}': (files) => {
    return `nx affected --target=typecheck --files=${files.join(',')}`;
  },
  '{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}': [
    (files) => `nx affected:lint --files=${files.join(',')}`,
    (files) => `nx format:write --files=${files.join(',')}`,
  ],
  // Lint CSS/SCSS files with stylelint
  '{apps,libs,tools}/**/*.{css,scss}': files => {
    return `stylelint ${files.join(' ')}`;
  },
};
