import {
	HTMLAttributesConstants,
	HTMLTopbarAttributesConstants,
	DisplayText,
} from "../../constants/HTMLConstants.js";
import { View } from "../view.js";

const { LECTURE_TRACKER, CLEAR_SUBJECTS } = DisplayText.topbar;
const { SECTION_CONTAINER } = HTMLAttributesConstants;
const {
	TOPBAR,
	TOPBAR_INNER_CONTAINER,
	TOPBAR_TITLE_CONTAINER,
	TOP_TITLE,
	TOP_BUTTON,
	TOPBAR_ADMIN_CONTAINER,
	TOP_ADMIN_CLEAR_SUBJECTS,
} = HTMLTopbarAttributesConstants;

export class TopbarView extends View {
	constructor(moduleName) {
		super(moduleName);
	}

	generateHTML() {
		const topbarHTML = `
			<section
				id="${TOPBAR}"
				class="${TOPBAR} ${SECTION_CONTAINER}"
			>
				<div
					id="${TOPBAR_INNER_CONTAINER}"
					class="${TOPBAR_INNER_CONTAINER}"
				>
					<div
						id="${TOPBAR_TITLE_CONTAINER}"
						class="${TOPBAR_TITLE_CONTAINER}"
					>
						<div
							id="${TOP_TITLE}"
							class="${TOP_TITLE} ${TOP_BUTTON}"
						>
							${LECTURE_TRACKER}
						</div>
					</div>
					<div
						id="${TOPBAR_ADMIN_CONTAINER}"
						class="${TOPBAR_ADMIN_CONTAINER}"
					>
						<div
							id="${TOP_ADMIN_CLEAR_SUBJECTS}"
							class="${TOP_ADMIN_CLEAR_SUBJECTS} ${TOP_BUTTON}"
						>
							${CLEAR_SUBJECTS}
						</div>
					</div>
				</div>
			</section>
		`;
		return topbarHTML;
	}
}
