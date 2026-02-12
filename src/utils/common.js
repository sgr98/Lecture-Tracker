import { HTMLInputTypeEnum } from "./enum.js";

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

export const isInputValueNullOrEmpty = (value, inputType) => {
	if (isValueNull(value)) return true;
	switch (inputType) {
		case HTMLInputTypeEnum.Text:
		case HTMLInputTypeEnum.Password:
		case HTMLInputTypeEnum.Email:
		case HTMLInputTypeEnum.Month:
		case HTMLInputTypeEnum.Week:
		case HTMLInputTypeEnum.Url:
		case HTMLInputTypeEnum.Search:
		case HTMLInputTypeEnum.Tel:
		case HTMLInputTypeEnum.Color:
			return value === "";
		default:
			return false;
	}
};

export const getDefaultInputValue = (inputType) => {
	switch (inputType) {
		case HTMLInputTypeEnum.Text:
		case HTMLInputTypeEnum.Password:
		case HTMLInputTypeEnum.Email:
		case HTMLInputTypeEnum.Month:
		case HTMLInputTypeEnum.Week:
		case HTMLInputTypeEnum.Url:
		case HTMLInputTypeEnum.Search:
		case HTMLInputTypeEnum.Tel:
		case HTMLInputTypeEnum.Color:
			return "";
		case HTMLInputTypeEnum.Number:
			return -1;
		case HTMLInputTypeEnum.Date:
		case HTMLInputTypeEnum.Datetime_Local:
		case HTMLInputTypeEnum.Time:
			return new Date();
		default:
			return "";
	}
};
