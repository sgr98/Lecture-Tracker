import { HTMLAttributesConstants } from "../../constants/HTMLConstants.js";
import { Controller } from "../controller.js";
import { LectureView } from "./lectures.view.js";
import { domManipulation } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";

const { STAGE } = HTMLAttributesConstants;

export class LectureController extends Controller {
	constructor(moduleName) {
		super(moduleName);
		this._lectureView = new LectureView(moduleName);
	}

	addComponent() {
		try {
			const lectureHTML = this._lectureView.generateHTML();
			domManipulation.addHTMLStringToDomById(STAGE, lectureHTML);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	addEventListeners() {
		try {
			// ...
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
