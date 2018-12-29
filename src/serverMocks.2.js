module.exports = {
    current: "_",
    id: "",
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
        parseString: {
            id: "parseString",
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
        }
    }
};
