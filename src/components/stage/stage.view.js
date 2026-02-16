import { HTMLAttributesConstants } from "../../constants/HTMLConstants.js";
import { View } from "../view.js";

const { STAGE } = HTMLAttributesConstants;

export class StageView extends View {
	constructor(moduleName) {
		super(moduleName);
	}

	generateHTML() {
		const stageHTML = `
			<section id="${STAGE}" class="${STAGE}">
			</section>
		`;
		return stageHTML;
	}
}
