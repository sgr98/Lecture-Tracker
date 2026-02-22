import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	DisplayText,
} from "../../constants/HTMLConstants.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";

import { domManipulation } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";
import { isValueNull } from "../../utils/common.js";
import { Controller } from "../controller.js";

import { SubjectListContainerView } from "./subjects.view.js";

const {
	LIST_CONTAINER,
	LIST_INNER_CONTAINER,
	LIST_DRAG_BUTTON,
	LIST_DELETE_BUTTON,
} = HTMLAttributesConstants;
const {
	SUBJECT,
	SUBJECT_ACTIVE_LIST_BUTTON,
	NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
} = HTMLSubjectAttributesConstants;
const { DRAG_ICON, DELETE_ICON } = DisplayText.general;

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

			const id = newSubject[DBSubjectConstants.ID];
			const order = newSubject[DBSubjectConstants.ORDER];
			const subjectElementId = `${SUBJECT}-${order}__${id}`;
			if (domManipulation.isElementInDOM(subjectElementId)) {
				this._subjectEventListener(newSubject);
			}
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
			if (
				!isValueNull(this._currentSubject) &&
				subject[DBSubjectConstants.ID] ===
					this._currentSubject[DBSubjectConstants.ID]
			) {
				return;
			}
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

	enterExitEditMode(toEnter) {
		try {
			toEnter = toEnter ?? false;
			const buttonWidth = toEnter
				? "var(--list-section-edit-buttons-width)"
				: "0";
			const dragButtonText = toEnter ? DRAG_ICON : "";
			const deleteButtonText = toEnter ? DELETE_ICON : "";

			const subjects = this._subjectAPI.getSubjects();
			for (const subject of subjects) {
				const id = subject[DBSubjectConstants.ID];
				const order = subject[DBSubjectConstants.ORDER];
				const subjectListDragButton = document.getElementById(
					`${SUBJECT}-${LIST_DRAG_BUTTON}-${order}__${id}`,
				);
				const subjectListDeleteButton = document.getElementById(
					`${SUBJECT}-${LIST_DELETE_BUTTON}-${order}__${id}`,
				);

				subjectListDragButton.style.width = buttonWidth;
				subjectListDeleteButton.style.width = buttonWidth;
				subjectListDragButton.children[0].textContent = dragButtonText;
				subjectListDeleteButton.children[0].textContent = deleteButtonText;
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
