module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: [
        'eslint:recommended',
        'standard'
    ],
    rules: {
        "semi": ["error", "always"],
        "indent": ["error", 4]
    }
}