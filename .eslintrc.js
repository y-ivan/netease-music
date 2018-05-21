module.exports = {
    "root": true,
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "env": {
        "browser": true
    },
    "extends": [
        "standard",
        "plugin:vue/essential"
    ],
    "plugins": [
        "vue"
    ],
    "rules": {
        "generator-star-spacing": 0,
        "quotes": ["error", "double"],
        "indent": ["error", 4],
        "arrow-parens": 0,
        "no-new": 0
    }
}