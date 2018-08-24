import * as api from "../utils/firebase";
import * as actions from "./appState/appState_actions";
import * as selectors from "../selectors/selectors";
import * as coder from "../utils/code";
import * as storage from "../utils/storage";

export const loadApp = (id, current, currentIO) => {
    const isOffline = storage.getIsOffline();
    const data = storage.getOfflineData();

    return dispatch => {
        api.initWorkspace(id);

        if (isOffline && data) {
            data["current"] = current;
            data["currentIO"] = currentIO;
            dispatch(actions.setWorkspace(data));
            dispatch(actions.setIsOffline(isOffline));
            return;
        }

        dispatch(actions.setIsLoading(true));

        api.getWorkspace().then(data => {
            // console.log('data', data);

            dispatch(actions.setIsLoading(false));

            if (!data) {
                dispatch(actions.resetWorkspace(id));
                api.newWorkspace(id);
            } else {
                // console.log('data', data);
                data["current"] = current;
                data["currentIO"] = currentIO;
                dispatch(actions.setWorkspace(data));
            }
        });
    };
};

export const autosave = () => {
    const isOffline = storage.getIsOffline();

    return (dispatch, getState) => {
        if (isOffline) return;

        const state = getState(),
            data = selectors.fourSelector(state),
            { current, currentIO, code, input, output, expected } = data || {};

        if (current && currentIO) {
            api.updateMethod(current, currentIO, {
                code,
                input,
                output,
                expected
            });
        }

        // dispatch(actions.setIsDirty(false));
        dispatch(setIsDirtyIO(false));
    };
};

export const save = () => {
    const isOffline = storage.getIsOffline();

    return (dispatch, getState) => {
        if (isOffline) return;

        const state = getState(),
            data = selectors.methodsSelector(state);

        api.updateMethods(data);

        // dispatch(actions.setIsDirty(false));
        dispatch(setIsDirtyIO(false));
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
            api.reset_();
        }

        dispatch(actions.setCurrent("_"));
        dispatch(actions.updateMethodCode(name, data.code, data.isPromise));

        dispatch(actions.setIOs(name, IOs));
        api.saveIOs(name, IOs);

        api.updateMethod(name, 1, data);
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
        dispatch(setIsDirtyAllIOs(false));
        api.saveIOs(current, IOs);
    };
};

export const download = () => {
    return (dispatch, getState) => {
        const state = getState(),
            data = selectors.fourSelector(state),
            { globals } = data;

        coder.downloadCode("code.txt", globals);
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
        api.removeIO(current, currentIO);
    };
};
