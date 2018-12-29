import * as api from "../api/api";
import * as actions from "./appState/appState_actions";
import * as selectors from "../selectors/selectors";
import * as coder from "../utils/code";
import * as storage from "../utils/storage";
import * as zip from "../utils/zip";
import { getWorkspace } from "../api/api";

export const loadApp = (id, current, currentIO) => {
    const isOffline = storage.getIsOffline();
    const data = storage.getOfflineData();

    return dispatch => {
        dispatch(actions.setIsLoading(true));

        getWorkspace().then(data => {
            dispatch(actions.setIsLoading(false));

            if (!data) {
                dispatch(actions.resetWorkspace(id));
            } else {
                // console.log('data', data);
                data["current"] = current;
                data["currentIO"] = parseInt(currentIO, 10);
                dispatch(actions.setWorkspace(data));
            }
        });
    };
};

export const saveMethod = id => {
    return (dispatch, getState) => {
        const state = getState(),
            methods = selectors.methodsSelector(state),
            method = methods[id];

        if (!method) return;

        api.writeMethod(id, method.code, method.IOs, method.stats);
    };
};

export const makeMethod = (name, data = {}) => {
    return (dispatch, getState) => {
        const state = getState();
        const current = selectors.currentSelector(state);
        const IOs = selectors.IOsSelector(state);

        // reset current
        if (current === "_") {
            dispatch(actions.resetMethod(current));
            api.reset();
        }

        dispatch(actions.setCurrent("_"));
        dispatch(actions.updateMethodCode(name, data.code, data.isPromise));

        dispatch(actions.setIOs(name, IOs));

        api.writeMethod(name, data.code, IOs);
    };
};

export const runAll = () => {
    return (dispatch, getState) => {
        const state = getState(),
            current = selectors.currentSelector(state),
            IOs = selectors.IOsSelector(state),
            methods = selectors.methodsSelector(state),
            code = selectors.codeSelector(state);

        const globals = coder.methodsToGlobal(methods);

        // console.log('IOs', current, IOs);

        if (!current || !IOs) return;

        Object.keys(IOs).forEach(async key => {
            const IO = IOs[key],
                { input } = IO || {};

            if (input) {
                const result = await coder.runCode(input, code, globals);

                if (result.ok) {
                    IO.output = result.output;
                }
            }
        });

        dispatch(actions.setIOs(current, IOs));
        // dispatch(setIsDirtyAllIOs(false));
    };
};

export const toggleOffline = () => {
    return (dispatch, getState) => {
        const state = getState(),
            isOffline = selectors.isOfflineSelector(state);

        if (!isOffline) {
            dispatch(actions.setIsOffline(true));
            storage.setOfflineData(state.appState);
            storage.setIsOffline(true);
        } else {
            dispatch(actions.setIsOffline(false));
            storage.setIsOffline(false);
        }
    };
};

export const setIsDirtyIO = isDirty => {
    return (dispatch, getState) => {
        const state = getState(),
            data = selectors.fourSelector(state),
            IO = selectors.IOSelector(state),
            { current, currentIO } = data;

        if (!IO || isDirty === IO.isDirty) return;

        dispatch(actions.updateIO(current, currentIO, { isDirty }));
    };
};

export const setIsDirtyAllIOs = isDirty => {
    return (dispatch, getState) => {
        const state = getState(),
            IOs = selectors.IOsSelector(state),
            current = selectors.currentSelector(state);

        Object.keys(IOs).forEach(key => {
            dispatch(actions.updateIO(current, key, { isDirty }));
        });
    };
};

export const removeIO = () => {
    return (dispatch, getState) => {
        const state = getState(),
            data = selectors.fourSelector(state),
            { current, currentIO } = data;

        dispatch(actions.removeIO(current, currentIO));
        dispatch(saveMethod(current));
    };
};

export const generateIO = (name, params) => {
    return (dispatch, getState) => {
        const state = getState(),
            methods = selectors.methodsSelector(state),
            current = selectors.currentSelector(state);

        const IOs = methods[name].IOs || {};

        const lastKey = Object.keys(IOs).reduce((output, key) => {
            return Math.max(output, key);
        }, 0);

        const nextKey = lastKey + 1;

        const input = coder.paramsToInput(params.inputs);

        dispatch(actions.updateIO(name, nextKey, { input, expected: " " }));
        dispatch(saveMethod(current));

        return Promise.resolve(nextKey);
    };
};

export const download = () => {
    return (dispatch, getState) => {
        const state = getState(),
            methods = selectors.methodsSelector(state);

        zip.downloadZip(methods);
    };
};
