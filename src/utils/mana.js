const _ = require('lodash');

const isUrl = (string) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
        matches = string.match(urlRegex);

    return matches && matches.length > 0;
}
const isNumber = (string) => {
    if (isNaN(string) || string === "") return false;

    return _.isNumber(+string);
}
// 2018-04-19 10:00:00
const isDate = (string = '') => {
    const parts = string.split(/[\-\s:]/gi);

    if (!parts || parts.length !== 6)
        return false;

    const ok = parts.reduce((part, output) => {
        return output && isNumber(part + 0);
    }, true);

    if (!ok) return false;


    const date = new Date(
        parseInt(parts[0], 10),
        parseInt(parts[1], 10),
        parseInt(parts[2], 10),
        parseInt(parts[3], 10),
        parseInt(parts[4], 10),
        parseInt(parts[5], 10),
        0);

    return _.isDate(date)
}

const identifyType = (variable) => {

    let is = _.isArray(variable);
    if (is) return 'array';

    is = _.isBoolean(variable);
    if (is) return 'boolean';

    is = _.isObject(variable);
    if (is) return 'object';

    is = isNumber(variable);
    if (is) return String(variable).indexOf('.') < 0 ? 'int' : 'float';

    is = _.isString(variable)
    if (is) {
        if (isUrl(variable)) return 'url';
        if (isDate(variable)) return 'date';
        return 'string';
    }

    return 'unknown';
}

const trimObject = (object1 = {}, object2 = {}) => {
    return Object.keys(object2).reduce((output, key) => {
        output[key] = object1[key];
        return output;
    }, {});
}

const identifyObject = (json) => {
    let type = identifyType(json);

    if (type !== 'object') throw "expects an object but received a " + type;

    return Object.keys(json).reduce((output, key) => {
        type = identifyType(json[key]);
        output[key] = type;
        return output;
    }, {})
};

const findFirstChild = (jsonOrArray) => {
    if (_.isArray(jsonOrArray))
        return {type: 'array', item: jsonOrArray[0]};

    const keys = Object.keys(jsonOrArray),
        firstKey = keys[0];

    if (isNumber(firstKey)) {
        return {type: 'id', item: jsonOrArray[firstKey]};
    } else {
        return {type: 'object', item: jsonOrArray};
    }
}

const mergeChildren = (json) => {
    const keys = Object.keys(json),
        firstKey = keys[0];

    if (!isNumber(firstKey))
        return identifyObject(json);

    return keys.reduce((memo, key) => {
        const types = identifyObject(json[key]);
        memo = {...memo[key], ...types};
        return memo;
    }, {})
}

const findSimilarity = (json1, json2) => {
    return 100 * identicalFieldsCount(json1, json2) / maxFieldsCount(json1, json2) * k(json1, json2);
}

const identifyEntity = (entities, item) => {
    let max = 0, keys = ['', ...Object.keys(entities)];

    return keys.reduce((output, key, index) => {
        // console.log('key', index, key);

        const match = findSimilarity(entities[key], item);

        if (match > max) {
            max = match;
            return key;
        }

        return output;
    });
}

const _toSingular = (keyName) => {
    const len = (keyName || '').length;

    if (len >= 3 && keyName.substr(len - 3) === 'ies') {
        return keyName.substr(0, len - 3) + 'yItem';
    }

    if (len > 3 && keyName.substr(len - 1) === 's') {
        return keyName.substr(0, len - 1) + 'Item';
    }

    return keyName + 'Item';
}

const findAllEntities = (json, memo = {}, path = '') => {
    let types = identifyObject(json) || {},
        keys = Object.keys(types);

    return keys.reduce((output, key) => {

        if (types[key] === 'object' || types[key] === 'array') {
            const child = findFirstChild(json[key]);

            let newPath = path + '.' + key;

            return {
                ...output,
                [_toSingular(key)]: {...mergeChildren(json[key]), __path: newPath, __type: child.type},
                ...findAllEntities(child.item, output, newPath)
            };
        }

        return output;
    }, memo);
}

const identicalFieldsCount = (json1, json2) => {
    return _.intersection(
        Object.keys(json1),
        Object.keys(json2)
    ).length;
}

const maxFieldsCount = (json1, json2) => {
    return Math.max(
        Object.keys(json1).length,
        Object.keys(json2).length
    );
}

const k = (json1, json2) => {
    const len1 = Object.keys(json1).length,
        len2 = Object.keys(json2).length,
        diff = Math.abs(len1 - len2),
        min = Math.min(len1, len2);

    let output = 1;

    if (diff / min > 1) {
        output = 0.5;
    }

    return output;
}

const mergeSimilarEntities = (json) => {
    const entitiesKeys = Object.keys(json);

    entitiesKeys.forEach(key1 => {
        json[key1].__mergeWith = entitiesKeys.reduce((output2, key2) => {
            if (key1 !== key2) {
                const match = 100 * identicalFieldsCount(json[key1], json[key2]) / maxFieldsCount(json[key1], json[key2]) * k(json[key1], json[key2]);

                if (match > 33) {
                    output2.push(key2);
                }
            }
            return output2;
        }, []);
    });


    return entitiesKeys.reduce((output, key) => {
        const mergeWith = json[key].__mergeWith[0];

        if (mergeWith) {
            output[mergeWith] = {...json[mergeWith], ...json[key]};
            output[key] = {__forward: mergeWith};
            output[key] = json[key]
        }

        return output;
    }, {});
}


const findRoot = (json) => {
    let entities = findAllEntities(json),
        root = identifyObject(json);

    return Object.keys(json).reduce((output, key) => {

        if (root[key] === 'object') {
            const child = findFirstChild(json[key]);
            output[key] = identifyEntity(entities, child.item);
        }


        return output;
    }, {})
}

const fixEntity = (entity) => {
    // console.log('entity', entity);

    return  Object.keys(entity).reduce((output, key) => {
        if (root[key] === 'object') {

        }
    }, {});
}

const findFixedEntities = (json) => {
    let entities = findAllEntities(json);

    return Object.keys(entities).reduce((output, key) => {
        output[key] = fixEntity(entities[key], json);
        return output;
    }, {})
}

const parseJson = (json, memo = {}, path = '') => {
    let types = identifyObject(json) || {},
        keys = Object.keys(types);

    return keys.reduce((output, key) => {

        if (types[key] === 'object' || types[key] === 'array') {
            const child = findFirstChild(json[key]);

            let newPath = path + '.' + key;

            return {
                ...output,
                [_toSingular(key)]: {...mergeChildren(json[key]), __path: newPath, __type: child.type},
                ...findAllEntities(child.item, output, newPath)
            };
        }

        return output;
    }, memo);
}


module.exports = {
    identifyObject,
    trimObject,
    findAllEntities,
    mergeSimilarEntities,
    findRoot,
    findFixedEntities,
}