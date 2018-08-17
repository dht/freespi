import React, {Component} from 'react';
import './App.css';
import Code from "./Code/CodeContainer";
import Runner from './Runner/RunnerContainer';
import Globals from "./Globals/GlobalsContainer";
import "animate.css/animate.css";

class App extends Component {
    state = {
        id: 0,
        method: '',
        showGlobals: false,
    }

    addMethodToGlobals = (name, code, vars = []) => {
        let {globals} = this.state;

        globals += `
        
const ${name} = (${vars.join(', ')}) => {
    ${code}
}`;

        this.setState({globals});
    }

    _getParam = (props, which) => {
        const {match} = props,
            {params} = match || {};
        return params[which];
    }

    loadWorkspaceData = (props) => {
        const codeId = this._getParam(props, "codeId"),
            method = this._getParam(props, "method");

        if (codeId !== this.state.id) {
            // console.log('codeId', codeId);
            // console.log('this.state.id', this.state.id);
            this.setState({id: codeId});
            this.props.loadWorkspaceData(codeId, method);
        }

        if (method && method !== this.state.method) {
            this.setState({method});
            this.props.setCurrent(method);
        }
    }

    componentWillReceiveProps(props) {
        this.loadWorkspaceData(props);
    }

    componentDidMount() {
        // console.log('componentDidMount', true);
        this.loadWorkspaceData(this.props);
        // this.saveInterval = setInterval(this.props.autosave, 5000);
    }

    componentWillUnmount() {
        // clearInterval(this.saveInterval);
    }

    onDelete = (key) => {
        const {current} = this.props;

        this.props.onDelete(key);

        if (current === key) {
            this.props.onNavigateHome();
        }
    }

    render() {
        const {id, showGlobals, method} = this.state,
            view = this._getParam(this.props, "view");

        const Cmp = view === "run" ? Runner : Code;

        return (
            <div className="App-container">
                <Cmp
                    id={id}
                    showGlobals={() => this.setState({showGlobals: true})}
                    onNavigateHome={this.props.onNavigateHome}
                    addMethodToGlobals={this.addMethodToGlobals}
                />
                <Globals
                    show={showGlobals}
                    onLoadMethod={(method) => this.props.navigateToCurrent(method)}
                    onNavigateHome={this.props.onNavigateHome}
                    onDelete={this.onDelete}
                    onClose={() => this.setState({showGlobals: false})}
                />
            </div>
        );
    }
}

export default App;
