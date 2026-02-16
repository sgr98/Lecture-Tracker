import {
	HTMLAttributesConstants,
	HTMLCoursesAttributesConstants,
} from "../../constants/HTMLConstants.js";
import { View } from "../view.js";

const { SECTION_CONTAINER } = HTMLAttributesConstants;
const { COURSE_CONTAINER } = HTMLCoursesAttributesConstants;

export class CourseView extends View {
	constructor(moduleName) {
		super(moduleName)
	}

	generateHTML() {
		const courseHTML = `
			<section
				id="${COURSE_CONTAINER}"
				class="${COURSE_CONTAINER} ${SECTION_CONTAINER}"
			>
			</section>
		`;
		return courseHTML;
	}
}
