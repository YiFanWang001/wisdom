module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/vue3-essential', '@vue/standard'],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-tabs': 'off',
        indent: 'off',
        'comma-dangle': 'off',
        'func-call-spacing': 'off',
        'space-in-parens': 'off',
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': 'off',
        'eol-last': 'off',
        'space-before-function-paren': 'off',
        'no-undef': 'off',
        'no-trailing-spaces': 'off',
        'vue/no-deprecated-slot-attribute': 'off'
    }
}