import { View } from "../view.js";

export class TopbarView extends View {
	constructor(moduleName) {
		super(moduleName);
	}

	generateHTML() {
		const topbarHTML = `
			<section
				id="topbar"
				class="topbar section-container"
			>
				<div
					id="topbar-inner-container"
					class="topbar-inner-container"
				>
					<div
						id="topbar-title-container"
						class="topbar-title-container"
					>
						<div
							id="top-title"
							class="top-title top-button"
						>
							Lecture Tracker
						</div>
					</div>
					<div
						id="topbar-admin-container"
						class="topbar-admin-container"
					>
						<div
							id="top-admin-clear-subjects"
							class="top-admin-clear-subjects top-button"
						>
							Clear Subjects
						</div>
					</div>
				</div>
			</section>
		`;
		return topbarHTML;
	}
}
