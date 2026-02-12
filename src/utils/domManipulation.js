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
		const element = document.getElementById(elementId);
		return !isValueNull(element);
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
	removeElementById,
};
