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

const _method = (name, vars = [], code = "", withLog = true) => {
    const _async = code.indexOf("await ") >= 0 ? "async" : "";
    const _await = code.indexOf("await ") >= 0 ? "await" : "";

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

const extractInputVariables = input => {
    let re = /(^const|^let)\s+([a-zA-Z_0-9]+)\s+=\s+([^;^\n]+)/gm,
        match,
        results = [];

    // console.log('input', input);

    while ((match = re.exec(input)))
        results.push({
            name: match[2],
            value: match[3]
        });

    // console.log('results', results);

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

export const methodsToGlobal = (methods, withLog = false) => {
    // console.log('methods', methods);

    return Object.keys(methods).reduce((output, key) => {
        if (key === "_") return output;

        const method = methods[key],
            { code } = method || {},
            vars = extractVarsFromMethod(method);

        output += _method(key, vars, code, withLog);

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
            const {input, output, expected} = IO;

            if (!input || !output || !expected) {
                memo.empty++;
            } else  if (output === expected){
                memo.ok++;
            } else {
                memo.fail++;
            }
             
            return memo;
        },
        { ok: 0, fail: 0, empty: 0 }
    );
};
