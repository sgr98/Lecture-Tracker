import { isValueNull } from "./common.js";
import { handler } from "./handler.js";

const generateElementFromHTMLString = (htmlString) => {
	try {
		const template = document.createElement("template");
		template.insertAdjacentHTML("beforeend", htmlString.trim());
		return template.firstElementChild;
	} catch (error) {
		handler.errorWithPopup(error);
	}
};

const addHTMLElementToDomById = (sourceElementId, element) => {
	try {
		const sourceElement = document.getElementById(sourceElementId);
		sourceElement.appendChild(element);
	} catch (error) {
		handler.errorWithPopup(error);
	}
};

export const addHTMLStringToDomById = (sourceElementId, htmlString) => {
	try {
		const elementToAdd = generateElementFromHTMLString(htmlString);
		addHTMLElementToDomById(sourceElementId, elementToAdd);
	} catch (error) {
		handler.errorWithPopup(error);
	}
};

export const isElementInDOM = (elementId) => {
	try {
		let element;
		if (typeof elementId === 'string') {
			element = document.getElementById(elementId);
		} else if (typeof elementId === 'object') {
			element = elementId;
		} else {
			return false;
		}
		return !isValueNull(element);
	} catch (error) {
		handler.errorWithPopup(error);
		return false;
	}
};

export const areAllElementsInDOM = (...elements) => {
	try {
		elements = elements ?? [];
		for (let elem of elements) {
			if (!isElementInDOM(elem)) {
				return false;
			}
		}
		return true;
	} catch (error) {
		handler.errorWithPopup(error);
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
		handler.errorWithPopup(error);
	}
};

export const domManipulation = {
	addHTMLStringToDomById,
	isElementInDOM,
	areAllElementsInDOM,
	removeElementById,
};
