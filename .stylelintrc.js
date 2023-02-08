'use strict';
/** @format */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
    'stylelint-no-unsupported-browser-features',
    'stylelint-config-html',
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'no-descending-specificity': null,
    'selector-pseudo-element-colon-notation': null,
    //https://github.com/stylelint/stylelint/issues/4114
    // 'function-calc-no-invalid': null,
    'function-url-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // webcomponent
    'selector-type-no-unknown': null,
    'color-hex-length': 'long',
    'no-empty-source': null,

    // https://www.npmjs.com/package/stylelint-scss
    // recommended rules
    'selector-class-pattern': [
      // 命名规范 -
      '^([a-zA-Z0-9_-]*)$',
    ],
    'value-keyword-case': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'include', 'mixin'],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: 'v-bind',
      },
    ],

    'property-no-vendor-prefix': null,
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', 'src/uni_modules/**'],
};
