import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	HTMLModalAttributesConstants,
} from "../../constants/HTMLConstants.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../utils/enum.js";
import { addHTMLStringToDomById } from "../../utils/domManipulation.js";
import { modalController } from "../modal/modal.controller.js";
import { subjectModel } from "./subjects.model.js";
import { subjectView } from "./subjects.view.js";
import { errorPopupController } from "../popup/popup.controller.js";

const { STAGE, LIST_CONTAINER } = HTMLAttributesConstants;

const {
	SUBJECT,
	ADD_SUBJECT,
	ADD_SUBJECT_MODAL_TITLE,
	ADD_SUBJECT_MODAL_DESCRIPTION,
	ADD_SUBJECT_BUTTON,
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_PLACEHOLDER,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_PLACEHOLDER,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_PLACEHOLDER,
} = HTMLSubjectAttributesConstants;

const { MODAL, MODAL_FORM, INPUT } = HTMLModalAttributesConstants;

export const subjectController = {
	init: () => {
		subjectController.addSubjectSectionToStageDOM();
		subjectController.addSubjectListToSubjectSectionDOM();
		subjectModalController.init();
	},

	addSubjectSectionToStageDOM: () => {
		try {
			const subjectSectionHTML = subjectView.generateSubjectSectionHTML();
			addHTMLStringToDomById(STAGE, subjectSectionHTML);
		} catch (error) {
			console.error(error);
			errorPopupController.open(error);
		}
	},

	addSubjectListToSubjectSectionDOM: () => {
		try {
			const subjects = subjectModel.getSubjects();
			const subjectListHTML =
				subjectView.generateSubjectListHTML(subjects);
			const subjectListContainerId = `${SUBJECT}-${LIST_CONTAINER}`;
			addHTMLStringToDomById(subjectListContainerId, subjectListHTML);
		} catch (error) {
			console.error(error);
			errorPopupController.open(error);
		}
	},
};

export const subjectModalController = {
	init: () => {
		subjectModalController.addAddSubjectModal();
	},

	addAddSubjectModal: () => {
		try {
			const addSubjectModalFields = [
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Input,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: true,
				},
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Input,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: true,
				},
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Textarea,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: false,
				},
			];
			modalController.addModal(
				ADD_SUBJECT,
				ADD_SUBJECT_MODAL_TITLE,
				ADD_SUBJECT_MODAL_DESCRIPTION,
				addSubjectModalFields,
			);
			subjectModalController.addAddSubjectModalEventListeners();
		} catch (error) {
			console.error(error);
			errorPopupController.open(error);
		}
	},

	addAddSubjectModalEventListeners: () => {
		try {
			const addSubjectButton =
				document.getElementById(ADD_SUBJECT_BUTTON);
			const addSubjectModal = document.getElementById(
				`${ADD_SUBJECT}-${MODAL}`,
			);
			const addSubjectForm = document.getElementById(
				`${ADD_SUBJECT}-${MODAL_FORM}`,
			);

			addSubjectButton.addEventListener("click", () => {
				addSubjectModal.style.display = "flex";
			});

			addSubjectForm.addEventListener("submit", (event) => {
				event.preventDefault();
				const subjectName = document.getElementById(
					`${ADD_SUBJECT}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD}-${INPUT}`,
				).value;
				const subjectCode = document.getElementById(
					`${ADD_SUBJECT}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD}-${INPUT}`,
				).value;
				const subjectDescription = document.getElementById(
					`${ADD_SUBJECT}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD}-${INPUT}`,
				).value;
				subjectModel.addSubject({
					subjectName,
					subjectCode,
					subjectDescription,
					courseList: [],
				});
				addSubjectModal.style.display = "none";
				addSubjectForm.reset();
			});
		} catch (error) {
			console.error(error);
			errorPopupController.open(error);
		}
	},
};
