module.exports = {
    parser: "babel-eslint",
    plugins: ["prettier", "react"],
    rules: {
        "prettier/prettier": "error",
        indent: ["error", 4, { SwitchCase: 1 }],
        "no-console": 1,
        "react/jsx-uses-vars": 1,
        "react/display-name": 1,
        "no-unexpected-multiline": "warn",
        "comma-dangle": 0
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true
        }
    },
    settings: {
        react: {
            pragma: "React",
            version: "15.6.1"
        }
    }
};
