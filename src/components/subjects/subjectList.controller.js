import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	ElementModuleName,
	DisplayText,
} from "../../constants/HTMLConstants.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";

import { domManipulation } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";
import { isStringNullOrWhiteSpace, isValueNull } from "../../utils/common.js";
import { listDragEvent } from "../common/utils/dragEventListeners.js";
import { Controller } from "../controller.js";

import { ListSectionListContainerView } from "../common/listSection/listSection.view.js";
import { EditSubjectModalController } from "./editSubjectModal/editSubjectModal.controller.js";

const {
	LIST_CONTAINER,
	LIST_LOADING_OVERLAY,
	LIST_INNER_CONTAINER,
	LIST_BUTTON_CONTAINER,
	LIST_EDIT_BUTTON,
	LIST_DELETE_BUTTON,
	LIST_BUTTON_DELETION_SELECTED,
	LIST_DELETE_BUTTON_SELECTED,
} = HTMLAttributesConstants;
const {
	SUBJECT,
	SUBJECT_ACTIVE_LIST_BUTTON,
	NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
} = HTMLSubjectAttributesConstants;
const { EDIT_SUBJECT_MODAL_MODULE } = ElementModuleName;
const { EDIT_ICON, DELETE_ICON } = DisplayText.general;
const { NO_SUBJECTS_MESSAGE } = DisplayText.subject;

export class SubjectListContainerController extends Controller {
	constructor(moduleName, subjectData) {
		super(moduleName);
		this._currentSubject = null;
		this._editMode = false;
		this._subjectData = subjectData;
		this._subjectListContainerView = new ListSectionListContainerView(
			moduleName,
			NO_SUBJECTS_MESSAGE,
			{
				id: DBSubjectConstants.ID,
				name: DBSubjectConstants.SUBJECT_NAME,
				order: DBSubjectConstants.ORDER,
			},
		);
	}

	get editMode() {
		return this._editMode;
	}

