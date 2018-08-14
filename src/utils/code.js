const _code = (input, code, globals) => {
    return `
${globals}
${input}

const fnc = async() => {
    try {
        ${code}
    } catch (e) {
        return e;
    }
}

return fnc();
`;
};

const _method = (name, vars = [], code) => {
    const async = code.indexOf("await ") >= 0 ? "async" : "";

    return `const ${name} = ${async} (${vars.join(", ")}) => {
    ${code}
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

export const runCode = async (input, code, globals = "") => {
    let output, isPromise;

    try {
        const parsedCode = _code(input, code, globals);
        console.log('parsedCode ->', parsedCode);
        output = new Function(parsedCode)();
    } catch (e) {
        return {
            ok: false,
            output: e.message,
        };
    }

    if (output.then) {
        output = await output;
        isPromise = true;
    } else {
        isPromise = false;
    }

    output = JSON.stringify(output, null, 4);

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

export const methodsToGlobal = methods => {
    // console.log('methods', methods);

    return Object.keys(methods).reduce((output, key) => {
        if (key === "_") return output;

        const method = methods[key],
            { code } = method || {},
            vars = extractVarsFromMethod(method);

        output += _method(key, vars, code);

        return output;
    }, "");
};



const _prepareInput = (input) => {
    const result = identify(input);

    if (typeof input === "string" && !result.isObject) {
        input = '"' + input + '"';
    }
    ;

    return input;
}

