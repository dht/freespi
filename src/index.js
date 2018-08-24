import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { guid8 } from "./utils/guid";
import { DiffExample } from "./components/Ace/DiffExample";

const CreateNew = () => {
    return <Redirect to={`/${guid8()}/`} />;
};

const ToCanvas = props => {
    const { match } = props,
        { params } = match || {},
        { codeId } = params;

    // console.log('toCanvas', true);

    return <Redirect to={`/${codeId}/_`} />;
};

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div id="router">
                <Route exact path="/" component={CreateNew} />
                {/*<Route exact path="/diff" component={DiffExample}/>*/}
                <Route exact path="/:codeId/" component={ToCanvas} />
                <Route exact path="/:codeId/:method" component={App} />
                <Route exact path="/:codeId/:method/:view" component={App} />
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();

window.clearlog = function() {
    window.id = 1;
    window.run = 1;
    window.rlogs = [];
    window.depth = 0;
};

window.ignoreList = [];

window.rlog = function(run, name, inputs, result) {
    if (window.ignoreList.indexOf(name) >= 0) return;

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
        r: 321321
    });
};

window.clearlog();
