const _code = (input, code, globals) => {
    return `
${globals}
${input}

const fnc = async() => {
    try {
        ${code}
    } catch (e) {        
        return Promise.reject(e);
    }
}

return fnc();
`;
};

const addTab = str => {
    return str.replace(/^(.)/gim, "\t$1");
};

const _method = (name, vars = [], code = "", options = {}) => {
    const _async = code.indexOf("await ") >= 0 ? "async" : "";
    const _await = code.indexOf("await ") >= 0 ? "await" : "";
    let { withLog = false, simple = false } = options;

    if (simple) {
        return `export const ${name} = ${_async} (${vars.join(", ")}) => {
${addTab(code)}
};
`;
    }

    const ignore = /^\/\/@ ignore/.test(code);

    if (ignore) {
        withLog = false;
    }

    const preLogCode = withLog
        ? `
    // for UML view
    window.depth++;
    const run = window.run;
    if (window.rlog) {
        window.rlog(run, "${name}", {${vars.join(", ")}});
    }`
        : "";

    const postLogCode = withLog
        ? `
    if (window.rlog) {
        window.rlog(run, "${name}", null, result);
    }
    window.depth--;
    `
        : "";

    return `const ${name} = ${_async} (${vars.join(", ")}) => {
        ${preLogCode}
        const result = ${_await}(${_async} () => {
            ${code}
        })();
        ${postLogCode}
        return result;
};
`;
};

const _identify = input => {
    return `(function (value) {
                
                const isArray = Array.isArray(value),
                     isObject = !isArray && typeof value === 'object'; 
                
                return {
                    isArray,
                    isObject,
                    value
                    }
            })(${input})
        `;
};

const identify = input => {
    try {
        return eval(_identify(input));
    } catch (e) {
        return {};
    }
};
const returnError = error => {
    const { stack, message } = error;
    const ok = false;
    const output = `/*\n${message}\n\n${stack}*/`;

    return {
        ok,
        output
    };
};

export const run = code => {
    let output;

    try {
        output = new Function(code)();
    } catch (e) {
        output = e.message;
    }

    return output;
};

export const runCode = async (input, code, globals = "") => {
    let output, isPromise;

    // debugger;

    const ts = new Date().getTime();

    const parsedCode = _code(input, code, globals);

    try {
        output = new Function(parsedCode)().catch(e => ({
            ok: false,
            error: e
        }));
    } catch (e) {
        return returnError(e);
    }

    if (output.then) {
        output = await output;
        isPromise = true;
    } else {
        isPromise = false;
    }

    if (output && output.ok === false) {
        const { error } = output;
        return returnError(error);
    }

    if (typeof output !== "string") {
        output = JSON.stringify(output, null, 4);
    }

    return { ok: true, output, isPromise };
};

const extractInputVariables = (input, asJson = false) => {
    let re = /(^const|^let)\s+([a-zA-Z_0-9]+)\s+=\s+([^;^\n]+)/gm,
        match,
        results = [];

    // console.log('input', input);

    while ((match = re.exec(input)))
        results.push({
            name: match[2],
            value: match[3]
        });

    if (asJson) {
        let vars = results.map(item => item.name).join(", ");
        const code = `${input}; return {${vars}};`;
        return run(code);
    }

    return results;
};

export const extractVars = input => {
    const vars = extractInputVariables(input);
    return vars.map(variable => variable.name);
};

export const extractVarsFromMethod = method => {
    const { IOs } = method,
        keys = Object.keys(IOs || {});

    if (!keys || keys.length === 0) return [];

    const firstKey = keys[0],
        IO = IOs[firstKey],
        { input } = IO || {};

    return extractVars(input);
};

export const methodToGlobal = (method, options) => {
    const { id, code } = method || {},
        vars = extractVarsFromMethod(method);

    return _method(id, vars, code, options);
};

export const methodsToGlobal = (methods, options) => {
    // console.log('methods', methods);

    // withLog = true;

    return Object.keys(methods).reduce((output, key) => {
        if (key === "_") return output;

        output += methodToGlobal(methods[key], options);

        return output;
    }, "");
};

