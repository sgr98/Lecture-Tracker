import {
	HTMLAttributesConstants,
	HTMLLecturesAttributesConstants,
} from "../../constants/HTMLConstants.js";
import { View } from "../view.js";

const { SECTION_CONTAINER } = HTMLAttributesConstants;
const { LECTURE_CONTAINER } = HTMLLecturesAttributesConstants;

export class LectureView extends View {
	constructor(moduleName) {
		super(moduleName);
	}

	generateHTML() {
		const lectureHTML = `
			<section
				id="${LECTURE_CONTAINER}"
				class="${LECTURE_CONTAINER} ${SECTION_CONTAINER}"
			>
			</section>
		`;
		return lectureHTML;
	}
}
