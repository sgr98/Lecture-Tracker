import {
	HTMLAttributesConstants,
	HTMLSubjectAttributesConstants,
	DisplayText,
} from "../../constants/HTMLConstants.js";
import { DBSubjectConstants } from "../../constants/DBConstants.js";

import { domManipulation } from "../../utils/domManipulation.js";
import { handler } from "../../utils/handler.js";
import { isStringNullOrWhiteSpace, isValueNull } from "../../utils/common.js";
import { Controller } from "../controller.js";

import { ListSectionListContainerView } from "../common/listSection/listSection.view.js";

const {
	LIST_CONTAINER,
	LIST_LOADING_OVERLAY,
	LIST_INNER_CONTAINER,
	LIST_DRAG_BUTTON,
	LIST_DELETE_BUTTON,
	LIST_BUTTON_DELETION_SELECTED,
	LIST_DELETE_BUTTON_SELECTED,
} = HTMLAttributesConstants;
const {
	SUBJECT,
	SUBJECT_ACTIVE_LIST_BUTTON,
	NO_SUBJECTS_IN_LIST_MESSAGE_CONTAINER,
} = HTMLSubjectAttributesConstants;
const { DRAG_ICON, DELETE_ICON } = DisplayText.general;
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
			const subjects = this._subjectData.refreshSubjects();
			domManipulation.removeAllChildrenById(
				`${SUBJECT}-${LIST_CONTAINER}`,
			);
			this._addSubjectsToDom(subjects);
			this._removeLoadingOverlay();
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
	}

	_subjectEventListener(subject) {
		try {
			const id = subject[DBSubjectConstants.ID];
			const order = subject[DBSubjectConstants.ORDER];
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
				subject[DBSubjectConstants.ID] ===
					this._currentSubject[DBSubjectConstants.ID]
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
			const id = this._currentSubject[DBSubjectConstants.ID];
			const order = this._currentSubject[DBSubjectConstants.ORDER];
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

	_setSubjectDeleteEventListener(subject) {
		try {
			const id = subject[DBSubjectConstants.ID];
			const order = subject[DBSubjectConstants.ORDER];
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

			const buttonWidth = toEnter
				? "var(--list-section-edit-buttons-width)"
				: "0";
			const buttonBorder = toEnter
				? "1px solid var(--border-black)"
				: "none";
			const dragButtonText = toEnter ? DRAG_ICON : "";
			const deleteButtonText = toEnter ? DELETE_ICON : "";

			const subjects = this._subjectData.subjects;
			for (const subject of subjects) {
				const id = subject[DBSubjectConstants.ID];
				const order = subject[DBSubjectConstants.ORDER];
				const subjectListDragButton = document.getElementById(
					this._getSubjectDomId(LIST_DRAG_BUTTON, order, id),
				);
				const subjectListDeleteButton = document.getElementById(
					this._getSubjectDomId(LIST_DELETE_BUTTON, order, id),
				);

				subjectListDragButton.style.width = buttonWidth;
				subjectListDeleteButton.style.width = buttonWidth;
				subjectListDragButton.style.borderRight = buttonBorder;
				subjectListDeleteButton.style.borderLeft = buttonBorder;
				subjectListDragButton.children[0].textContent = dragButtonText;
				subjectListDeleteButton.children[0].textContent =
					deleteButtonText;
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

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
