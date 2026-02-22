import { HTMLAttributesConstants } from "../../constants/HTMLConstants.js";

import { domManipulation } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";
import { Controller } from "../controller.js";

import { SubjectAPI } from "./subjects.api.js";
import { SubjectSectionView } from "./subjects.view.js";
import { SubjectActionController } from "./subjectAction.controller.js";
import { SubjectListContainerController } from "./subjectList.controller.js";

const { STAGE } = HTMLAttributesConstants;

export class SubjectController extends Controller {
	constructor(moduleName) {
		super(moduleName);
		this._subjectAPI = new SubjectAPI();
		this._subjectSectionView = new SubjectSectionView(moduleName);
		this._subjectActionController = new SubjectActionController(
			moduleName,
			this._subjectAPI,
			{
				addNewSubjectToListCallback: (newSubject) => {
					this._addNewSubjectToListCallback(newSubject);
				},
				subjectListEditModeCallback: (toEnter) => {
					this._subjectListEditModeCallback(toEnter);
				},
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

	_subjectListEditModeCallback(toEnter) {
		try {
			this._subjectListContainerController.enterExitEditMode(toEnter);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
