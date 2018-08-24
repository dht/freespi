const OFFLINE_KEY = "OFFLINE_KEY";
const OFFLINE_DATA_KEY = "OFFLINE_DATA_KEY";

export const setKey = (key, value) =>
    localStorage.setItem(key, parseValue(value));

export const getKey = key => localStorage.getItem(key);

export const getBoolean = key => getKey(key) === "1";

export const getJSON = key => {
    try {
        return JSON.parse(getKey(key));
    } catch (e) {
        return {};
    }
};

const parseValue = value => {
    const type = typeof value;

    switch (type) {
        case "boolean":
            return value ? "1" : "0";
        case "object":
            return JSON.stringify(value);
        default:
            return value;
    }
};

export const getIsOffline = () => getBoolean(OFFLINE_KEY);
export const setIsOffline = value => setKey(OFFLINE_KEY, value);

export const setOfflineData = value => setKey(OFFLINE_DATA_KEY, value);

export const getOfflineData = () => {
    let json = getJSON(OFFLINE_DATA_KEY) || {},
        methods = json.methods || {},
        keys = Object.keys(methods);

    json.methods = keys.reduce((output, key) => {
        const method = methods[key],
            { IOs } = method;

        output[key] = methods[key];
        output[key].IOs = arrayToObject(IOs);

        return output;
    }, {});

    return json;
};

const arrayToObject = array => {
    if (!Array.isArray(array)) return array;

    return array.filter(i => i).reduce((output, item, index) => {
        output[index + 1] = item;
        return output;
    }, {});
};
