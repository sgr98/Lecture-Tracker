import { HTMLAttributesConstants } from "../../constants/HTMLConstants.js";
import { Controller } from "../controller.js";
import { TopbarView } from "./topbar.view.js";
import { domManipulation } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";
import { SubjectAPI } from "../subjects/subjects.api.js";

const { ROOT } = HTMLAttributesConstants;

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
			const clearSubjectsButton =
				document.getElementById("clear-subjects");
			clearSubjectsButton.addEventListener("click", () => {
				SubjectAPI.deleteAllSubjects();
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
