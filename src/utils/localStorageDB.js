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
			console.error(error);
			return null;
		}
	},

	setNumberOrString: (key, value) => {
		try {
			window.localStorage.setItem(key, value);
		} catch (error) {
			console.error(error);
		}
	},

	getJSON: (key) => {
		try {
			const valueStr = window.localStorage.getItem(key);
			const value = JSON.parse(valueStr);
			return value;
		} catch (error) {
			console.error(error);
			return null;
		}
	},

	setJSON: (key, value) => {
		try {
			const valueStr = JSON.stringify(value);
			window.localStorage.setItem(key, valueStr);
		} catch (error) {
			console.error(error);
		}
	},

	getStorageLength: () => {
		try {
			const n = window.localStorage.length;
			return n;
		} catch (error) {
			console.error(error);
			return 0;
		}
	},

	getIthKey: (i) => {
		try {
			const key = window.localStorage.key(i);
			return key;
		} catch (error) {
			console.error(error);
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
			console.error(error);
			return [];
		}
	},
};
