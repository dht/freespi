import { delay } from "redux-saga";
import {
    put,
    takeEvery,
    call,
    takeLatest,
    all,
    select
} from "redux-saga/effects";
import * as diff from "../utils/diff";

let latestSnapshot;

// Our worker Saga: will perform the async increment task
export function* save(action) {
    if (action["@@redux-saga/SAGA_ACTION"]) return;

    yield delay(5000);

    const state = yield select();
    const delta = diff.diff(latestSnapshot, state);

    if (delta && latestSnapshot) {
        yield put({ type: "SET_IS_DIRTY", value: true });
    }

    latestSnapshot = state;
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchAll() {
    yield takeLatest("*", save);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([watchAll()]);
}
