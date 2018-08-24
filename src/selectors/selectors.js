import { createSelector } from 'reselect'
import {methodsToGlobal} from "../utils/code";

export const idSelector = state => state.appState.id
export const isLoadingSelector = state => state.appState.isLoading
export const isRunningSelector = state => state.appState.isRunning
export const currentSelector = state => state.appState.current
export const currentIOSelector = state => state.appState.currentIO
export const methodsSelector = state => state.appState.methods || {};
export const isOfflineSelector = state => state.appState.isOffline;

export const sortedMethodsSelector = createSelector(
    methodsSelector,
    (methods) =>   Object.keys(methods).sort().map(key => methods[key])
)

export const methodSelector = createSelector(
    methodsSelector,
    currentSelector,
    (methods, current) => methods[current] || {}
)

export const IOsSelector = createSelector(
    methodSelector,
    (method = {}) => method.IOs
)

export const IOSelector = createSelector(
    IOsSelector,
    currentIOSelector,
    (IOs = {}, currentIO) => IOs[currentIO]
)

export const codeSelector = createSelector(
    methodSelector,
    (method) => method.code
)

export const fourSelector = createSelector(
    currentSelector,
    currentIOSelector,
    codeSelector,
    IOSelector,
    methodsSelector,
    isLoadingSelector,
    (current, currentIO, code, IO, methods, isLoading) => {
        let {input, output, expected} = IO || {};

        const globals = methodsToGlobal(methods)

        return {
            current,
            currentIO,
            code,
            input,
            output,
            expected,
            isLoading,
            globals,
        }
    }
)

