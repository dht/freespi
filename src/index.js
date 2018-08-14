import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import store from "./reducers/store";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom'
import {guid8} from "./utils/guid";
import {DiffExample} from "./components/Ace/DiffExample";


const CreateNew = () => {
    return  <Redirect to={`/${guid8()}/`}/>
}

const ToCanvas = (props) => {
    const {match} = props,

        {params} = match || {},
        {codeId} = params;

    // console.log('toCanvas', true);

    return  <Redirect to={`/${codeId}/_`}/>
}

ReactDOM.render(<Provider store={store}>
    <Router>
        <div id="router">
        <Route exact path="/" component={CreateNew}/>
        {/*<Route exact path="/diff" component={DiffExample}/>*/}
        <Route exact path="/:codeId/" component={ToCanvas}/>
        <Route path="/:codeId/:method" component={App}/>
        </div>
    </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
