import * as storage from "../../utils/storage";

export const initialState = {
    id: null,
    isLoading: false,
    isRunning: false,
    isOffline: storage.getIsOffline(),
    current: "_",
    currentIO: 1,
    methods: {
        _: {
            id: "_",
            code: "return input;",
            isDirty: true,
            IOs: {
                "1": {
                    input: "const input = 5;",
                    output: "5",
                    expected: "5",
                    isDirty: true
                }
            }
        }
    }
};

export const ActionTypes = {
    SET_WORKSPACE: "SET_WORKSPACE",
    SET_IS_LOADING: "SET_IS_LOADING",
    SET_IS_RUNNING: "SET_IS_RUNNING",
    SET_IS_OFFLINE: "SET_IS_OFFLINE",
    RESET_WORKSPACE: "RESET_WORKSPACE",
    SET_CURRENT: "SET_CURRENT",
    SET_CURRENT_IO: "SET_CURRENT_IO",
    UPDATE_CODE: "UPDATE_CODE",
    UPDATE_METHOD: "UPDATE_METHOD",
    REMOVE_METHOD: "REMOVE_METHOD",
    RESET_METHOD: "RESET_METHOD",
    UPDATE_IO: "UPDATE_IO",
    SET_IOS: "SET_IOS",
    REMOVE_IO: "REMOVE_IO"
};

export const IO = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_IO:
            return {
                ...state,
                ...action.value
            };

        default:
            return state;
    }
};

export const IOs = (state = {}, action) => {
    let newState;

    switch (action.type) {
        case ActionTypes.SET_IOS:
            return action.value;

        case ActionTypes.UPDATE_IO:
            return {
                ...state,
                [action.index]: IO(state[action.index], action)
            };

        case ActionTypes.RESET_METHOD:
            return {
                "1": {
                    input: "const input = 5;",
                    output: "5",
                    expected: "5"
                }
            };

        case ActionTypes.REMOVE_IO:
            newState = { ...state };
            delete newState[action.index];
            return newState;

        default:
            return state;
    }
};

const method = (state, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_METHOD:
            return {
                ...state,
                ...action.value
            };
        case ActionTypes.UPDATE_CODE:
            return {
                ...state,
                id: action.id,
                code: action.value,
                isPromise: action.isPromise
            };

        case ActionTypes.RESET_METHOD:
            return {
                ...state,
                code: "return input;",
                IOs: IOs(state.IOs, action)
            };

        case ActionTypes.SET_IOS:
        case ActionTypes.UPDATE_IO:
        case ActionTypes.REMOVE_IO:
            return {
                ...state,
                IOs: IOs(state.IOs, action)
            };

        default:
            return state;
    }
};

const methods = (state, action) => {
    let newState;

    switch (action.type) {
        case ActionTypes.UPDATE_CODE:
        case ActionTypes.RESET_METHOD:
        case ActionTypes.SET_IOS:
        case ActionTypes.UPDATE_IO:
        case ActionTypes.UPDATE_METHOD:
        case ActionTypes.REMOVE_IO:
            return {
                ...state,
                [action.id]: method(state[action.id], action)
            };

        case ActionTypes.REMOVE_METHOD:
            newState = { ...state };
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
};

const appState = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_WORKSPACE:
            return { ...state, ...action.value };

        case ActionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.value
            };

        case ActionTypes.SET_IS_RUNNING:
            return {
                ...state,
                isRunning: action.value
            };

        case ActionTypes.SET_IS_OFFLINE:
            return {
                ...state,
                isOffline: action.value
            };

        case ActionTypes.SET_CURRENT:
            return {
                ...state,
                current: action.value
            };

        case ActionTypes.SET_CURRENT_IO:
            return {
                ...state,
                currentIO: action.value
            };

        case ActionTypes.UPDATE_CODE:
        case ActionTypes.REMOVE_METHOD:
        case ActionTypes.RESET_METHOD:
        case ActionTypes.UPDATE_IO:
        case ActionTypes.SET_IOS:
        case ActionTypes.UPDATE_METHOD:
        case ActionTypes.REMOVE_IO:
            return {
                ...state,
                methods: methods(state.methods, action)
            };

        case ActionTypes.RESET_WORKSPACE:
            return {
                ...initialState,
                id: state.id
            };

        default:
            return state;
    }
};

export default appState;
