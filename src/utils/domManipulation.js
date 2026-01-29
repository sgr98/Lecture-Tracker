export const generateElementFromHTMLString = (htmlString) => {
    try {
        const template = document.createElement("template");
        template.insertAdjacentHTML("beforeend", htmlString.trim());
        return template.firstElementChild;
    } catch (error) {
        console.error(error);
        errorPopupController.open(error);
    }
};

export const addHTMLElementToDOM = (sourceElementId, element) => {
    try {
        const sourceElement = document.getElementById(sourceElementId);
        sourceElement.appendChild(element);
    } catch (error) {
        console.error(error);
        errorPopupController.open(error);
    }
};

export const addHTMLStringToDOM = (sourceElementId, htmlString) => {
    try {
        const elementToAdd = generateElementFromHTMLString(htmlString);
        addHTMLElementToDOM(sourceElementId, elementToAdd);
    } catch (error) {
        console.error(error);
        errorPopupController.open(error);
    }
};
