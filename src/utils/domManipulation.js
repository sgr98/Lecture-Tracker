import { handler } from "./handler.js";

export const generateElementFromHTMLString = (htmlString) => {
	try {
		const template = document.createElement("template");
		template.insertAdjacentHTML("beforeend", htmlString.trim());
		return template.firstElementChild;
	} catch (error) {
		handler.errorWithPopup(error);
	}
};

export const addHTMLElementToDomById = (sourceElementId, element) => {
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
