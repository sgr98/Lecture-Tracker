import { View } from "../view.js";

export class StageView extends View {
	constructor(moduleName) {
		super(moduleName);
	}

	generateHTML() {
		const stageHTML = `
			<section id="stage" class="stage">
			</section>
		`;
		return stageHTML;
	}
}
