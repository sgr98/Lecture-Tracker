import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	HTMLModalAttributesConstants,
	ElementModuleName,
} from "../../constants/HTMLConstants.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { domManipulation } from "../../utils/domManipulation.js";
import { AddSubjectModalController } from "./addSubjectModal/addSubjectModal.controller.js";

import { SubjectAPI } from "./subjects.api.js";
import {
	SubjectSectionView,
	SubjectActionView,
	SubjectListContainerView,
} from "./subjects.view.js";
import { Controller } from "../controller.js";
import { handler } from "../../utils/handler.js";
import { isValueNull } from "../../utils/common.js";

const { STAGE, LIST_CONTAINER, LIST_INNER_CONTAINER } = HTMLAttributesConstants;
const {
	SUBJECT,
	SUBJECT_ACTIVE_LIST_BUTTON,
	SUBJECT_ACTION_CONTAINER,
	ADD_SUBJECT_BUTTON,
	NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
} = HTMLSubjectAttributesConstants;
const { MODAL } = HTMLModalAttributesConstants;
const { ADD_SUBJECT_MODAL_MODULE, ADD_SUBJECT_MODULE } = ElementModuleName;

export class SubjectActionController extends Controller {
	constructor(moduleName, subjectAPI, addNewSubjectToListCallback) {
		super(moduleName);
		this._subjectActionView = new SubjectActionView(moduleName);
		this._subjectAPI = subjectAPI;
		this._addNewSubjectToListCallback = addNewSubjectToListCallback;
		this._addSubjectModalController = new AddSubjectModalController(
			ADD_SUBJECT_MODAL_MODULE,
			(newSubject) => {
				this._addSubjectCallback(newSubject);
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
			const subjectActionHTML = this._subjectActionView.generateHTML();
			domManipulation.addHTMLStringToDomById(
				SUBJECT_ACTION_CONTAINER,
				subjectActionHTML,
			);
			this._addSubjectModalController.addComponent();
			this.addEventListeners();
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
			// NOTE: ADD LOGIC TO CHECK IF MODAL IS ADDED OR NOT
			const addSubjectButton =
				document.getElementById(ADD_SUBJECT_BUTTON);
			const addSubjectModal = document.getElementById(
				`${ADD_SUBJECT_MODULE}-${MODAL}`,
			);
			addSubjectButton.addEventListener("click", () => {
				addSubjectModal.style.display = "flex";
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectCallback(newSubject) {
		try {
			const subject = this._addSubjectToDB(newSubject);
			this._addNewSubjectToListCallback(subject);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectToDB(newSubject) {
		try {
			const subject = this._subjectAPI.addSubject(newSubject);
			return subject;
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}

export class SubjectListContainerController extends Controller {
	constructor(moduleName, subjectAPI) {
		super(moduleName);
		this._currentSubject = null;
		this._subjectAPI = subjectAPI;
		this._subjectListContainerView = new SubjectListContainerView(
			moduleName,
		);
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Components
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addComponent() {
		try {
			const subjects = this._subjectAPI.getSubjects();
			const subjectListHTML =
				this._subjectListContainerView.generateHTML(subjects);
			const subjectListContainerId = `${SUBJECT}-${LIST_CONTAINER}`;
			domManipulation.addHTMLStringToDomById(
				subjectListContainerId,
				subjectListHTML,
			);
			this._subjectListEventListener(subjects);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	addItemComponent(newSubject) {
		try {
			const isListEmpty = domManipulation.isElementInDOM(
				NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
			);
			const newSubjectHTML =
				this._subjectListContainerView.generateNewSubjectHTML(
					newSubject,
					isListEmpty,
				);
			if (isListEmpty) {
				domManipulation.removeElementById(
					NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
				);
				const subjectListContainerId = `${SUBJECT}-${LIST_CONTAINER}`;
				domManipulation.addHTMLStringToDomById(
					subjectListContainerId,
					newSubjectHTML,
				);
			} else {
				const subjectListInnerContainerId = `${SUBJECT}-${LIST_INNER_CONTAINER}`;
				domManipulation.addHTMLStringToDomById(
					subjectListInnerContainerId,
					newSubjectHTML,
				);
			}
			// NOTE: Check if the subject is added
			this._subjectEventListener(newSubject);
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

	_subjectListEventListener(subjects) {
		try {
			for (const subject of subjects) {
				this._subjectEventListener(subject);
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_subjectEventListener(subject) {
		try {
			const id = subject[DBSubjectConstants.ID];
			const order = subject[DBSubjectConstants.ORDER];
			const subjectElement = document.getElementById(
				`${SUBJECT}-${order}__${id}`,
			);
			subjectElement.addEventListener("click", () => {
				subjectElement.classList.add(SUBJECT_ACTIVE_LIST_BUTTON);
				this._setNewCurrentSubject(subject);
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_setNewCurrentSubject(subject) {
		try {
			// NOTE: Add logic to check if the new current subject is same as old current subejct
			this._unsetCurrentSubject();
			this._currentSubject = subject;
			// NOTE: load courses
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_unsetCurrentSubject() {
		try {
			if (isValueNull(this._currentSubject)) {
				return;
			}
			const id = this._currentSubject[DBSubjectConstants.ID];
			const order = this._currentSubject[DBSubjectConstants.ORDER];
			const subjectElement = document.getElementById(
				`${SUBJECT}-${order}__${id}`,
			);
			subjectElement.classList.remove(SUBJECT_ACTIVE_LIST_BUTTON);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}

export class SubjectController extends Controller {
	constructor(moduleName) {
		super(moduleName);
		this._subjectAPI = new SubjectAPI();
		this._subjectSectionView = new SubjectSectionView(moduleName);
		this._subjectActionController = new SubjectActionController(
			moduleName,
			this._subjectAPI,
			(newSubject) => {
				this._addNewSubjectToListCallback(newSubject);
			},
		);
		this._subjectListContainerController =
			new SubjectListContainerController(moduleName, this._subjectAPI);
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Components
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addComponent() {
		try {
			this._addSubjectSectionComponent();
			this._subjectActionController.addComponent();
			this._subjectListContainerController.addComponent();
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

	_addNewSubjectToListCallback(newSubject) {
		try {
			this._subjectListContainerController.addItemComponent(newSubject);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
