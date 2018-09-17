import JSZip from "jszip";
import { saveAs } from "file-saver/FileSaver";
import * as selectors from "../selectors/selectors";
import * as coder from "./code";
import * as exports from "./exports/exports";
const beautify = require("js-beautify/").js;

export const generateZipStructure = () => {
    const f = {};

    f.root = new JSZip();
    f.mocks = f.root.folder("__mocks__");
    f.tests = f.root.folder("__tests__");
    f.methods = f.root.folder("methods");

    f.in = f.mocks.folder("in");
    f.out = f.mocks.folder("out");

    f.templates = f.out.folder("templates");

    return f;
};

const writeMethodFile = (zip, key, method, methods) => {
    const fileContent = [
        coder.methodToNpmImports(method, methods),
        coder.methodToImports(method, methods),
        coder.methodToGlobal(method, { simple: true })
    ].join("\n");

    zip.methods.file(`${key}.js`, fileContent);
};

const writeSpecFile = (zip, key, method, IOsCount, isTextOutput) => {
    const fileContent = coder.tests(key, method, IOsCount, isTextOutput);
    zip.tests.file(`${key}.spec.js`, fileContent);
};

const writeTemplateFile = (zip, template) => {
    const fileContent = beautify(template.content);
    zip.templates.file(template.name, fileContent);
};

const writeInput = (zip, key, inputs) => {
    zip.in.file(`${key}.js`, inputs.join("\n"));
};

const writeOutput = (zip, key, expected) => {
    zip.out.file(`${key}.js`, expected.join("\n"));
};

const writeConfigFile = zip => {
    zip.root.file("package.json", exports.packageJson);
    zip.mocks.file("helpers.js", exports.helpers);
    zip.root.file(".babelrc", exports.babel);
};

const writeIOs = (zip, key, IOs) => {
    const iosCode = coder.ioToTests(key, IOs);

    if (iosCode.imports) {
        iosCode.expected.unshift(iosCode.imports + "\n");
    }

    iosCode.templates.forEach(template => {
        writeTemplateFile(zip, template);
    });

    writeInput(zip, key, iosCode.inputs);
    writeOutput(zip, key, iosCode.expected);
};

export const downloadZip = methods => {
    const zip = generateZipStructure();

    const output = Object.keys(methods).forEach(key => {
        const method = methods[key];
        const { IOs } = method;
        const isTextOutput = coder.isTextOutput(key, IOs);
        const IOsCount = coder.IOsCount(IOs);

        writeMethodFile(zip, key, method, methods);
        writeIOs(zip, key, IOs);
        writeSpecFile(zip, key, method, IOsCount, isTextOutput);
    }, {});

    writeConfigFile(zip);

    zip.root.generateAsync({ type: "blob" }).then(function(content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
    });
};
