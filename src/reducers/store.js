import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import saveToFirebase from "../middlewares/saveToFirebase";
import rootSaga from "./sagas";
import App from "./index";

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    App,
    compose(
        applyMiddleware(ReduxThunk, saveToFirebase, sagaMiddleware), //log, extraMiddleware
        window && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

// sagaMiddleware.run(rootSaga);

export default store;
