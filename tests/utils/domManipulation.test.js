// @vitest-environment jsdom

import { ConsoleText } from "../../src/constants/internalConstants.js";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { domManipulation } from "../../src/utils/domManipulation.js";
import { handler } from "../../src/utils/handler.js";

const SIMULATED_DOM_FAILURE = "Simulated DOM Failure";

vi.mock("../../src/utils/handler.js", () => ({
	handler: {
		errorWithPopup: vi.fn(),
		error: vi.fn(),
	},
}));

describe("UTILS - DOM MANIPULATION - SAMPLE", () => {
	let element;
	const elementId = "temporary-element";

	beforeEach(() => {
		vi.clearAllMocks();
		element = document.createElement("div");
		element.id = elementId;
		document.body.appendChild(element);
	});

	afterEach(() => {
		element.remove();
		element = null;
	});

	it("simple test", () => {
		expect(element).not.toBeNull();
		expect(element).not.toBeUndefined();
		const tempElement = document.getElementById(elementId);
		expect(tempElement).not.toBeNull();
		expect(tempElement).not.toBeUndefined();
	});
});

describe("UTILS - DOM MANIPULATION - addHTMLStringToDomById Function", () => {
	let element;
	const elementId = "temporary-element";
	const newElementId = "new-element";
	let newElementStr = `<div id="${newElementId}"></div>`;

	beforeEach(() => {
		vi.clearAllMocks();
		element = document.createElement("div");
		element.id = elementId;
		document.body.appendChild(element);
	});

	afterEach(() => {
		element.remove();
		element = null;
	});

	it("throws error when inputs are blank, blank", () => {
		const act = () => domManipulation.addHTMLStringToDomById();
		expect(act).toThrow(ConsoleText.HTML_STRING_IS_EMPTY);
		expect(handler.error).toHaveBeenCalledWith(
			new Error(ConsoleText.HTML_STRING_IS_EMPTY),
		);
	});

	it("throws error when inputs are null, null", () => {
		const act = () => domManipulation.addHTMLStringToDomById(null, null);
		expect(act).toThrow(ConsoleText.HTML_STRING_IS_EMPTY);
		expect(handler.error).toHaveBeenCalledWith(
			new Error(ConsoleText.HTML_STRING_IS_EMPTY),
		);
	});

	it("throws error when inputs are elementId, null", () => {
		const act = () =>
			domManipulation.addHTMLStringToDomById(elementId, null);
		expect(act).toThrow(ConsoleText.HTML_STRING_IS_EMPTY);
		expect(handler.error).toHaveBeenCalledWith(
			new Error(ConsoleText.HTML_STRING_IS_EMPTY),
		);
	});

	it("throws error when inputs are null, newElementStr", () => {
		const act = () =>
			domManipulation.addHTMLStringToDomById(null, newElementStr);
		expect(act).toThrow(ConsoleText.HTML_STRING_IS_EMPTY);
		expect(handler.error).toHaveBeenCalledWith(
			new Error(ConsoleText.HTML_STRING_IS_EMPTY),
		);
	});

	it("should add the element to the DOM", () => {
		domManipulation.addHTMLStringToDomById(elementId, newElementStr);
		const result = document.getElementById(newElementId);

		expect(result).not.toBe(null);
		expect(result).not.toBe(undefined);
		expect(result.isConnected).toBe(true);
	});

	// NOTE: By default, the browser dom does not raise an error if the HTML string is wrong
	// It is the responsibility of the caller to check if the HTML string being passed
	// is correct or not
	it("should add the element to the DOM even if the HTML string is incorrect", () => {
		const badElementStr = `<div id="${newElementId}">`;
		domManipulation.addHTMLStringToDomById(elementId, badElementStr);
		const result = document.getElementById(newElementId);

		expect(result).not.toBe(null);
		expect(result).not.toBe(undefined);
		expect(result.isConnected).toBe(true);
	});
});

describe("UTILS - DOM MANIPULATION - isElementInDOM Function", () => {
	let element;
	const elementId = "temporary-element";

	beforeEach(() => {
		vi.clearAllMocks();
		element = document.createElement("div");
		element.id = elementId;
		document.body.appendChild(element);
	});

	afterEach(() => {
		element.remove();
		element = null;
	});

	it("is element in DOM with string id when element is blank", () => {
		const result = domManipulation.isElementInDOM();
		expect(result).toBe(false);
	});

	it("is element in DOM with string id when element is null", () => {
		const result = domManipulation.isElementInDOM(null);
		expect(result).toBe(false);
	});

	it("is element in DOM with string id when element is undefined", () => {
		const result = domManipulation.isElementInDOM(undefined);
		expect(result).toBe(false);
	});

	it("is element in DOM with string id when element is present", () => {
		const newElement = document.createElement("div");
		const newElementId = "new-element";
		newElement.id = newElementId;
		element.appendChild(newElement);

		const result1 = domManipulation.isElementInDOM(elementId);
		const result2 = domManipulation.isElementInDOM(newElementId);
		expect(result1).toBe(true);
		expect(result2).toBe(true);
	});

	it("is element in DOM with string id when element is not present", () => {
		const newElement = document.createElement("div");
		const newElementId = "new-element";
		newElement.id = newElementId;
		element.appendChild(newElement);

		const result1 = domManipulation.isElementInDOM("some-element");
		const result2 = domManipulation.isElementInDOM("some-other-element");
		expect(result1).toBe(false);
		expect(result2).toBe(false);
	});

	it("is element in DOM with element id when element is present", () => {
		const newElement = document.createElement("div");
		const newElementId = "new-element";
		newElement.id = newElementId;
		element.appendChild(newElement);

		const result = domManipulation.isElementInDOM(newElement);
		expect(result).toBe(true);
	});

	it("is element in DOM with element id when element is present but not connected", () => {
		const newElement = document.createElement("div");
		const newElementId = "new-element";
		newElement.id = newElementId;

		const result = domManipulation.isElementInDOM(newElement);
		expect(result).toBe(false);
	});

	it("is element in DOM with element id when element is present but not connected", () => {
		const domSpy = vi
			.spyOn(document, "getElementById")
			.mockImplementation(() => {
				throw new Error(SIMULATED_DOM_FAILURE);
			});

		const result = domManipulation.isElementInDOM(elementId);

		expect(handler.error).toHaveBeenCalledWith(
			new Error(SIMULATED_DOM_FAILURE),
		);
		expect(result).toEqual(false);
		domSpy.mockRestore();
	});
});

