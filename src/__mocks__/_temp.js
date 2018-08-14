const findFirstChild = (jsonOrArray) => {
    if (_.isArray(jsonOrArray))
        return {type: 'array', item: jsonOrArray[0]};

    const keys = Object.keys(jsonOrArray),
        firstKey = keys[0];

    if (isNumber(firstKey)) {
        return {type: 'id', item: jsonOrArray[firstKey]};
    } else {
        return {type: 'object', item: jsonOrArray};
    };
    const identifyObject = (json) => {
        let type = identifyType(json);

        if (type !== 'object') throw "expects an object but received a " + type;

        return Object.keys(json).reduce((output, key) => {
            type = identifyType(json[key]);
            output[key] = type;
            return output;
        }, {})
    };
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
    };
    const isDate = (string) => {
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
    };
    const isNumber = (string) => {
        if (isNaN(string) || string === "") return false;

        return _.isNumber(+string);
    };
    const isUrl = (url) => {
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
            matches = url.match(urlRegex);

        return matches && matches.length > 0;

    };
    const parseTree = (memo, json) => {
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


    };
    const toSingular = (keyName) => {
        const len = (keyName || '').length;

        if (len >= 3 && keyName.substr(len - 3) === 'ies') {
            return keyName.substr(0, len - 3) + 'yItem';
        }

        if (len > 3 && keyName.substr(len - 1) === 's') {
            return keyName.substr(0, len - 1) + 'Item';
        }

        return keyName + 'Item';
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
        };
        const identifyObject = (json) => {
            let type = identifyType(json);

            if (type !== 'object') throw "expects an object but received a " + type;

            return Object.keys(json).reduce((output, key) => {
                type = identifyType(json[key]);
                output[key] = type;
                return output;
            }, {})
        };
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
        };
        const isDate = (string) => {
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
        };
        const isNumber = (string) => {
            if (isNaN(string) || string === "") return false;

            return _.isNumber(+string);
        };
        const isUrl = (url) => {
            const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                matches = url.match(urlRegex);

            return matches && matches.length > 0;

        };
        const parseTree = (memo, json) => {
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


        };
        const toSingular = (keyName) => {
            const len = (keyName || '').length;

            if (len >= 3 && keyName.substr(len - 3) === 'ies') {
                return keyName.substr(0, len - 3) + 'yItem';
            }

            if (len > 3 && keyName.substr(len - 1) === 's') {
                return keyName.substr(0, len - 1) + 'Item';
            }

            return keyName + 'Item';
        };

        const input = {
            name: "clean room"
        };
        return input;