import {ActionTypes} from "./appState";

/*
{
    SET_WORKSPACE: 'SET_WORKSPACE',
    RESET_WORKSPACE: 'RESET_WORKSPACE',
    SET_CURRENT: 'SET_CURRENT',
    UPDATE_METHOD: 'UPDATE_METHOD',
    REMOVE_METHOD: 'REMOVE_METHOD',
    RESET_METHOD: 'RESET_METHOD',
};

 */

export const setWorkspace = (value) => {
    return {
        type: ActionTypes.SET_WORKSPACE,
        value
    }
}

export const resetWorkspace = () => {

    return {
        type: ActionTypes.RESET_WORKSPACE,
    }
}

export const setCurrent = (value) => {

    return {
        type: ActionTypes.SET_CURRENT,
        value,
    }
}
export const setCurrentIO = (value) => {

    return {
        type: ActionTypes.SET_CURRENT_IO,
        value,
    }
}

export const updateMethodCode = (id, value, isPromise) => {

    return {
        type: ActionTypes.UPDATE_CODE,
        id,
        value,
        isPromise,
    }
}

export const removeMethod = (id) => {

    return {
        type: ActionTypes.REMOVE_METHOD,
        id,
    }
}


export const resetMethod = (id) => {

    return {
        type: ActionTypes.RESET_METHOD,
        id,
    }
}

export const updateIO = (id, IO_id, value) => {

    return {
        type: ActionTypes.UPDATE_IO,
        id,
        index: IO_id,
        value,
    }
}

export const setIOs = (id, value) => {

    return {
        type: ActionTypes.SET_IOS,
        id,
        value,
    }
}

export const setIsLoading = (value) => {

    return {
        type: ActionTypes.SET_IS_LOADING,
        value,
    }
}

export const setIsRunning = (value) => {

    return {
        type: ActionTypes.SET_IS_RUNNING,
        value,
    }
}

export const updateCode = ({input, output, code, expected, isPromise}) => {

    return (dispatch, getState) => {

        const {appState} = getState(),
            {current, currentIO} = appState;

        if (code) {
            dispatch(updateMethodCode(current, code, isPromise));
        }

        let data = {};

        if (input) data.input = input;
        if (output) data.output = output;
        if (expected) data.expected = expected;

        if (current && currentIO) {
            dispatch(updateIO(current, currentIO, data));
        }

        return Promise.resolve(true);
    }
}

