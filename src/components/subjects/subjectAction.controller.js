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
import { isValueNull } from "../../utils/common.js";

const { SUBJECT, SUBJECT_ACTION_CONTAINER } = HTMLSubjectAttributesConstants;
const { MODAL } = HTMLModalAttributesConstants;
const { ADD_ACTION_BUTTON, EDIT_ACTION_BUTTON } = HTMLAttributesConstants;
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
			const addSubjectButton = document.getElementById(
				`${SUBJECT}-${ADD_ACTION_BUTTON}`,
			);
			const addSubjectModal = document.getElementById(
				`${ADD_SUBJECT_MODULE}-${MODAL}`,
			);
			if (
				!isValueNull(addSubjectButton) &&
				!isValueNull(addSubjectModal)
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
