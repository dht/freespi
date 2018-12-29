const fs = require("fs");
const path = require("path");
const glob = require("glob");
const codeUtils = require("./code");

let root = path.resolve("./src/_working");

const del = name => {
    const p = path.resolve(`${root}/${name}.js`);

    if (!fs.existsSync(p)) return;

    fs.unlinkSync(p);
};

const delIO = name => {
    const p = path.resolve(`${root}/IOs/${name}.json`);

    if (!fs.existsSync(p)) return;

    fs.unlinkSync(p);
};

const write = (p, data) => {
    if (typeof data === "object") {
        data = JSON.stringify(data, null, 4);
    }

    fs.writeFileSync(path.resolve(root, p), data);
};

const read = name => {
    const p = path.resolve(`${root}/${name}.js`);

    if (!fs.existsSync(p)) return;

    let content = fs.readFileSync(p).toString() || "";

    return content;
};

const writeCode = (name, code, IOs) => {
    const p = path.resolve(`${root}/${name}.js`);

    const content = codeUtils.methodToGlobal(
        { id: "_", code, IOs },
        { simple: true }
    );

    fs.writeFileSync(p, content);
};

const readIO = name => {
    const p = path.resolve(`${root}/IOs/${name}.json`);

    if (!fs.existsSync(p)) return;

    let content = fs.readFileSync(p).toString();

    try {
        content = JSON.parse(content);
    } catch (e) {
        console.log("e.message ->", e.message);
    }

    return content || {};
};

const writeIO = (name, IOs, stats) => {
    const p = path.resolve(`${root}/IOs/${name}.json`);

    const data = {
        IOs,
        stats
    };

    fs.writeFileSync(p, JSON.stringify(data, null, 4));
};

const getCode = name => {
    const regex = /export const [a-zA-Z_]+\s*=\s*\(?[a-zA-Z, ]*\)?\s*=>\s*\{\n*\s*(.|[\s\S]+)?};/g;

    const content = read(name);
    const matches = regex.exec(content);

    if (matches.length > 1 && matches[1]) return matches[1];
};

const getMethods = (p, data) => {
    const files = glob.sync(`${root}/*.js`);

    return files.map(file =>
        file
            .split("/")
            .pop()
            .split(".")
            .shift()
    );
};

export const getWorkspace = () => {
    const methods = getMethods();

    return methods.reduce(
        (output, key) => {
            const code = getCode(key);
            const io = readIO(key);

            output.methods[key] = {
                id: key,
                ...io,
                code
            };

            return output;
        },
        {
            current: "_",
            id: "",
            methods: {}
        }
    );

    return {};
};

export const writeMethod = (name, code, IOs, stats) => {
    writeCode(name, code, IOs);
    writeIO(name, IOs, stats);
};

export const reset = () => {
    writeMethod(
        "_",
        "return 5;",
        [
            {
                input: "const input = 5;",
                output: "5",
                expected: "5"
            }
        ],
        { empty: 0, fail: 0, ok: 1 }
    );
};

export const deleteMethod = name => {
    del(name);
    delIO(name);
};
