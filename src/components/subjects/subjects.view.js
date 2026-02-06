import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
} from "../../constants/HTMLConstants.js";
import {
	getNumberValueOrDefault,
	getStringValueOrDefault,
	isArrayNullOrEmpty,
} from "../../utils/common.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";

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

const generateSubjectSectionHTML = () => {
	const subjectTopSectionHTML = `
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
	return subjectTopSectionHTML;
};

const generateSubjectListItemHTML = (subject) => {
	const subjectOrder = getNumberValueOrDefault(
		subject[DBSubjectConstants.ORDER],
	);
	const subjectName = getStringValueOrDefault(
		subject[DBSubjectConstants.SUBJECT_NAME],
	);
	const subjectListItemHTML = `
        <div
            id="${SUBJECT}-${subjectOrder}"
            class="${SUBJECT_BUTTON} ${LIST_BUTTON} ${BUTTON}"
        >
            ${subjectName}
        </div>
    `;
	return subjectListItemHTML;
};

const generateSubjectListHTML = (subjectList) => {
	if (isArrayNullOrEmpty(subjectList)) {
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

	const subjectListItemsHTML = subjectList
		.map(generateSubjectListItemHTML)
		.join("");
	const subjectListHTML = `
        <div
            id="${SUBJECT}-${LIST_INNER_CONTAINER}"
            class="${SUBJECT}-${LIST_INNER_CONTAINER} ${LIST_INNER_CONTAINER}"
        >
            ${subjectListItemsHTML}
        </div>
    `;
	return subjectListHTML;
};

export const subjectView = {
	generateSubjectSectionHTML,
	generateSubjectListItemHTML,
	generateSubjectListHTML,
};
