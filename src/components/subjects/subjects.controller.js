import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	ElementModuleName,
} from "../../constants/HTMLConstants.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { domManipulation } from "../../utils/domManipulation.js";
import { AddSubjectModalController } from "./addSubjectModal/addSubjectModal.controller.js";

import { SubjectAPI } from "./subjects.api.js";
import {
	SubjectSectionView,
	SubjectListContainerView,
} from "./subjects.view.js";
import { Controller } from "../controller.js";
import { handler } from "../../utils/handler.js";
import { isValueNull } from "../../utils/common.js";

const { STAGE, LIST_CONTAINER, LIST_INNER_CONTAINER } = HTMLAttributesConstants;
const {
	SUBJECT,
	SUBJECT_ACTIVE_LIST_BUTTON,
	NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
} = HTMLSubjectAttributesConstants;
const { ADD_SUBJECT_MODAL_MODULE } = ElementModuleName;

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
			this._addSubjectSectionComponent();
			this._addSubjectListContainerComponent();
			this._addSubjectModalController.addComponent();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	addNewSubjectComponent(newSubject) {
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
		try {
		this._unsetCurrentSubject();
		this._currentSubject = subject;
		// load courses
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
