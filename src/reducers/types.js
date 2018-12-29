type IO = {
    input: string,
    output: string,
    expected: string
};

type Method = {
    id: string,
    code: string,
    isPromise: boolean,
    stats: {
        ok: number,
        fail: number,
        empty: number
    },
    IOs: [IO]
};

type Workspace = {
    id: string,
    current: string,
    currentIO: number,
    methods: {
        [string]: Method
    }
};
