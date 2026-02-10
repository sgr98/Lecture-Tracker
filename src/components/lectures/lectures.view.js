import { View } from "../view.js";

export class LectureView extends View {
	constructor(moduleName) {
		super(moduleName);
	}

	generateHTML() {
		const lectureHTML = `
			<section
				id="lecture-container"
				class="lecture-container section-container"
			>
			</section>
		`;
		return lectureHTML;
	}
}
