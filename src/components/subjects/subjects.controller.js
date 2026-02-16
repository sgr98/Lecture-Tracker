import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	HTMLModalAttributesConstants,
	ElementModuleName,
	DisplayText,
} from "../../constants/HTMLConstants.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../utils/enum.js";
import { domManipulation } from "../../utils/domManipulation.js";
import { ModalController } from "../common/modal/modal.controller.js";

import { SubjectAPI } from "./subjects.api.js";
import {
	SubjectSectionView,
	SubjectListContainerView,
} from "./subjects.view.js";
import { handler } from "../../utils/handler.js";
import { Controller } from "../controller.js";
import { isValueNull } from "../../utils/common.js";

const { STAGE, LIST_CONTAINER, LIST_INNER_CONTAINER } = HTMLAttributesConstants;
const {
	SUBJECT,
	SUBJECT_ACTIVE_LIST_BUTTON,
	ADD_SUBJECT,
	ADD_SUBJECT_BUTTON,
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
	NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
} = HTMLSubjectAttributesConstants;
const { MODAL } = HTMLModalAttributesConstants;
const { ADD_SUBJECT_MODAL } = ElementModuleName;
const {
	ADD_SUBJECT_MODAL_TITLE,
	ADD_SUBJECT_MODAL_DESCRIPTION,
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_PLACEHOLDER,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_PLACEHOLDER,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_PLACEHOLDER,
} = DisplayText.subject;

export class SubjectController extends Controller {
	constructor(moduleName) {
		super(moduleName);
		this._subjectSectionView = new SubjectSectionView(moduleName);
		this._subjectListContainerView = new SubjectListContainerView(
			this._moduleName,
		);

		this._subjectAPI = new SubjectAPI();
		this._currentSubject = null;

		this._addSubjectModalController = new AddSubjectModalController(
			ADD_SUBJECT_MODAL,
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
			domManipulation.removeElementById(
				NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
			);
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
			const subjects = this._subjectAPI.getSubjects();
			const subjectListHTML =
				this._subjectListContainerView.generateHTML(subjects);
			const subjectListContainerId = `${SUBJECT}-${LIST_CONTAINER}`;
			domManipulation.addHTMLStringToDomById(
				subjectListContainerId,
				subjectListHTML,
			);
			this._subjectEventListener(subjects);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectCallback(newSubject) {
		try {
			const subject = this._subjectAPI.addSubject(newSubject);
			this.addNewSubjectComponent(subject);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_setNewCurrentSubject(subject) {
		this._unsetCurrentSubject();
		this._currentSubject = subject;
		// load courses
	}

	_unsetCurrentSubject() {
		if (isValueNull(this._currentSubject)) {
			return;
		}
		const id = this._currentSubject[DBSubjectConstants.ID];
		const order = this._currentSubject[DBSubjectConstants.ORDER];
		const subjectElement = document.getElementById(
			`${SUBJECT}-${order}__${id}`,
		);
		subjectElement.classList.remove(SUBJECT_ACTIVE_LIST_BUTTON);
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

	_subjectEventListener(subjects) {
		try {
			for (const subject of subjects) {
				const id = subject[DBSubjectConstants.ID];
				const order = subject[DBSubjectConstants.ORDER];
				const subjectElement = document.getElementById(
					`${SUBJECT}-${order}__${id}`,
				);
				subjectElement.addEventListener("click", () => {
					subjectElement.classList.add(SUBJECT_ACTIVE_LIST_BUTTON);
					this._setNewCurrentSubject(subject);
				});
			}
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
