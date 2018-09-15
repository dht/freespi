import React, { Component } from "react";
import "./UML.css";
import ReactModal from "react-modal";
import IO from "./IO";
import classnames from "classnames";

const Button = props => (
    <div onClick={props.onClick} className="Button-container">
        {props.children}
    </div>
);

export class UMLTimeline extends Component {
    state = {
        currentRun: 10
    };

    _findRun() {
        const { logs, show } = this.props;
        const { currentRun } = this.state;

        const run = Object.keys(logs).reduce((memo, key) => {
            const { runs } = logs[key];

            if (runs[currentRun]) {
                memo = runs[currentRun];
                return memo;
            } else {
                return memo;
            }
        }, {});

        let input = run.input || run.params;
        let output = run.output;

        if (typeof input === "object") {
            input = JSON.stringify(input, null, 4);
        }
        if (typeof output === "object") {
            output = JSON.stringify(output, null, 4);
        }

        return { ...run, input, output };
    }

    renderPages() {
        const { maxRun, logs } = this.props;
        const { currentRun } = this.state;

        return createArray(maxRun).map(i => {
            const className = classnames("page", {
                selected: i === currentRun
            });

            return (
                <div
                    key={i}
                    className={className}
                    onClick={() => this.setState({ currentRun: i })}>
                    {i}
                </div>
            );
        });
    }

    render() {
        const run = this._findRun();

        return (
            <div className="vertical">
                <IO inputs={run.inputs} output={run.output} />
                <div className="pages">{this.renderPages()}</div>
                <div className="info">{run.name}</div>
            </div>
        );
    }
}

const byRun = (a, b) => {
    if (a.run === b.run) return 0;

    return a.run > b.run ? 1 : -1;
};

const createArray = size => {
    let output = [];
    for (let i = 1; i <= size; i++) {
        output.push(i);
    }
    return output;
};

export default UMLTimeline;
