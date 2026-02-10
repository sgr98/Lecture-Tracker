import { HTMLAttributesConstants } from "../../constants/HTMLConstants.js";
import { Controller } from "../controller.js";
import { CourseView } from "./courses.view.js";
import { addHTMLStringToDomById } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";

const { STAGE } = HTMLAttributesConstants;

export class CourseController extends Controller {
	constructor(moduleName) {
		super(moduleName);
		this._courseView = new CourseView(moduleName);
	}

	addComponent() {
		try {
			const courseHTML = this._courseView.generateHTML();
			addHTMLStringToDomById(STAGE, courseHTML);
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
