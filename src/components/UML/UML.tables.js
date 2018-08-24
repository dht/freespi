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

    return (
        <div className="box">
            <ul className="inputs">
                {inputs.sort(byRun).map(log => (
                    <IO id={log.id} log={log.inputs} run={log.run} />
                ))}
            </ul>
            <div className="title">
                {id}
                <div className="x" onClick={props.onIgnore}>
                    <i className="material-icons icon">close</i>
                </div>
            </div>
            <ul className="outputs">
                {outputs.sort(byRun).map(log => (
                    <IO id={log.id} log={log.result} run={log.run} />
                ))}
            </ul>
        </div>
    );
};

const BoxSimple = props => {
    const { id, log } = props,
        { runs = {} } = log || {};

    return (
        <div className="box">
            <div className="title">
                {id}
                <div className="x" onClick={props.onIgnore}>
                    <i className="material-icons icon">close</i>
                </div>
            </div>
            <ul className="outputs">
                {Object.keys(runs)
                    .sort(byRun)
                    .map(runId => (
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

    onIgnore = (key) => {
        if (window.ignoreList) {
            window.ignoreList.push(key);
        }
    }

    renderBox(id, key, log) {
        const { isIO } = this.props;

        return isIO ? (
            <BoxSimple
                key={key}
                id={id}
                log={log}
                onIgnore={() => this.onIgnore(key)}
            />
        ) : (
            <Box
                key={key}
                id={id}
                log={log}
                onIgnore={() => this.onIgnore(key)}
            />
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

    return parseFloat(a.run) > parseFloat(b.run) ? 1 : -1;
};

export default UMLTables;
