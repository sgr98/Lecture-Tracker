import {
	HTMLAttributesConstants,
	HTMLTopbarAttributesConstants,
	DisplayText,
} from "../../constants/HTMLConstants.js";
import { Controller } from "../controller.js";
import { TopbarView } from "./topbar.view.js";
import { domManipulation } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";
import { SubjectAPI } from "../subjects/subjects.api.js";
import { successPopupController } from "../common/popup/popup.controller.js";

const { SUBJECTS_CLEARED_MESSAGE } = DisplayText.topbar;
const { ROOT } = HTMLAttributesConstants;
const { TOP_ADMIN_CLEAR_SUBJECTS } = HTMLTopbarAttributesConstants;

export class TopbarController extends Controller {
	constructor(moduleName) {
		super(moduleName);
		this._topbarView = new TopbarView(moduleName);
	}

	addComponent() {
		try {
			const topbarHTML = this._topbarView.generateHTML();
			domManipulation.addHTMLStringToDomById(ROOT, topbarHTML);
			this.addEventListeners();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	addEventListeners() {
		try {
			this._clearSubjectsEventListener();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_clearSubjectsEventListener() {
		try {
			const clearSubjectsButton = document.getElementById(
				TOP_ADMIN_CLEAR_SUBJECTS,
			);
			clearSubjectsButton.addEventListener("click", () => {
				SubjectAPI.deleteAllSubjects();
				successPopupController.open(SUBJECTS_CLEARED_MESSAGE);
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
