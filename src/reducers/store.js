import {applyMiddleware, compose, createStore} from "redux";
import ReduxThunk from "redux-thunk";


import saveToFirebase from "../middlewares/saveToFirebase";

import App from "./index";

let store = createStore(App, compose(applyMiddleware(ReduxThunk, saveToFirebase), //log, extraMiddleware
        window && window.devToolsExtension ? window.devToolsExtension() : f => f));

export default store;




