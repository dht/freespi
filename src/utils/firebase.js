const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const config = {
    apiKey: "AIzaSyD99j8D124StULlW9rS-8xxzNT5D_L1KhQ",
    authDomain: "magic-2a68e.firebaseapp.com",
    databaseURL: "https://magic-2a68e.firebaseio.com",
    projectId: "magic-2a68e",
    storageBucket: "magic-2a68e.appspot.com",
    messagingSenderId: "615171577355"
};

const mainApp = firebase.initializeApp(config),
    workspacesRef = mainApp.database().ref("workspaces");

let workspaceRef, methodsRef, canvasRef;

export const initWorkspace = (id = "none") => {
    workspaceRef = workspacesRef.child(id);
    methodsRef = workspaceRef.child("methods");
};

const getRef = ref => {
    return new Promise(resolve => {
        ref.once("value", function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

const removeEmpty = obj =>
    Object.keys(obj)
        .filter(k => obj[k] !== null && obj[k] !== undefined) // Remove undef. and null.
        .reduce(
            (newObj, k) =>
                typeof obj[k] === "object"
                    ? Object.assign(newObj, { [k]: removeEmpty(obj[k]) })
                    : Object.assign(newObj, { [k]: obj[k] }),
            {}
        );

export const updateMethods = methods => {
    const data = removeEmpty(methods);
    console.log("data ->", data);
};

export const getWorkspace = () => {
    return getRef(workspaceRef);
};

export const saveNewMethod = (id, data) => {
    const ref = methodsRef.child(id);
    return ref.set(data);
};

export const getMethod = id => {
    const ref = methodsRef.child(id);
    return getRef(ref);
};

export const removeMethod = id => {
    const ref = methodsRef.child(id);
    return ref.remove();
};

export const updateMethod = (
    id,
    IOid,
    { code, input, output, expected, isPromise }
) => {
    const ref = methodsRef.child(id),
        refIO = ref.child("IOs").child(IOid);

    let data = {},
        dataIO = {};

    if (id) data.id = id;

    if (code) {
        data.code = code;
    }

    if (isPromise) {
        data.isPromise = isPromise;
    }

    ref.update(data);

    if (input) dataIO.input = input;
    if (output) dataIO.output = output;
    if (expected) dataIO.expected = expected;

    return refIO.update(dataIO);
};

export const saveIOs = (toId, IOs) => {
    const ref = methodsRef.child(toId),
        refIOs = ref.child("IOs");

    return refIOs.set(IOs);
};

export const removeIO = (methodId, ioId) => {
    const ref = methodsRef.child(methodId),
        refIOs = ref.child("IOs");

    return refIOs.child(ioId).remove();
};

export const saveIO = (methodId, ioId, value) => {
    const ref = methodsRef.child(methodId),
        refIO = ref.child("IOs").child(ioId);

    return refIO.update(value);
};

export const reset_ = () => {
    const ref = methodsRef.child("_"),
        refIOs = ref.child("IOs");

    updateMethod("_", 1, {
        code: "return input;"
    });

    return refIOs.set({
        "1": {
            input: "const input = 5;",
            output: "5",
            expected: "5"
        }
    });
};

export const newWorkspace = (id, data = {}) => {
    const ref = workspacesRef.child(id);
    data["id"] = id;
    data["current"] = "_";
    return ref.set(data);
};
