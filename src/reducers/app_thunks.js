import * as api from "../utils/firebase";
import {
    resetWorkspace, setCurrent, setIOs, setIsLoading, setWorkspace,
    updateMethodCode, resetMethod,
} from "./appState/appState_actions";
import {
    codeSelector, currentSelector, fourSelector, idSelector, IOsSelector,
    methodsSelector
} from "../selectors/selectors";
import {methodsToGlobal, runCode} from "../utils/code";

export const loadApp = (id, current, currentIO) => {

    return (dispatch) => {
        api.initWorkspace(id);

        dispatch(setIsLoading(true));

        api.getWorkspace().then(data => {

            // console.log('data', data);

            dispatch(setIsLoading(false));

            if (!data) {
                dispatch(resetWorkspace(id));
                api.newWorkspace(id);
            } else {
                // console.log('data', data);
                data["current"] = current;
                data["currentIO"] = currentIO;
                dispatch(setWorkspace(data))
            }
        })
    }
}

export const autosave = () => {

    return (dispatch, getState) => {

        const state = getState(),
            data = fourSelector(state),
            {current, currentIO, code, input, output, expected} = data || {};

        if (current && currentIO) {
            api.updateMethod(current, currentIO, {code, input, output, expected});
        }
    }
}


export const makeMethod = (name, data = {}) => {

    return (dispatch, getState) => {
        const state = getState();
        const current = currentSelector(state);
        const IOs = IOsSelector(state);

        // reset current
        if (current === "_") {
            dispatch(resetMethod(current));
            api.reset_();
        }

        dispatch(setCurrent("_"));
        dispatch(updateMethodCode(name, data.code, data.isPromise));

        dispatch(setIOs(name, IOs));
        api.saveIOs(name, IOs);

        api.updateMethod(name, 1, data);
    }
}

export const runAll = () => {

    return (dispatch, getState) => {
        const state = getState(),
            current = currentSelector(state),
            IOs = IOsSelector(state),
            methods = methodsSelector(state),
            code = codeSelector(state);

        const globals = methodsToGlobal(methods)

        // console.log('IOs', current, IOs);

        if (!current || !IOs) return;

        Object.keys(IOs).forEach(async key => {
            const IO = IOs[key],
                {input} = IO || {};

            if (input) {
                const result = await runCode(input, code, globals);

                if (result.ok) {
                    IO.output = result.output;
                }
            }
        })

        dispatch(setIOs(current, IOs));
        api.saveIOs(current, IOs);
    }
}

