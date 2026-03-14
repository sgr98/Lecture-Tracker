import { ConsoleText } from "../constants/InternalConstants.js";
import {
	isArrayNullOrEmpty,
	isStringNullOrWhiteSpace,
	isValueNull,
} from "./common.js";
import { handler } from "./handler.js";

const generateElementFromHTMLString = (htmlString) => {
	try {
		if (isStringNullOrWhiteSpace(htmlString)) {
			throw new Error(ConsoleText.HTML_STRING_IS_EMPTY);
		}
		const template = document.createElement("template");
		template.insertAdjacentHTML("beforeend", htmlString.trim());
		return template.firstElementChild;
	} catch (error) {
		handler.error(error);
		throw error;
	}
};

const addHTMLElementToDomById = (sourceElementId, element) => {
	try {
		if (isStringNullOrWhiteSpace(sourceElementId)) {
			throw new Error(ConsoleText.HTML_STRING_IS_EMPTY);
		}
		const sourceElement = document.getElementById(sourceElementId);
		sourceElement.appendChild(element);
	} catch (error) {
		handler.error(error);
		throw error;
	}
};

export const addHTMLStringToDomById = (sourceElementId, htmlString) => {
	try {
		const elementToAdd = generateElementFromHTMLString(htmlString);
		addHTMLElementToDomById(sourceElementId, elementToAdd);
	} catch (error) {
		handler.error(error);
		throw error;
	}
};

export const isElementInDOM = (elementId) => {
	try {
		let element;
		if (typeof elementId === "string") {
			element = document.getElementById(elementId);
		} else if (typeof elementId === "object") {
			element = elementId;
		} else {
			return false;
		}
		const isElementInBody = !isValueNull(element) && element.isConnected;
		return isElementInBody;
	} catch (error) {
		handler.error(error);
		return false;
	}
};

export const areAllElementsInDOM = (...elements) => {
	try {
		if (isArrayNullOrEmpty(elements)) {
			return false;
		}
		for (let elem of elements) {
			if (!isElementInDOM(elem)) {
				return false;
			}
		}
		return true;
	} catch (error) {
		handler.error(error);
		return false;
	}
};

export const removeElementById = (elementId) => {
	try {
		const element = document.getElementById(elementId);
		if (!isValueNull(element)) {
			element.remove();
		}
	} catch (error) {
		handler.error(error);
		throw error;
	}
};

export const domManipulation = {
	addHTMLStringToDomById,
	isElementInDOM,
	areAllElementsInDOM,
	removeElementById,
};
