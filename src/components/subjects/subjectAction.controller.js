import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	HTMLModalAttributesConstants,
	ElementModuleName,
} from "../../constants/HTMLConstants.js";

import { domManipulation } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";
import { Controller } from "../controller.js";

import { SubjectActionView } from "./subjects.view.js";
import { AddSubjectModalController } from "./addSubjectModal/addSubjectModal.controller.js";

const { SUBJECT, SUBJECT_ACTION_CONTAINER } = HTMLSubjectAttributesConstants;
const { MODAL } = HTMLModalAttributesConstants;
const {
	ADD_ACTION_BUTTON,
	EDIT_ACTION_BUTTON,
	CANCEL_ACTION_BUTTON,
	SAVE_ACTION_BUTTON,
} = HTMLAttributesConstants;
const { ADD_SUBJECT_MODAL_MODULE, ADD_SUBJECT_MODULE } = ElementModuleName;

export class SubjectActionController extends Controller {
	constructor(moduleName, subjectAPI, subjectListCallbacks) {
		super(moduleName);
		this._subjectActionView = new SubjectActionView(moduleName);
		this._subjectAPI = subjectAPI;
		// _subjectListCallbacks = { addNewSubjectToListCallback, subjectListEditModeCallback }
		this._subjectListCallbacks = subjectListCallbacks;
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
			this._editSubjectEventListener();
			this._cancelSaveActionEventListener();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_openAddSubjectModalEventListener() {
		try {
			const addSubjectButton = document.getElementById(
				`${SUBJECT}-${ADD_ACTION_BUTTON}`,
			);
			const addSubjectModal = document.getElementById(
				`${ADD_SUBJECT_MODULE}-${MODAL}`,
			);
			if (
				domManipulation.areAllElementsInDOM(
					addSubjectButton,
					addSubjectModal,
				)
			) {
				addSubjectButton.addEventListener("click", () => {
					addSubjectModal.style.display = "flex";
				});
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectCallback(newSubject) {
		try {
			const subject = this._addSubjectToDB(newSubject);
			this._subjectListCallbacks.addNewSubjectToListCallback(subject);
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

	_editSubjectEventListener() {
		try {
			const editSubjectButton = document.getElementById(
				`${SUBJECT}-${EDIT_ACTION_BUTTON}`,
			);
			const subjectActionArea = document.getElementById(
				SUBJECT_ACTION_CONTAINER,
			);
			if (
				domManipulation.areAllElementsInDOM(
					editSubjectButton,
					subjectActionArea,
				)
			) {
				editSubjectButton.addEventListener("click", () => {
					this._enterExitEditMode(true);
				});
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_cancelSaveActionEventListener() {
		try {
			const cancelActionButton = document.getElementById(
				`${SUBJECT}-${CANCEL_ACTION_BUTTON}`,
			);
			const saveActionButton = document.getElementById(
				`${SUBJECT}-${SAVE_ACTION_BUTTON}`,
			);
			const subjectActionArea = document.getElementById(
				SUBJECT_ACTION_CONTAINER,
			);
			if (
				domManipulation.areAllElementsInDOM(
					cancelActionButton,
					saveActionButton,
					subjectActionArea,
				)
			) {
				cancelActionButton.addEventListener("click", () => {
					this._enterExitEditMode(false);
				});
				saveActionButton.addEventListener("click", () => {
					this._enterExitEditMode(false);
				});
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_enterExitEditMode(toEnter) {
		try {
			toEnter = toEnter ?? false;
			const subjectActionAreaTopSlide = toEnter
				? "calc(0vh - var(--section-action-row-height))"
				: "0";

			const subjectActionArea = document.getElementById(
				SUBJECT_ACTION_CONTAINER,
			);
			subjectActionArea.style.top = subjectActionAreaTopSlide;
			this._subjectListCallbacks.subjectListEditModeCallback(toEnter);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
