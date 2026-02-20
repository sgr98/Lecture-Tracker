import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	DisplayText,
} from "../../constants/HTMLConstants.js";
import { isArrayNullOrEmpty } from "../../utils/common.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { View } from "../view.js";

const {
	SECTION_CONTAINER,
	SECTION_TITLE_CONTAINER,
	SECTION_TITLE,
	SECTION_ACTION_CONTAINER,
	SECTION_ACTION_INNER_CONTAINER,
	SECTION_ACTION_ROW,
	SECTION_ACTION_ROW_1,
	SECTION_ACTION_ROW_2,
	LIST_BUTTON_CONTAINER,
	LIST_CONTAINER,
	LIST_INNER_CONTAINER,
	LIST_BUTTON,
	BUTTON,
	SECTION_ACTION_BUTTON,
	NO_ITEMS_IN_LIST_MESSAGE_CONTAINER,
	NO_ITEMS_IN_LIST_MESSAGE,
} = HTMLAttributesConstants;
const {
	SUBJECT,
	SUBJECT_CONTAINER,
	SUBJECT_TITLE_CONTAINER,
	SUBJECT_TITLE,
	SUBJECT_ACTION_CONTAINER,
	SUBJECT_ACTION_INNER_CONTAINER,
	SUBJECT_ACTION_ROW_1,
	SUBJECT_ACTION_ROW_2,
	SUBJECT_LIST_BUTTON_CONTAINER,
	SUBJECT_BUTTON,
	ADD_SUBJECT_BUTTON,
	EDIT_SUBJECT_BUTTON,
	NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
	NO_SUBJECTS_MESSAGE_ID,
} = HTMLSubjectAttributesConstants;
const {
	SUBJECT_SECTION_TITLE,
	ADD_SUBJECT_BUTTON_TEXT,
	EDIT_SUBJECT_BUTTON_TEXT,
	NO_SUBJECTS_MESSAGE,
} = DisplayText.subject;

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
					id="${SUBJECT_TITLE_CONTAINER}"
					class="${SUBJECT_TITLE_CONTAINER} ${SECTION_TITLE_CONTAINER}"
				>
					<span
						id="${SUBJECT_TITLE}"
						class="${SUBJECT_TITLE} ${SECTION_TITLE}"
					>
						${SUBJECT_SECTION_TITLE}
					</span>
				</div>

				<div
					id="${SUBJECT_ACTION_CONTAINER}"
					class="${SUBJECT_ACTION_CONTAINER} ${SECTION_ACTION_CONTAINER}"
				>
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

export class SubjectActionView extends View {
	constructor(modulueName) {
		super(modulueName);
	}

	generateHTML() {
		const subjectActionHTML = `
			<div
				id="${SUBJECT_ACTION_INNER_CONTAINER}"
				class="${SUBJECT_ACTION_INNER_CONTAINER} ${SECTION_ACTION_INNER_CONTAINER}"
			>
				<div
					id="${SUBJECT_ACTION_ROW_1}"
					class="${SUBJECT_ACTION_ROW_1} ${SECTION_ACTION_ROW_1} ${SECTION_ACTION_ROW}"
				>
					<div
						id="${ADD_SUBJECT_BUTTON}"
						class="${ADD_SUBJECT_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${ADD_SUBJECT_BUTTON_TEXT}
					</div>
					<div
						id="${EDIT_SUBJECT_BUTTON}"
						class="${EDIT_SUBJECT_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${EDIT_SUBJECT_BUTTON_TEXT}
					</div>
				</div>
				<div
					id="${SUBJECT_ACTION_ROW_2}"
					class="${SUBJECT_ACTION_ROW_2} ${SECTION_ACTION_ROW_2} ${SECTION_ACTION_ROW}"
				>
				</div>
			</div>
		`;
		return subjectActionHTML;
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
	generateNewSubjectHTML(newSubject, isFirstSubject) {
		const newSubjectHTML = this._generateSubjectListItemHTML(newSubject);
		if (isFirstSubject) {
			return this._generateSubjectListHTML(newSubjectHTML);
		}
		return newSubjectHTML;
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
				id="${SUBJECT_LIST_BUTTON_CONTAINER}-${order}"
				class="${SUBJECT_LIST_BUTTON_CONTAINER} ${LIST_BUTTON_CONTAINER}"
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
				id="${NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER}"
				class="${NO_ITEMS_IN_LIST_MESSAGE_CONTAINER}"
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
