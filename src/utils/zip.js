import JSZip from "jszip";
import { saveAs } from "file-saver/FileSaver";
import * as selectors from "../selectors/selectors";
import * as coder from "./code";
import * as exports from "./exports/exports";

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

export const download = () => {
    const zip = generateZipStructure();

    return (dispatch, getState) => {
        const state = getState(),
            methods = selectors.methodsSelector(state),
            keys = Object.keys(methods);

        const output = keys.forEach(key => {
            const method = methods[key];
            const { IOs, code } = method;
            let imports;

            zip.methods.file(
                `${key}.js`,
                coder.methodToImports(method, methods) +
                    "\n" +
                    coder.methodToGlobal(method, { simple: true })
            );

            zip.tests.file(`${key}.spec.js`, coder.test(key, method));

            const iosCode = Object.keys(IOs || {}).reduce(
                (memo, k, index) => {
                    const IO = IOs[k],
                        { input, expected } = IO;

                    const inputLine = coder.inputsToJson(input, index + 1);
                    const expectedData = coder.expectedToJson(
                        expected,
                        index + 1,
                        key
                    );

                    memo.inputs.push(inputLine);
                    memo.expected.push(expectedData.code);

                    if (expectedData.imports) {
                        imports = expectedData.imports;
                    }

                    if (expectedData.template) {
                        zip.templates.file(
                            expectedData.template.name,
                            expectedData.template.content
                        );
                    }

                    return memo;
                },
                { inputs: [], expected: [], templates: "" }
            );

            if (imports) {
                iosCode.expected.unshift(imports + "\n");
            }

            zip.in.file(`${key}.js`, iosCode.inputs.join("\n"));
            zip.out.file(`${key}.js`, iosCode.expected.join("\n"));
        }, {});

        zip.root.file("package.json", exports.packageJson);
        zip.mocks.file("helpers.js", exports.helpers);
        zip.root.file(".babelrc", exports.babel);

        zip.root.generateAsync({ type: "blob" }).then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
    };
};
