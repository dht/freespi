const domain = "http://localhost:4050";

const headers = {
    "Content-Type": "application/json",
    accept: "application/json"
};

const _fetch = (path, method = "GET", body) => {
    let options = {
        method,
        headers
    };

    if (method === "POST" && body) {
        options.body = JSON.stringify(body);
    }

    return fetch(domain + path, options).then(res => res.json());
};

export const getWorkspace = () => {
    return _fetch("/workspace");
};

export const deleteMethod = id => {
    return _fetch(`/method/${id}`, "DELETE");
};

export const reset = id => {
    return _fetch(`/workspace`, "DELETE");
};

export const writeMethod = (id, code, IOs, stats) => {
    return _fetch(`/method/${id}`, "POST", { code, IOs, stats });
};
