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
	LIST_SECTION_CONTAINER,
	SECTION_TITLE_CONTAINER,
	SECTION_TITLE,
	SECTION_ACTION_CONTAINER,
	SECTION_ACTION_INNER_CONTAINER,
	SECTION_ACTION_ROW,
	SECTION_ACTION_ROW_1,
	SECTION_ACTION_ROW_2,
	ADD_ACTION_BUTTON,
	EDIT_ACTION_BUTTON,
	CANCEL_ACTION_BUTTON,
	SAVE_ACTION_BUTTON,
	LIST_BUTTON_CONTAINER,
	LIST_CONTAINER,
	LIST_INNER_CONTAINER,
	LIST_BUTTON,
	LIST_SECTION_EDIT_BUTTONS,
	LIST_DRAG_BUTTON,
	LIST_DELETE_BUTTON,
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
	NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
	NO_SUBJECTS_MESSAGE_ID,
} = HTMLSubjectAttributesConstants;
const { DRAG_ICON, DELETE_ICON } = DisplayText.general;
const {
	SUBJECT_SECTION_TITLE,
	ADD_SUBJECT_BUTTON_TEXT,
	EDIT_SUBJECT_BUTTON_TEXT,
	NO_SUBJECTS_MESSAGE,
	CANCEL_SUBJECT_BUTTON_TEXT,
	SAVE_SUBJECT_BUTTON_TEXT,
} = DisplayText.subject;

export class SubjectSectionView extends View {
	constructor(modulueName) {
		super(modulueName);
	}

	generateHTML() {
		const subjectSectionHTML = `
			<section
				id="${SUBJECT_CONTAINER}"
				class="${SUBJECT_CONTAINER} ${LIST_SECTION_CONTAINER} ${SECTION_CONTAINER}"
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
						id="${SUBJECT}-${ADD_ACTION_BUTTON}"
						class="${SUBJECT}-${ADD_ACTION_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${ADD_SUBJECT_BUTTON_TEXT}
					</div>
					<div
						id="${SUBJECT}-${EDIT_ACTION_BUTTON}"
						class="${SUBJECT}-${EDIT_ACTION_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${EDIT_SUBJECT_BUTTON_TEXT}
					</div>
				</div>
				<div
					id="${SUBJECT_ACTION_ROW_2}"
					class="${SUBJECT_ACTION_ROW_2} ${SECTION_ACTION_ROW_2} ${SECTION_ACTION_ROW}"
				>
					<div
						id="${SUBJECT}-${CANCEL_ACTION_BUTTON}"
						class="${SUBJECT}-${CANCEL_ACTION_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${CANCEL_SUBJECT_BUTTON_TEXT}
					</div>
					<div
						id="${SUBJECT}-${SAVE_ACTION_BUTTON}"
						class="${SUBJECT}-${SAVE_ACTION_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${SAVE_SUBJECT_BUTTON_TEXT}
					</div>
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
					id="${SUBJECT}-${LIST_DRAG_BUTTON}"
					class="${SUBJECT}-${LIST_DRAG_BUTTON} ${LIST_DRAG_BUTTON} ${LIST_SECTION_EDIT_BUTTONS}"
				>
					<span>${DRAG_ICON}</span>
				</div>
				<div
					id="${SUBJECT}-${order}__${id}"
					class="${SUBJECT_BUTTON} ${LIST_BUTTON}"
				>
					<span>${subjectName}</span>
				</div>
				<div
					id="${SUBJECT}-${LIST_DELETE_BUTTON}"
					class="${SUBJECT}-${LIST_DELETE_BUTTON} ${LIST_DELETE_BUTTON} ${LIST_SECTION_EDIT_BUTTONS}"
				>
					<span>${DELETE_ICON}</span>
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
