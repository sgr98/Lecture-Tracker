import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	HTMLModalAttributesConstants,
} from "../../constants/HTMLConstants.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../utils/enum.js";
import { domManipulation } from "../../utils/domManipulation.js";
import { ModalController } from "../common/modal/modal.controller.js";

import { subjectAPI } from "./subjects.api.js";
import {
	SubjectSectionView,
	SubjectListContainerView,
} from "./subjects.view.js";
import { handler } from "../../utils/handler.js";
import { Controller } from "../controller.js";

const { STAGE, LIST_CONTAINER, LIST_INNER_CONTAINER } = HTMLAttributesConstants;

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
	NO_SUBJECTS_MESSAGE_ID,
} = HTMLSubjectAttributesConstants;

const { MODAL } = HTMLModalAttributesConstants;

export class SubjectController extends Controller {
	constructor(moduleName) {
		super(moduleName);
		this._subjectSectionView = new SubjectSectionView(moduleName);
		this._subjects = subjectAPI.getSubjects();
		this._subjectListContainerView = new SubjectListContainerView(
			this._moduleName,
		);
		this._addSubjectModalController = new AddSubjectModalController(
			"AddSubjectModal",
			(subject) => {
				this._addSubjectCallback(subject);
			},
		);
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Components
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addComponent() {
		try {
			this._addSubjectSectionComponent();
			this._addSubjectListContainerComponent();
			this._addSubjectModalController.addComponent();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	addNewSubjectComponent(subject) {
		try {
			domManipulation.removeElementById(NO_SUBJECTS_MESSAGE_ID);
			domManipulation.removeElementById(
				`${SUBJECT}-${LIST_INNER_CONTAINER}`,
			);
			this._addSubjectListContainerComponent();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectSectionComponent() {
		try {
			const subjectSectionHTML = this._subjectSectionView.generateHTML();
			domManipulation.addHTMLStringToDomById(STAGE, subjectSectionHTML);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectListContainerComponent() {
		try {
			this._subjects = subjectAPI.getSubjects();
			const subjectListHTML = this._subjectListContainerView.generateHTML(
				this._subjects,
			);
			const subjectListContainerId = `${SUBJECT}-${LIST_CONTAINER}`;
			domManipulation.addHTMLStringToDomById(
				subjectListContainerId,
				subjectListHTML,
			);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectCallback(newSubject) {
		try {
			const subject = subjectAPI.addSubject(newSubject);
			this._subjects = subjectAPI.getSubjects();
			this.addNewSubjectComponent(subject);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Event Listeners
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addEventListeners() {
		try {
			// ...
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}

class AddSubjectModalController extends Controller {
	constructor(moduleName, addSubjectCallback) {
		super(moduleName);
		this._addSubjectCallback = addSubjectCallback;
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Components
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addComponent() {
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
					mapTo: DBSubjectConstants.SUBJECT_NAME,
				},
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Input,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: true,
					mapTo: DBSubjectConstants.SUBJECT_CODE,
				},
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Textarea,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: false,
					mapTo: DBSubjectConstants.SUBJECT_DESCRIPTION,
				},
			];
			const modalController = new ModalController(
				ADD_SUBJECT,
				ADD_SUBJECT_MODAL_TITLE,
				ADD_SUBJECT_MODAL_DESCRIPTION,
				addSubjectModalFields,
				(fields) => {
					this._addSubjectModalCallback(fields);
				},
			);
			modalController.addComponent();
			this.addEventListeners();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectModalCallback(formFields) {
		try {
			let newSubject = {};
			formFields.forEach((field) => {
				const { value, mapTo } = field;
				newSubject[mapTo] = value;
			});
			newSubject[DBSubjectConstants.COURSE_LIST] = [];
			this._addSubjectCallback(newSubject);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Event Listeners
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addEventListeners() {
		try {
			this._openAddSubjectModalEventListener();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_openAddSubjectModalEventListener() {
		try {
			const addSubjectButton =
				document.getElementById(ADD_SUBJECT_BUTTON);
			const addSubjectModal = document.getElementById(
				`${ADD_SUBJECT}-${MODAL}`,
			);
			addSubjectButton.addEventListener("click", () => {
				addSubjectModal.style.display = "flex";
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
