import { BackendErrorConstants } from "../../constants/ErrorConstants.js";
import { isStringNullOrWhiteSpace } from "../../utils/common.js";
import { Result } from "../result.js";

const { KEY_IS_NULL, KEY_WAS_NOT_FOUND } = BackendErrorConstants;

const isKeyNull = (key) => {
	return isStringNullOrWhiteSpace(key);
};

// NOTE: Will not add getValueOrDefault functions here because
// getting the actual values is much important and getting null
// should be handled properly by the caller by having errors thrown to
// console or UI. Thereby forcing intent of software to caller.
export const localStorageService = {
	getNumberOrString: (key) => {
		if (isKeyNull(key)) {
			return Result.fail(KEY_IS_NULL, 500);
		}
		const value = window.localStorage.getItem(key);
		return Result.success(value, 200);
	},

	setNumberOrString: (key, value) => {
		if (isKeyNull(key)) {
			return Result.fail(KEY_IS_NULL, 500);
		}
		window.localStorage.setItem(key, value);
		return Result.success(value, 201);
	},

	getJSON: (key) => {
		if (isKeyNull(key)) {
			return Result.fail(KEY_IS_NULL, 500);
		}
		const valueStr = window.localStorage.getItem(key);
		const value = JSON.parse(valueStr);
		return Result.success(value, 200);
	},

	setJSON: (key, value) => {
		if (isKeyNull(key)) {
			return Result.fail(KEY_IS_NULL, 500);
		}
		const valueStr = JSON.stringify(value);
		window.localStorage.setItem(key, valueStr);
		return Result.success(value, 201);
	},

	getCustom: (key, converter) => {
		if (isKeyNull(key)) {
			return Result.fail(KEY_IS_NULL, 500);
		}
		const valueStr = window.localStorage.getItem(key);
		const value = converter(valueStr);
		return Result.success(value, 200);
	},

	getStorageLength: () => {
		let n = window.localStorage.length;
		n = n ?? 0;
		return Result.success(n, 200);
	},

	getIthKey: (i) => {
		const key = window.localStorage.key(i);
		if (isKeyNull(key)) {
			return Result.fail(`${KEY_WAS_NOT_FOUND} at ${i}`, 500);
		}
		return Result.success(key, 200);
	},

	getAllKeys: () => {
		const keys = [];
		for (let i = 0; i < window.localStorage.length; i++) {
			keys.push(window.localStorage.key(i));
		}
		return Result.success(keys, 200);
	},

	deleteKeys: (keys) => {
		for (let i = 0; i < keys.length; i++) {
			window.localStorage.removeItem(keys[i]);
		}
		return Result.success(keys, 201);
	},
};
