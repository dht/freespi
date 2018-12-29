import React, { Component } from "react";
import "./Code.css";
import { Ace } from "../Ace/Ace";
import Bar from "../Bar/Bar";
import { runCode } from "../../utils/code";
import { AceDiff } from "../Ace/AceDiff";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import "rc-tabs/dist/rc-tabs.css";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

class Code extends Component {
    state = {
        code: "",
        input: "",
        output: "",
        expected: "",
        width: window.innerWidth,
        height: window.innerHeight,
        focusedAce: 1,
        activeTab: "1",
        isDirty: false
    };

    componentWillReceiveProps(props) {
        const { code, input, output, expected } = props;

        if (
            code !== this.state.code ||
            input !== this.state.input ||
            output !== this.state.output ||
            expected !== this.state.expected
        ) {
            this.setState({ code, input, output, expected, isDirty: false });
        }
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentDidMount() {
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("resize", this.updateWindowDimensions);

        // required for saving a new workspace
        if (this.props.current === "_") {
            setTimeout(() => {
                this.run();
            }, 1500);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("resize", this.updateWindowDimensions);
        clearInterval(this.interval);
    }

    nextInput = () => {
        let { focusedAce, activeTab } = this.state;

        focusedAce = Math.max(1, (focusedAce + 1) % 5);

        if (focusedAce === 3) {
            activeTab = "1";
        }

        if (focusedAce === 4) {
            activeTab = "2";
        }

        this.setState({ focusedAce, activeTab });
    };

    focus = which => {
        this.setState({ focusedAce: which });
    };

    keydown = ev => {
        if (ev.which === 69 && ev.metaKey) {
            ev.preventDefault();
            this.expectedEqualToResult();
        }

        if (ev.which === 13 && ev.metaKey) {
            ev.preventDefault();
            this.run();

            if (ev.shiftKey) {
                this.props.runAll();
            }
        }

        if (ev.which === 83 && ev.altKey) {
            ev.preventDefault();
            this.save();
        }

        if (ev.which === 71 && ev.altKey) {
            ev.preventDefault();
            this.props.showGlobals();
        }

        if (ev.which === 72 && ev.altKey) {
            ev.preventDefault();
            this.props.onNavigateHome();
        }

        if (ev.which >= 48 && ev.which <= 57 && ev.altKey) {
            ev.preventDefault();
            let i = ev.which - 48;

            if (i === 0) i = 10;

            this.props.loadIO(i);
        }
    };

    run = async () => {
        let { code, input, expected } = this.state,
            { globals, isLoading } = this.props;

        if (isLoading) return;

        // for UML view
        if (window.clearlog) {
            window.clearlog();
        }

        this.setState({ output: "// running..." });
        this.props.setIsRunning(true);
        const result = await runCode(input, code, globals);
        this.props.setIsRunning(false);

        this.setState({
            output: result.output,
            isPromise: result.isPromise,
            isDirty: false
        });

        this.props.setCode({
            code,
            input,
            output: result.output,
            expected,
            isPromise: result.isPromise
        });

        this.props.save(this.props.current);
    };

    save = () => {
        let {
            code,
            input,
            output,
            expected,
            isPromise,
            isLoading
        } = this.state;

        if (isLoading) return;

        const name = prompt();

        if (name) {
            this.props.setCode({ code, input, output, expected, isPromise });
            this.props.makeMethod(name, {
                code,
                input,
                output,
                expected,
                isPromise
            });
        }
    };

    toggleAutoPlay = ev => {
        ev.preventDefault();

        let { autoplay } = this.state;

        autoplay = !autoplay;

        if (autoplay) {
            this.interval = setInterval(() => this.run(), 500);
        } else {
            clearInterval(this.interval);
        }

        this.setState({ autoplay });
    };

    expectedEqualToResult = () => {
        const { output } = this.state;

        this.setState({ expected: output });
        setTimeout(() => {
            this.run();
        }, 1000);
    };

    onBlur = id => {
        let { code, input, expected, output } = this.state;

        this.props.setCode({
            code,
            input,
            expected,
            output
        });
    };

    set = value => {
        this.setState(value);

        /*
        if (value.code) {
            this.setState({ isDirty: true });
        } else {
            this.props.setDirty();
        }
        */
    };

    deleteIO() {
        const yes = window.confirm("delete this IO?");

        if (yes) {
            this.props.removeIO();
        }
    }

    render() {
        const { current } = this.props;

        const {
            code,
            input,
            output,
            expected,
            width,
            autoplay,
            focusedAce,
            activeTab,
            isDirty
        } = this.state;

        let height = this.state.height - 100;

        const label = isDirty ? "code*" : "code";

        return (
            <div className="Code-container">
                <Bar
                    run={this.run}
                    onNavigateHome={this.props.onNavigateHome}
                    showGlobals={this.props.showGlobals}
                    showUML={this.props.showUML}
                    save={this.save}
                    loadIO={this.props.loadIO}
                    runAll={this.props.runAll}
                    download={this.props.download}
                    share={this.props.share}
                    autoplay={autoplay}
                    toggleAutoPlay={this.toggleAutoPlay}
                />
                <div className="row">
                    <div className="column">
                        <Ace
                            value={code}
                            onChange={code => this.set({ code })}
                            focus={focusedAce === 1}
                            onFocus={() => this.focus(1)}
                            label={label}
                            current={current}
                            onBlur={() => this.onBlur(1)}
                        />
                    </div>
                    <div className="column">
                        <Ace
                            value={input}
                            onChange={input => this.set({ input })}
                            height={height / 2}
                            focus={focusedAce === 2}
                            onFocus={() => this.focus(2)}
                            onBlur={() => this.onBlur(2)}
                            label={"input"}
                        />

                        <div
                            style={{
                                maxWidth: width / 2,
                                color: "#ccc",
                                position: "relative"
                            }}>
                            <button
                                className="delete"
                                onClick={() => this.deleteIO()}>
                                <i className="material-icons">delete</i>
                            </button>

                            <button
                                className="equal"
                                onClick={() => this.expectedEqualToResult()}>
                                =
                            </button>

                            <Tabs
                                activeKey={activeTab}
                                defaultActiveKey="1"
                                renderTabBar={() => <ScrollableInkTabBar />}
                                renderTabContent={() => <TabContent />}
                                tabBarPosition={"bottom"}
                                onChange={key =>
                                    this.setState({ activeTab: key })
                                }>
                                <TabPane tab="output" key="1">
                                    <Ace
                                        value={output}
                                        onChange={output =>
                                            this.set({ output })
                                        }
                                        height={height / 2}
                                        focus={focusedAce === 3}
                                        onFocus={() => this.focus(3)}
                                        onBlur={() => this.onBlur(3)}
                                        label={"output"}
                                    />
                                </TabPane>
                                <TabPane
                                    tab="expected"
                                    key="2"
                                    disabled={false}>
                                    <Ace
                                        value={expected}
                                        onChange={expected =>
                                            this.set({ expected })
                                        }
                                        height={height / 2}
                                        focus={focusedAce === 4}
                                        onFocus={() => this.focus(4)}
                                        onBlur={() => this.onBlur(4)}
                                        label={"expected"}
                                    />
                                </TabPane>
                                <TabPane tab="diff" key="3" disabled={false}>
                                    <AceDiff
                                        value1={output}
                                        value2={expected}
                                        height={height / 2}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const whichFocus = () => {};

export default Code;