describe("UTILS - DOM MANIPULATION - areAllElementsInDOM Function", () => {
	let element;
	const elementId = "temporary-element";

	beforeEach(() => {
		vi.clearAllMocks();
		element = document.createElement("div");
		element.id = elementId;
		document.body.appendChild(element);
	});

	afterEach(() => {
		element.remove();
		element = null;
	});

	it("are elements not in DOM with string id when element is blank", () => {
		const result = domManipulation.areAllElementsInDOM();
		expect(result).toBe(false);
	});

	it("are elements not in DOM with string ids and element ids", () => {
		const newElement = document.createElement("div");
		const newElementId = "new-element";
		newElement.id = newElementId;
		element.appendChild(newElement);

		const result = domManipulation.areAllElementsInDOM(
			elementId,
			newElementId,
			element,
			newElement,
		);
		expect(result).toBe(true);
	});

	it("are elements not in DOM with string ids and element ids but one of them is not", () => {
		const newElement = document.createElement("div");
		const newElementId = "new-element";
		newElement.id = newElementId;
		element.appendChild(newElement);

		const result = domManipulation.areAllElementsInDOM(
			elementId,
			newElementId,
			element,
			newElement,
			"no-element",
		);
		expect(result).toBe(false);
	});

	it("are elements in DOM with element string but an error occurs", () => {
		const domSpy = vi
			.spyOn(document, "getElementById")
			.mockImplementation(() => {
				throw new Error(SIMULATED_DOM_FAILURE);
			});

		const result = domManipulation.areAllElementsInDOM(elementId);

		expect(handler.error).toHaveBeenCalledWith(
			new Error(SIMULATED_DOM_FAILURE),
		);
		expect(result).toEqual(false);
		domSpy.mockRestore();
	});
});

describe("UTILS - DOM MANIPULATION - removeElementById Function", () => {
	let element;
	const elementId = "temporary-element";
	let newElement;
	const newElementId = "new-element";

	beforeEach(() => {
		vi.clearAllMocks();
		element = document.createElement("div");
		element.id = elementId;
		document.body.appendChild(element);

		newElement = document.createElement("div");
		newElement.id = newElementId;
		element.appendChild(newElement);
	});

	afterEach(() => {
		element.remove();
		element = null;
	});

	it("cannot remove any element if the input is blank", () => {
		domManipulation.removeElementById();
		const result1 = document.getElementById(elementId);
		const result2 = document.getElementById(newElementId);

		expect(result1).not.toBe(null);
		expect(result1).not.toBe(undefined);
		expect(result1.isConnected).toBe(true);
		expect(result2).not.toBe(null);
		expect(result2).not.toBe(undefined);
		expect(result2.isConnected).toBe(true);
	});

	it("cannot remove any element if the input is null", () => {
		domManipulation.removeElementById(null);
		const result1 = document.getElementById(elementId);
		const result2 = document.getElementById(newElementId);

		expect(result1).not.toBe(null);
		expect(result1).not.toBe(undefined);
		expect(result1.isConnected).toBe(true);
		expect(result2).not.toBe(null);
		expect(result2).not.toBe(undefined);
		expect(result2.isConnected).toBe(true);
	});

	it("will remove inner element leave the outer element", () => {
		domManipulation.removeElementById(newElementId);
		const result1 = document.getElementById(elementId);
		const result2 = document.getElementById(newElementId);

		expect(result1).not.toBe(null);
		expect(result1).not.toBe(undefined);
		expect(result1.isConnected).toBe(true);
		expect(result2).toBe(null);
	});

	it("will remove both element when outer element is removed", () => {
		domManipulation.removeElementById(elementId);
		const result1 = document.getElementById(elementId);
		const result2 = document.getElementById(newElementId);

		expect(result1).toBe(null);
		expect(result2).toBe(null);
	});

	it("will handle an error in encountered", () => {
		const domSpy = vi
			.spyOn(document, "getElementById")
			.mockImplementation(() => {
				throw new Error(SIMULATED_DOM_FAILURE);
			});

		const act = () => domManipulation.removeElementById(elementId);

		expect(act).toThrow(SIMULATED_DOM_FAILURE);
		expect(handler.error).toHaveBeenCalledWith(
			new Error(SIMULATED_DOM_FAILURE),
		);
		domSpy.mockRestore();
	});
});
