import React, { Component } from "react";
import "./Runner.css";
import { Ace } from "../Ace/Ace";
import { runCode } from "../../utils/code";
import Bar from "../Bar/Bar";

export class Runner extends Component {
    state = {
        input: "",
        output: ""
    };

    componentDidMount() {
        window.addEventListener("keydown", this.keydown);
        if (this.props.current === "_") {
            setTimeout(() => {
                this.run();
            }, 1500);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keydown);
        clearInterval(this.interval);
    }

    keydown = ev => {
        if (ev.which === 13 && ev.metaKey) {
            ev.preventDefault();
            this.run();

            if (ev.shiftKey) {
                this.props.runAll();
            }
        }
    };

    componentWillReceiveProps(props) {
        const { code, input, output, expected } = props;

        if (
            code !== this.state.code ||
            input !== this.state.input ||
            output !== this.state.output ||
            expected !== this.state.expected
        ) {
            this.setState({ code, input, output, expected });
        }
    }

    run = async () => {
        let { code, input, expected } = this.state,
            { globals, isLoading } = this.props;

        if (isLoading) return;

        this.setState({ output: "// running..." });
        const result = await runCode(input, code, globals);
        this.setState({ output: result.output, isPromise: result.isPromise });
    };

    render() {
        const { current } = this.props;
        const { input, output } = this.state;

        return (
            <div className="Runner-container">
                <Bar
                    run={this.run}
                    loadIO={this.props.loadIO}
                    download={this.props.download}
                    minimal={true}
                />
                <div className="row">
                    <div className="column">
                        <Ace
                            value={input}
                            onChange={input => this.setState({ input })}
                            label="input"
                            current={current}
                        />
                    </div>
                    <div className="column">
                        <Ace
                            value={output}
                            onChange={output => this.setState({ output })}
                            label="output"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Runner;
