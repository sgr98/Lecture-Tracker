import { handler } from "./handler.js";

// NOTE: Will not add getValueOrDefault functions here because
// getting the actual values is much important and getting null
// should be handled properly by the caller by having errors thrown to
// console or UI. Thereby forcing intent of software to caller.
export const localStorageDB = {
	getNumberOrString: (key) => {
		try {
			const value = window.localStorage.getItem(key);
			return value;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	},

	setNumberOrString: (key, value) => {
		try {
			window.localStorage.setItem(key, value);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	},

	getJSON: (key) => {
		try {
			const valueStr = window.localStorage.getItem(key);
			const value = JSON.parse(valueStr);
			return value;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	},

	setJSON: (key, value) => {
		try {
			const valueStr = JSON.stringify(value);
			window.localStorage.setItem(key, valueStr);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	},

	getCustom: (key, converter) => {
		try {
			const valueStr = window.localStorage.getItem(key);
			const value = converter(valueStr);
			return value;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	},

	getStorageLength: () => {
		try {
			const n = window.localStorage.length;
			return n;
		} catch (error) {
			handler.errorWithPopup(error);
			return 0;
		}
	},

	getIthKey: (i) => {
		try {
			const key = window.localStorage.key(i);
			return key;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	},

	getAllKeys: () => {
		try {
			const keys = [];
			for (let i = 0; i < window.localStorage.length; i++) {
				keys.push(window.localStorage.key(i));
			}
			return keys;
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	},

	deleteKeys: (keys) => {
		try {
			for (let i = 0; i < keys.length; i++) {
				window.localStorage.removeItem(keys[i]);
			}
			return keys;
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	},
};
