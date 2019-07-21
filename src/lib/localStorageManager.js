export const get = name => {
    return localStorage.getItem(name);
};
export const json = string => {
    return JSON.parse(string);
};
export const getString = data => {
    return JSON.stringify(data);
};

export const set = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
};

export const setUnique = (name, data) => {
    console.log(JSON.stringify(data));
    console.log(get(name));

    if (getString(data) === get(name)) return;
    let oldData = json(get(name));
    if (oldData === null || oldData === '') {
        oldData = [];
    }
    const d = getString(data);
    console.log(d);
    oldData.push(d);
    localStorage.setItem(name, JSON.stringify(oldData));
};
