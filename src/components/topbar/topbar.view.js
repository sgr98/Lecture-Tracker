import { View } from "../view.js";

export class TopbarView extends View {
	constructor(moduleName) {
		super(moduleName)
	}

	generateHTML() {
		const topbarHTML = `
			<section
				id="topbar"
				class="topbar section-container"
			>
				<div
					id="top-title"
					class="top-title"
				>
					Lecture Tracker
				</div>
			</section>
		`;
		return topbarHTML;
	}
}