const _prepareInput = input => {
    const result = identify(input);

    if (typeof input === "string" && !result.isObject) {
        input = '"' + input + '"';
    }
    return input;
};

export const downloadCode = (filename, text) => {
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

export const paramsToInput = params => {
    return Object.keys(params).reduce((output, key) => {
        const param = params[key];
        return (
            output + `const ${key} = ` + JSON.stringify(param, null, 4) + ";\n"
        );
    }, "");
};

export const StatsIOs = IOs => {
    return Object.keys(IOs).reduce(
        (memo, key) => {
            const IO = IOs[key];
            const { input, output, expected } = IO;

            if (!input || !output || !expected) {
                memo.empty++;
            } else if (output === expected) {
                memo.ok++;
            } else {
                memo.fail++;
            }

            return memo;
        },
        { ok: 0, fail: 0, empty: 0 }
    );
};

export const inputsToJson = (input, sampleId) => {
    const vars = extractInputVariables(input, true);
    let output;

    const json = JSON.stringify(vars, null, 4);

    return `export const sample${sampleId} = ${json}
`;
};

export const identifyExpeceted = expected => {
    let type, json;

    try {
        json = JSON.parse(expected);
        type = typeof json;
    } catch (e) {
        type = typeof expected;
    }

    if (type === "string" && expected.length > 20) {
        type = "text";
    }

    return type;
};

export const expectedToJson = (expected, sampleId, name) => {
    const type = identifyExpeceted(expected);
    let varName, varValue, imports, template, code;

    varName = `sample${sampleId}`;

    switch (type) {
        case "array":
        case "object":
            varValue = `${expected}`;
            break;
        case "text":
            imports = 'import * as file from "../helpers";';
            varValue = `file.readTemplate("${name}.sample${sampleId}.js")`;
            template = {
                name: `${name}.sample${sampleId}.js`,
                content: expected
            };
            break;

        case "boolean":
            varValue = `${expected}`;

        case "string":
        default:
            varValue = `"${expected}"`;
            break;
    }

    code = `export const ${varName} = ${varValue};\n`;

    return {
        imports,
        code,
        template
    };
};

export const test = (name, method) => {
    const vars = extractVarsFromMethod(method);

    const varsStr = vars.map(variable => `sample.${variable}`).join(",");

    return `// @flow
import { ${name} } from "../methods/${name}";
import * as samples from "../__mocks__/in/${name}";
import * as responses from "../__mocks__/out/${name}";

describe("${name}", () => {
    it("samples", () => {
        Object.keys(samples).forEach(key => {
            const sample = samples[key];
            const response = ${name}(${varsStr});

            expect(response).toEqual(responses[key]);
        });
    });
});
`;
};

export const methodToImports = (method, methods) => {
    const { code, id } = method || {};

    return (
        Object.keys(methods)
            .map(key => key)
            .filter(key => key !== id)
            .filter(key => {
                return code.indexOf(key + "(") >= 0;
            })
            .map(key => {
                return `import { ${key} } from "./${key}";`;
            })
            .join("\n") + "\n"
    );
};

export const methodToNpmImports = method => {
    const methods = ["clone"];

    const { code } = method || {};

    return (
        methods
            .filter(key => code.indexOf(key + "(") >= 0)
            .map(key => `import ${key} from "${key}";`)
            .join("\n") + "\n"
    );
};

export const ioToTests = (key, IOs) => {
    return Object.keys(IOs || {}).reduce(
        (memo, k, index) => {
            const IO = IOs[k],
                { input, expected } = IO;

            const inputLine = inputsToJson(input, index + 1);
            const expectedData = expectedToJson(expected, index + 1, key);

            memo.inputs.push(inputLine);
            memo.expected.push(expectedData.code);

            if (expectedData.imports) {
                memo.imports = expectedData.imports;
            }

            if (expectedData.template) {
                memo.templates.push(expectedData.template);
            }

            return memo;
        },
        { inputs: [], expected: [], templates: [], imports: null }
    );
};
