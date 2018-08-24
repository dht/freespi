import React, { Component } from "react";
import "./UML.css";

const logIt = log => {
    let newLog = log;
    console.clear();
    const { params = {}, output } = log; 
    const keys = Object.keys(params);

    // only a single param
    if (keys.length === 1) {
        newLog = {
            input: log.params[keys[0]],
            output: log.output
        };
    }

    if (typeof newLog === "object") {
        console.log(JSON.stringify(newLog, null, 4));
    } else {
        console.log(newLog);
    }
};

const IO = props => {
    const { id, log, run } = props;

    return (
        <li key={id} onMouseOver={() => logIt(log)}>
            {run}
        </li>
    );
};

const Box = props => {
    const { id, log } = props,
        { inputs = [], outputs = [] } = log || {};

    const inputsSorted = inputs.sort(byRun);
    const outputSorted = outputs.sort(byRun);

    return (
        <div className="box">
            <ul className="inputs">
                {inputsSorted.map(log => (
                    <IO id={log.id} log={log.inputs} run={log.run} />
                ))}
            </ul>
            <div className="title">{id}</div>
            <ul className="outputs">
                {outputSorted.map(log => (
                    <IO id={log.id} log={log.result} run={log.run} />
                ))}
            </ul>
        </div>
    );
};

const BoxSimple = props => {
    const { id, log } = props,
        { runs = {} } = log || {};

    const keys = Object.keys(runs)
        .map(i => parseInt(i, 10))
        .sort(byRunId);

    return (
        <div className="box">
            <div className="title">{id}</div>
            <ul className="outputs">
                {keys.map(runId => (
                    <IO
                        id={runId}
                        log={{
                            params: runs[runId].input,
                            output: runs[runId].output
                        }}
                        run={runId}
                    />
                ))}
            </ul>
        </div>
    );
};

export class UMLTables extends Component {
    state = {};

    renderBox(id, key, log) {
        const { isIO } = this.props;

        return isIO ? (
            <BoxSimple key={key} id={id} log={log} />
        ) : (
            <Box key={key} id={id} log={log} />
        );
    }

    render() {
        const { logs, show } = this.props;

        return (
            <div className="content">
                {Object.keys(logs).map(key =>
                    this.renderBox(key, key, logs[key])
                )}
            </div>
        );
    }
}

const byRun = (a, b) => {
    if (a.run === b.run) return 0;

    return a.run > b.run ? 1 : -1;
};

const byRunId = (a, b) => {
    if (a === b) return 0;

    return a > b ? 1 : -1;
};

export default UMLTables;
