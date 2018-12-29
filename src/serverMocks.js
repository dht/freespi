module.exports = {
    current: "_",
    id: "7210cba4",
    methods: {
        _: {
            id: "_",
            IOs: [
                {
                    expected: "5",
                    input: "const input = 5;",
                    output: "5"
                }
            ],
            stats: {
                empty: 0,
                fail: 0,
                ok: 1
            },
            code: "return input;\n"
        },
        parseNumber: {
            id: "parseNumber",
            IOs: [
                {
                    expected: "5",
                    input: "const input = 5;",
                    output: "5"
                }
            ],
            stats: {
                empty: 0,
                fail: 0,
                ok: 1
            },
            code: "return input;\n"
        },
        toString: {
            IOs: [
                {
                    expected: "5",
                    input: "const input = 5;",
                    isDirty: false,
                    output: "5"
                }
            ],
            code: "return input;",
            id: "toString",
            isPromise: true,
            stats: { empty: 0, fail: 0, ok: 1 }
        }
    }
};
