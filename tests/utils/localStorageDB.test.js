// @vitest-environment jsdom
// NOTE: Window Storage is not working in tests
// JSDOM is unable to simulate window.localStoage.<method_name>
// or localStoage.<method_name> or Storage.prototype.<method_name>
// All of the above seems to be undefined

import {
	vi,
	describe,
	it,
	expect,
	beforeEach,
	afterAll,
	beforeAll,
} from "vitest";
import { localStorageDB } from "../../src/utils/localStorageDB.js";
import { handler } from "../../src/utils/handler.js";

// vi.mock("../../src/utils/handler.js", () => ({
// 	handler: {
// 		errorWithPopup: vi.fn(),
// 	},
// }));

// describe("UTILS - LOCALSTORAGEDB - getNumberOrString Function", () => {
// 	beforeEach(() => {
// 		vi.clearAllMocks();
// 		// window.localStorage.clear();
// 	});

// 	it("test", () => {
// 		expect(typeof window.localStorage.getItem).not.toBe("undefined");
// 	});

// 	it("use jsdom in this test file", () => {
// 		const element = document.createElement("div");
// 		expect(element).not.toBeNull();
// 		expect(element).not.toBeUndefined();
// 	});

// 	it("gets a string from local storage", () => {
// 		const TestKey = "Test Key";
// 		const TestValue = "Test Value";
// 		// window.localStorage.setItem(TestKey, TestValue);
// 		const getItemSpy = vi
// 			.spyOn(Storage.prototype, "getItem")
// 			.mockReturnValue(TestValue);

// 		const result = localStorageDB.getNumberOrString(TestKey);

// 		expect(localStorage.getItem).toHaveBeenCalledWith(TestKey);
// 		expect(result).toEqual(TestValue);
// 		getItemSpy.mockRestore();
// 	});
// });
