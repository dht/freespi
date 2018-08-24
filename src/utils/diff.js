const diffDeep = require('deep-diff').diff;

const selector = (state) => {
    const {appState} = state || {},
    {methods} = appState || {};

    return methods;
}

const diffKeys = (a, b) => {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

}

export const diff = (prevState = {}, currentState = {}) => {

    const a = selector(prevState);
    const b = selector(currentState);

    return diffDeep(a,b);
}