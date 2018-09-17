export const helpers = `// @flow
import fs from "fs";

const mockPath = "./__mocks__";
const outPath = \`\${mockPath}/out\`;
const templatesPath = \`\${mockPath}/out/templates\`;

export const write = (path, json) => {
    fs.writeFileSync(path, "export default " + JSON.stringify(json, null, 4));
};

export const writeToFile = (text, name = "output") => {
    const variableName = dotsToCamelCase(name);
    fs.writeFileSync(\`\${outPath}/\${name}.js\`, text);
};

export const readTemplate = templateName => {
    return fs.readFileSync(\`\${templatesPath}/\${templateName}\`, "utf8");
};
`;

export const packageJson = `{
    "name": "example",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "jest"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "babel-core": "^6.26.3",
        "babel-jest": "^23.6.0",
        "babel-preset-env": "^1.7.0",
        "jest": "^23.6.0",
        "clone": "^2.1.2",
        "js-beautify": "^1.8.6",
        "regenerator-runtime": "^0.12.1"
    }
}
`;

export const babel = `{
    "presets": ["env"]
}`;
