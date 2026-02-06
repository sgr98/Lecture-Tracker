import {
	HTMLAttributesConstants,
	HTMLPopupAttributesConstants,
} from "../../constants/HTMLConstants.js";
import {
	getArrayValueOrDefault,
	getStringValueOrDefault,
} from "../../utils/common.js";
import { HTMLPopupTypeEnum } from "../../utils/enum.js";
import { addHTMLStringToDomById } from "../../utils/domManipulation.js";
import { popupView } from "./popup.view.js";

const { ROOT } = HTMLAttributesConstants;

const {
	POPUP,
	CLOSE,
	ALERT,
	ALERT_TEXT,
	INFO,
	INFO_TEXT,
	WARNING,
	WARNING_TEXT,
	ERROR,
	ERROR_TEXT,
	SUCCESS,
	SUCCESS_TEXT,
} = HTMLPopupAttributesConstants;

export const popupController = {
	open: (moduleName, title, description, index = "") => {
		try {
			index = getStringValueOrDefault(index);
			popupController.addPopupToRootDOM(
				moduleName,
				index,
				title,
				description,
			);
			popupController.addPopupCloseEventListener(moduleName, index);
		} catch (error) {
			console.error(error);
			errorPopupController.open(error);
		}
	},

	addPopupToRootDOM: (moduleName, index, title, description) => {
		try {
			const alertPopupHTML = popupView.generatePopupHTML(
				moduleName,
				index,
				title,
				description,
			);
			addHTMLStringToDomById(ROOT, alertPopupHTML);
		} catch (error) {
			console.error(error);
			errorPopupController.open(error);
		}
	},

	addPopupCloseEventListener: (moduleName, index) => {
		try {
			const popup = document.getElementById(
				`${moduleName}-${index}-${POPUP}`,
			);
			const popupCloseButton = document.getElementById(
				`${CLOSE}-${moduleName}-${index}-${POPUP}`,
			);

			popupCloseButton.addEventListener("click", () => {
				if (popup) {
					const parentElement = popup.parentNode;
					if (parentElement) {
						parentElement.removeChild(popup);
					}
				}
			});
		} catch (error) {
			console.error(error);
			errorPopupController.open(error);
		}
	},
};

export const alertPopupController = {
	open: (description, index = "") => {
		popupController.open(ALERT, ALERT_TEXT, description, index);
	},
};

export const infoPopupController = {
	open: (description, index = "") => {
		popupController.open(INFO, INFO_TEXT, description, index);
	},
};

export const warningPopupController = {
	open: (description, index = "") => {
		popupController.open(WARNING, WARNING_TEXT, description, index);
	},
};

export const errorPopupController = {
	open: (description, index = "") => {
		popupController.open(ERROR, ERROR_TEXT, description, index);
	},
};

export const successPopupController = {
	open: (description, index = "") => {
		popupController.open(SUCCESS, SUCCESS_TEXT, description, index);
	},
};

export const multiplePopupsController = {
	open: (popupDetails) => {
		popupDetails = getArrayValueOrDefault(popupDetails);
		popupDetails.forEach((popup, index) => {
			const { popupType, description } = popup;
			const id = (index + 1).toString();
			if (popupType === HTMLPopupTypeEnum.Alert) {
				alertPopupController.open(description, id);
			} else if (popupType === HTMLPopupTypeEnum.Info) {
				infoPopupController.open(description, id);
			} else if (popupType === HTMLPopupTypeEnum.Warning) {
				warningPopupController.open(description, id);
			} else if (popupType === HTMLPopupTypeEnum.Error) {
				errorPopupController.open(description, id);
			} else if (popupType === HTMLPopupTypeEnum.Success) {
				successPopupController.open(description, id);
			}
		});
	},
};
