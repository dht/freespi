export const initLogs = () => {
    window.clearlog = function() {
        window.id = 1;
        window.run = 1;
        window.rlogs = [];
        window.depth = 0;
    };

    window.rlog = function(run, name, inputs, result) {
        const id = window.id++;
        window.run = window.run + (inputs ? 1 : 0);

        window.rlogs.push({
            id,
            ts: new Date().getTime(),
            name,
            inputs,
            result,
            run,
            depth: window.depth,
        });
    };
    window.clearlog();
};

export const getLogs = () => {
    let logs = window.rlogs || [];
    let maxRun = 0;

    logs = logs.reduce((memo, log) => {
        const { name, inputs, run } = log;

        maxRun = Math.max(maxRun, run);

        memo[name] = memo[name] || {};
        memo[name].runs = memo[name].runs || {};
        memo[name].runs[run] = memo[name].runs[run] || {};
        memo[name].runs[run].name = log.name;

        if (inputs) {
            memo[name].inputs = memo[name].inputs || [];
            memo[name].inputs.push(log);
            memo[name].runs[run].input = log.inputs;
            memo[name].runs[run].start = log.ts;
        } else {
            memo[name].outputs = memo[name].outputs || [];
            memo[name].outputs.push(log);
            memo[name].runs[run].output = log.result;
            memo[name].runs[run].end = log.ts;
            memo[name].runs[run].duration =
                memo[name].runs[run].end - memo[name].runs[run].start;
        }

        return memo;
    }, {});

    return {
        logs,
        maxRun
    };
};
