import { HTMLAttributesConstants } from "../../constants/HTMLConstants.js";
import { Controller } from "../controller.js";
import { TopbarView } from "./topbar.view.js";
import { addHTMLStringToDomById } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";

const { ROOT } = HTMLAttributesConstants;

export class TopbarController extends Controller {
	constructor(moduleName) {
		super(moduleName);
		this._topbarView = new TopbarView(moduleName);
	}

	addComponent() {
		try {
			const topbarHTML = this._topbarView.generateHTML();
			addHTMLStringToDomById(ROOT, topbarHTML);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	addEventListeners() {}
}
