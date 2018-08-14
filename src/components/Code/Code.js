import React, {Component} from 'react';
import './Code.css';
import {Ace} from "../Ace/Ace";
import Bar from "../Bar/Bar";
import {runCode} from "../../utils/code";
import {AceDiff} from "../Ace/AceDiff";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import 'rc-tabs/dist/rc-tabs.css';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

class Code extends Component {

    state = {
        code: '',
        input: '',
        output: '',
        expected: '',
        width: window.innerWidth,
        height: window.innerHeight,
    }

    componentWillReceiveProps(props) {
        const {code, input, output, expected} = props;

        if (code !== this.state.code ||
            input !== this.state.input ||
            output !== this.state.output||
            expected !== this.state.expected
        ) {
            this.setState({code, input, output, expected});
        }
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keydown)
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keydown)
        window.removeEventListener('resize', this.updateWindowDimensions);
        clearInterval(this.interval);
    }

    keydown = (ev) => {
        if (ev.which === 13 && ev.metaKey) {
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
    }

    run = async () => {
        let {code, input, expected} = this.state,
            {globals, isLoading} = this.props;

        if (isLoading) return;

        this.setState({output: '// running...'});
        this.props.setIsRunning(true);
        const result = await runCode(input, code, globals);
        this.props.setIsRunning(false);

        this.setState({output: result.output, isPromise: result.isPromise});

        this.props.setCode({code, input, output: result.output, expected, isPromise: result.isPromise});
    }

    save = () => {
        let {code, input, output, expected, isPromise, isLoading} = this.state;

        if (isLoading) return;

        const name = prompt();

        if (name) {
            this.props.setCode({code, input, output, expected, isPromise});
            this.props.makeMethod(name, {code, input, output, expected, isPromise});
        }
    }

    toggleAutoPlay = (ev) => {

        ev.preventDefault();

        let {autoplay} = this.state;

        autoplay = !autoplay;

        if (autoplay) {
            this.interval = setInterval(() => this.run(), 500);
        } else {
            clearInterval(this.interval);
        }

        this.setState({autoplay});
    }

    render() {
        const {code, input, output, expected, width, autoplay} = this.state;

        let height = this.state.height - 100;

        return (
            <div className="Code-container">
                <Bar
                    run={this.run}
                    onNavigateHome={this.props.onNavigateHome}
                    showGlobals={this.props.showGlobals}
                    save={this.save}
                    loadIO={this.props.loadIO}
                    runAll={this.props.runAll}
                    download={this.props.download}
                    autoplay={autoplay}
                    toggleAutoPlay={this.toggleAutoPlay}
                />
                <div className="row">
                    <div className="column">
                        <Ace value={code} onChange={(code) => this.setState({code})}/>
                    </div>
                    <div className="column">
                        <Ace value={input} onChange={(input) => this.setState({input})} height={height/2}/>

                        <div style={{maxWidth: width/2, color:'#ccc'}}>
                        <Tabs
                            defaultActiveKey="1"
                            renderTabBar={()=><ScrollableInkTabBar />}
                            renderTabContent={()=><TabContent />}
                            tabBarPosition={"bottom"}
                        >
                            <TabPane tab='result' key="1">
                                <Ace value={output} onChange={(output) => this.setState({output})} height={height/2}/>
                            </TabPane>
                            <TabPane tab='expected' key="2" disabled={false}>
                                <Ace value={expected} onChange={(expected) => this.setState({expected})} height={height/2}/>
                            </TabPane>
                            <TabPane tab='diff' key="3" disabled={false}>
                                <AceDiff value1={output} value2={expected} height={height/2}/>
                            </TabPane>
                        </Tabs>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Code;
