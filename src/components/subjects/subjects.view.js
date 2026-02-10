import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
} from "../../constants/HTMLConstants.js";
import { isArrayNullOrEmpty } from "../../utils/common.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { View, ListView } from "../view.js";

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
					id="${ADD_SUBJECT_BUTTON}"
					class="${ADD_SUBJECT_BUTTON} ${ADD_BUTTON} ${BUTTON}"
				>
					${ADD_SUBJECT_BUTTON_TEXT}
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

export class SubjectListContainerView extends ListView {
	constructor(modulueName, subjectList) {
		super(modulueName, subjectList);
	}

	generateHTML() {
		if (isArrayNullOrEmpty(this._items)) {
			return this._generateNoSubjectsMessageHTML();
		}
		const subjectItemsHTML = this._generateSubjectItemsHTML();
		const subjectListHTML = this._generateSubjectListHTML(subjectItemsHTML);
		return subjectListHTML;
	}

	_generateSubjectItemsHTML() {
		const subjectItemsHTML = this._items
			.map(this._generateSubjectListItemHTML)
			.join("");
		return subjectItemsHTML;
	}

	_generateSubjectListItemHTML(subject) {
		const subjectOrder = subject[DBSubjectConstants.ORDER] ?? 0;
		const subjectName = subject[DBSubjectConstants.SUBJECT_NAME] ?? "";
		const subjectListItemHTML = `
			<div
				id="${SUBJECT}-${subjectOrder}"
				class="${SUBJECT_BUTTON} ${LIST_BUTTON} ${BUTTON}"
			>
				${subjectName}
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
            <span
                id="${NO_SUBJECTS_MESSAGE_ID}"
                class ="${NO_ITEMS_IN_LIST_MESSAGE}"
            >
                ${NO_SUBJECTS_MESSAGE}
            </span>
        `;
		return noSubjectsInListHTML;
	}
}
