export const isValueNull = (value) => {
    return value === null || value === undefined;
};

export const isStringNullOrEmpty = (str) => {
    return str === null || str === undefined || str.trim() === "";
};

export const isArrayNullOrEmpty = (arr) => {
    return arr === null || arr === undefined || arr.length === 0;
};

export const isObjectNullOrEmpty = (obj) => {
    return obj === null || obj === undefined || Object.keys(obj).length === 0;
};

const DEFAULT_STRING = "";
const DEFAULT_NUMBER = 0;
const DEFAULT_BOOLEAN = false;
const DEFAULT_ARRAY = [];
const DEFAULT_OBJECT = {};

export const getStringValueOrDefault = (str) => {
    return isStringNullOrEmpty(str) ? DEFAULT_STRING : str;
};

export const getNumberValueOrDefault = (num) => {
    return isValueNull(num) ? DEFAULT_NUMBER : num;
};

export const getBooleanValueOrDefault = (bool) => {
    return isValueNull(bool) ? DEFAULT_BOOLEAN : bool;
};

export const getArrayValueOrDefault = (arr) => {
    const val = isArrayNullOrEmpty(arr) ? DEFAULT_ARRAY : arr;
    return [...val];
};

export const getObjectValueOrDefault = (obj) => {
    const val = isObjectNullOrEmpty(obj) ? DEFAULT_OBJECT : obj;
    return { ...val };
};
