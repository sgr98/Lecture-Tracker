import {
	HTMLAttributesConstants,
	HTMLPopupAttributesConstants,
	DisplayText,
} from "../../../constants/HTMLConstants.js";
import { domManipulation } from "../../../utils/domManipulation.js";
import { Controller } from "../../controller.js";
import { handler } from "../../../utils/handler.js";
import { PopupView } from "./popup.view.js";

const { ROOT } = HTMLAttributesConstants;
const { POPUP, CLOSE, ALERT, INFO, WARNING, ERROR, SUCCESS } =
	HTMLPopupAttributesConstants;
const { ALERT_TEXT, INFO_TEXT, WARNING_TEXT, ERROR_TEXT, SUCCESS_TEXT } =
	DisplayText.popup;

class PopupController extends Controller {
	constructor(moduleName, title, description) {
		super(moduleName);
		this._moduleName = moduleName ?? ALERT;
		this._title = title ?? ALERT_TEXT;
		this._description = description ?? "";
		this._index = "1";
	}

	addComponent() {
		try {
			this._popupView = new PopupView(
				this._moduleName,
				this._title,
				this._description,
				this._index,
			);
			const popupHTML = this._popupView.generateHTML();
			domManipulation.addHTMLStringToDomById(ROOT, popupHTML);
			this.addEventListeners();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_getPopupIndex() {
		try {
		const moduleName = this._moduleName;
		const popups = document.getElementsByClassName(
			`${moduleName}-${POPUP}`,
		);
		let popupsCount = popups.length ?? 0;
		popupsCount += 1;
		return popupsCount.toString();
		} catch (error) {
			handler.error(error);
		}
	}

	addEventListeners() {
		try {
			this._addPopupCloseEventListener();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addPopupCloseEventListener() {
		try {
			const moduleName = this._moduleName;
			const index = this._index;
			const popup = document.getElementById(
				`${moduleName}-${POPUP}-${index}`,
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
			handler.error(error);
		}
	}
}

export class AlertPopupController extends PopupController {
	constructor(description) {
		super(ALERT, ALERT_TEXT, description);
		this._index = super._getPopupIndex() ?? "1";
	}
}

export class InfoPopupController extends PopupController {
	constructor(description) {
		super(INFO, INFO_TEXT, description);
		this._index = super._getPopupIndex() ?? "1";
	}
}

export class WarningPopupController extends PopupController {
	constructor(description) {
		super(WARNING, WARNING_TEXT, description);
		this._index = super._getPopupIndex() ?? "1";
	}
}

export class ErrorPopupController extends PopupController {
	constructor(description) {
		super(ERROR, ERROR_TEXT, description);
		this._index = super._getPopupIndex() ?? "1";
	}
}

export class SuccessPopupController extends PopupController {
	constructor(description) {
		super(SUCCESS, SUCCESS_TEXT, description);
		this._index = super._getPopupIndex() ?? "1";
	}
}
