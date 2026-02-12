import { HTMLAttributesConstants } from "../../constants/HTMLConstants.js";
import { Controller } from "../controller.js";
import { StageView } from "./stage.view.js";
import { domManipulation } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";

const { ROOT } = HTMLAttributesConstants;

export class StageController extends Controller {
	constructor(moduleName) {
		super(moduleName);
		this._stageView = new StageView(moduleName);
	}

	addComponent() {
		try {
			const stageHTML = this._stageView.generateHTML();
			domManipulation.addHTMLStringToDomById(ROOT, stageHTML);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	addEventListeners() {}
}