	set editMode(edit) {
		this._editMode = false;
		if (typeof edit === "boolean") {
			this._editMode = edit;
		}
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Components
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addComponent() {
		try {
			this._addLoadingOverlay();
			const subjects = this._subjectData.subjects;
			this._addSubjectsToDom(subjects);
			this._removeLoadingOverlay();
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
				this._subjectListContainerView.generateNewItemHTML(
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
			this._addSubjectEventListeners(newSubject);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	refreshSubjectsListSection() {
		try {
			this._addLoadingOverlay();
			setTimeout(() => {
				const subjects = this._subjectData.refreshSubjects();
				domManipulation.removeAllChildrenById(
					`${SUBJECT}-${LIST_CONTAINER}`,
				);
				this._addSubjectsToDom(subjects);
				this._removeLoadingOverlay();
			}, 500);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectsToDom(subjects) {
		try {
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

	_addLoadingOverlay() {
		try {
			const loadingOverlayId = `${SUBJECT}-${LIST_LOADING_OVERLAY}`;
			if (domManipulation.isElementInDOM(loadingOverlayId)) {
				return;
			}

			const subjectListContainerId = `${SUBJECT}-${LIST_CONTAINER}`;
			const loadingOverlayHTML =
				this._subjectListContainerView.generateLoadingOverlayHTML();
			domManipulation.addHTMLStringToDomById(
				subjectListContainerId,
				loadingOverlayHTML,
			);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_removeLoadingOverlay() {
		try {
			const loadingOverlayId = `${SUBJECT}-${LIST_LOADING_OVERLAY}`;
			domManipulation.removeElementById(loadingOverlayId);
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
			this._subjectDragEventListener();
			for (const subject of subjects) {
				this._addSubjectEventListeners(subject);
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectEventListeners(subject) {
		this._subjectEventListener(subject);
		this._setSubjectDeleteEventListener(subject);
		this._setSubjectEditEventListener(subject);
	}

	_subjectEventListener(subject) {
		try {
			const { id, order } = subject;
			const subjectElement = document.getElementById(
				this._getSubjectDomId(null, order, id),
			);
			if (domManipulation.isElementInDOM(subjectElement)) {
				subjectElement.addEventListener("click", () => {
					if (!this._editMode) {
						subjectElement.classList.add(
							SUBJECT_ACTIVE_LIST_BUTTON,
						);
						this._setNewCurrentSubject(subject);
					}
				});
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_setNewCurrentSubject(subject) {
		try {
			if (
				!isValueNull(this._currentSubject) &&
				subject.id === this._currentSubjectsubject.id
			) {
				return;
			}
			this._unsetCurrentSubject();
			this._currentSubject = subject;
			// TODO: load courses
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_unsetCurrentSubject() {
		try {
			if (isValueNull(this._currentSubject)) {
				return;
			}
			const { id, order } = this._currentSubject;
			const subjectElement = document.getElementById(
				this._getSubjectDomId(null, order, id),
			);
			subjectElement.classList.remove(SUBJECT_ACTIVE_LIST_BUTTON);
			this._currentSubject = null;
			// TODO: Unload courses section
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_setSubjectEditEventListener(subject) {
		try {
			const { id, order } = subject;
			const subjectEditButton = document.getElementById(
				this._getSubjectDomId(LIST_EDIT_BUTTON, order, id),
			);
			if (!domManipulation.isElementInDOM(subjectEditButton)) {
				return;
			}
			subjectEditButton.addEventListener("click", () => {
				const editSubjectModalController =
					new EditSubjectModalController(
						EDIT_SUBJECT_MODAL_MODULE,
						subject,
						(editSubject) => {
							subject.edits = editSubject;
							this._updateSubjectNameOfElement(
								editSubject.subjectName,
								order,
							);
						},
					);
				editSubjectModalController.addComponent();
				editSubjectModalController.open();
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_setSubjectDeleteEventListener(subject) {
		try {
			const { id, order } = subject;
			const subjectDeleteButton = document.getElementById(
				this._getSubjectDomId(LIST_DELETE_BUTTON, order, id),
			);
			subjectDeleteButton.addEventListener("click", () => {
				const subjectElement = document.getElementById(
					this._getSubjectDomId(null, order, id),
				);
				subjectElement.classList.toggle(LIST_BUTTON_DELETION_SELECTED);
				subjectDeleteButton.classList.toggle(
					LIST_DELETE_BUTTON_SELECTED,
				);
				subject.isSelectedForDeletion = !subject.isSelectedForDeletion;
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	enterExitEditMode(toEnter) {
		try {
			toEnter = toEnter ?? false;
			this._editMode = toEnter;
			this._unsetCurrentSubject();

			const editModeCursor = toEnter ? "grab" : "default";
			const buttonWidth = toEnter
				? "var(--list-section-edit-buttons-width)"
				: "0";
			const buttonBorder = toEnter
				? "1px solid var(--border-black)"
				: "none";
			const editButtonText = toEnter ? EDIT_ICON : "";
			const deleteButtonText = toEnter ? DELETE_ICON : "";

			const subjects = this._subjectData.subjects;
			for (const subject of subjects) {
				const { id, order } = subject;
				const subjectContainer = document.getElementById(
					this._getSubjectDomId(LIST_BUTTON_CONTAINER, order, id),
				);
				const subjectListEditButton = document.getElementById(
					this._getSubjectDomId(LIST_EDIT_BUTTON, order, id),
				);
				const subjectListDeleteButton = document.getElementById(
					this._getSubjectDomId(LIST_DELETE_BUTTON, order, id),
				);

				subjectContainer.style.cursor = editModeCursor;
				subjectListEditButton.style.width = buttonWidth;
				subjectListDeleteButton.style.width = buttonWidth;
				subjectListEditButton.style.borderRight = buttonBorder;
				subjectListDeleteButton.style.borderLeft = buttonBorder;
				subjectListEditButton.children[0].textContent = editButtonText;
				subjectListDeleteButton.children[0].textContent =
					deleteButtonText;
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_subjectDragEventListener() {
		try {
			const listInnerContainerId = `${SUBJECT}-${LIST_INNER_CONTAINER}`;
			const itemContainerClass = `${SUBJECT}-${LIST_BUTTON_CONTAINER}`;
			listDragEvent.addEventListeners(
				listInnerContainerId,
				itemContainerClass,
				() => {
					return this._editMode;
				},
			);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_updateSubjectNameOfElement(subjectName, order) {
		try {
			const subjectElementId = this._getSubjectDomId(null, order);
			const subjectElement = document.getElementById(subjectElementId);
			if (!domManipulation.isElementInDOM(subjectElement)) {
				return;
			}

			const subjectSpan = subjectElement.querySelector("span");
			if (!domManipulation.isElementInDOM(subjectSpan)) {
				return;
			}
			subjectSpan.textContent = subjectName;
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Utilities
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	// NOTE: In a previous version, id was used in element Id,
	// not going to remove it right away as it can be used again in the future
	_getSubjectDomId(component, order, id) {
		if (isStringNullOrWhiteSpace(component)) {
			return `${SUBJECT}-${order}`;
		} else {
			return `${SUBJECT}-${component}-${order}`;
		}
	}
}
