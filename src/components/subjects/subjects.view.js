import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
} from "../../constants/HTMLConstants.js";
import { isArrayNullOrEmpty } from "../../utils/common.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { View } from "../view.js";

const {
	SECTION_CONTAINER,
	LIST_CONTAINER,
	LIST_INNER_CONTAINER,
	LIST_BUTTON,
	BUTTON,
	ADD_BUTTON,
	NO_ITEMS_IN_LIST_MESSAGE,
} = HTMLAttributesConstants;
const {
	SUBJECT,
	SUBJECT_CONTAINER,
	SUBJECT_BUTTON,
	ADD_SUBJECT_BUTTON,
	ADD_SUBJECT_BUTTON_TEXT,
	NO_SUBJECTS_MESSAGE_ID,
	NO_SUBJECTS_MESSAGE,
} = HTMLSubjectAttributesConstants;

export class SubjectSectionView extends View {
	constructor(modulueName) {
		super(modulueName);
	}

	generateHTML() {
		const subjectSectionHTML = `
			<section
				id="${SUBJECT_CONTAINER}"
				class="${SUBJECT_CONTAINER} ${SECTION_CONTAINER}"
			>
				<div
					id="subject-action-container"
					class="subject-action-container section-action-container"
				>
					<div
						id="${ADD_SUBJECT_BUTTON}"
						class="${ADD_SUBJECT_BUTTON} ${ADD_BUTTON} ${BUTTON}"
					>
						${ADD_SUBJECT_BUTTON_TEXT}
					</div>
				</div>

				<div
					id="${SUBJECT}-${LIST_CONTAINER}"
					class="${SUBJECT}-${LIST_CONTAINER} ${LIST_CONTAINER}"
				>
				</div>
			</section>
		`;
		return subjectSectionHTML;
	}
}

export class SubjectListContainerView extends View {
	constructor(modulueName) {
		super(modulueName);
	}

	generateHTML(subjects) {
		if (isArrayNullOrEmpty(subjects)) {
			return this._generateNoSubjectsMessageHTML();
		}
		const subjectItemsHTML = this._generateSubjectItemsHTML(subjects);
		const subjectListHTML = this._generateSubjectListHTML(subjectItemsHTML);
		return subjectListHTML;
	}

	// NOT BEING USED CURRENTLY
	generateNewSubjectItemHTML(newSubject) {
		return this._generateSubjectListItemHTML(newSubject);
	}

	_generateSubjectItemsHTML(subjects) {
		const subjectItemsHTML = subjects
			.map(this._generateSubjectListItemHTML)
			.join("");
		return subjectItemsHTML;
	}

	_generateSubjectListItemHTML(subject) {
		const id = subject[DBSubjectConstants.ID] ?? "";
		const order = subject[DBSubjectConstants.ORDER] ?? 0;
		const subjectName = subject[DBSubjectConstants.SUBJECT_NAME] ?? "";
		const subjectListItemHTML = `
			<div
				id="subject-list-button-container-${order}"
				class="subject-list-button-container list-button-container"
			>
				<div
					id="${SUBJECT}-${order}__${id}"
					class="${SUBJECT_BUTTON} ${LIST_BUTTON}"
				>
					${subjectName}
				</div>
			</div>
		`;
		return subjectListItemHTML;
	}

	_generateSubjectListHTML(subjectListItemsHTML) {
		const subjectListHTML = `
			<div
				id="${SUBJECT}-${LIST_INNER_CONTAINER}"
				class="${SUBJECT}-${LIST_INNER_CONTAINER} ${LIST_INNER_CONTAINER}"
			>
				${subjectListItemsHTML}
			</div>
		`;
		return subjectListHTML;
	}

	_generateNoSubjectsMessageHTML() {
		const noSubjectsInListHTML = `
			<div
				id="no-subjects-in-list-message-container"
				class="no-items-in-list-message-container"
			>
				<span
					id="${NO_SUBJECTS_MESSAGE_ID}"
					class ="${NO_ITEMS_IN_LIST_MESSAGE}"
				>
					${NO_SUBJECTS_MESSAGE}
				</span>
			</div>
        `;
		return noSubjectsInListHTML;
	}
}
