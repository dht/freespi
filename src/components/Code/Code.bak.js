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
import SplitPane from 'react-split-pane';

class Code extends Component {

    state = {
        code: '',
        input: '',
        output: '',
        result: '',
        width: window.innerWidth,
        height: window.innerHeight,
    }

    componentWillReceiveProps(props) {
        const {method} = props,
            {code, input, output} = method || {};

        if (code !== this.state.code ||
            input !== this.state.input ||
            output !== this.state.output) {
            this.setState({code, input, output});
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
    }

    keydown = (ev) => {
        if (ev.which === 13 && ev.metaKey) {
            this.run();
        }
    }

    run = () => {
        let {code, input} = this.state,
            {methods} = this.props;

        const result = runCode(input, code, methods);

        this.setState({output: result.output});

        this.props.setCode({code, input, output: result.output});
    }

    save = () => {
        let {code, input, output} = this.state;

        const name = prompt();

        if (name) {
            this.props.makeMethod(name, {code, input, output});
        }
    }

    switchMode = () => {

    }

    render() {
        const {code, input, output, result, width} = this.state,
            {current} = this.props;

        let height = this.state.height - 100;

        return (
            <div className="Code-container">
                <Bar
                    run={this.run}
                    showHome={current !== '_'}
                    onNavigateHome={this.props.onNavigateHome}
                    showGlobals={this.props.showGlobals}
                    save={this.save}
                    switchMode={this.switchMode}
                />


                <SplitPane split="vertical" defaultSize={width /2} onChange={ size => localStorage.setItem('splitPos', size) }>
                    <div className="aceContainer">
                        <Ace value={code} onChange={(code) => this.setState({code})}/>
                    </div>
                    <SplitPane split="horizontal" defaultSize={height /2} onChange={ size => localStorage.setItem('splitPos', size) }>
                        <div className="aceContainer">
                            <Ace value={input} onChange={(input) => this.setState({input})} height={500}/>
                        </div>
                        <div style={{maxWidth: width/2, color:'#ccc'}} className="aceContainer">
                            <Tabs
                                defaultActiveKey="2"
                                renderTabBar={()=><ScrollableInkTabBar />}
                                renderTabContent={()=><TabContent />}
                                tabBarPosition={"bottom"}
                            >
                                <TabPane tab='Result' key="1">
                                    <Ace value={output} onChange={(output) => this.setState({output})} height={height/2}/>
                                </TabPane>
                                <TabPane tab='Expected' key="2">
                                    <Ace value={result} onChange={(result) => this.setState({result})} height={height/2}/>
                                </TabPane>
                                <TabPane tab='Both' key="3">
                                    <AceDiff value1={output} value2={result} height={height/2}/>
                                </TabPane>
                            </Tabs>
                        </div>
                    </SplitPane>
                </SplitPane>
            </div>
        );
    }
}

export default Code;
