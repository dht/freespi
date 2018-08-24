import React from "react";
import {connect} from "react-redux";
import UML from './UML';

const mapStateToProps = (state, ownProps) => {
    let logs = window.rlogs || [];
    let maxRun = 0;

    logs = logs.reduce((memo, log) => {
        const {name, inputs, run} = log;

        maxRun = Math.max(maxRun, run);

        memo[name] = memo[name] || {};
        memo[name].runs = memo[name].runs || {};
        memo[name].runs[run] =  memo[name].runs[run] || {};
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
            memo[name].runs[run].duration = memo[name].runs[run].end - memo[name].runs[run].start;
        }

        return memo;
    }, {})

    return {
        logs,
        maxRun,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        method: () => {
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UML);