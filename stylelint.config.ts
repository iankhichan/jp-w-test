export default {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-tailwindcss', // Tailwind-specific rules
  ],
  rules: {
    // Add your custom rules here if needed
    // Example: Disable empty line before comments if Tailwind requires comments
    // 'comment-empty-line-before': null, // Optional adjustment for Tailwind
  },
};
