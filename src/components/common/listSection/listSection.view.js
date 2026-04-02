import {
	HTMLAttributesConstants,
	DisplayText,
} from "../../../constants/HTMLConstants.js";
import { isArrayNullOrEmpty } from "../../../utils/common.js";
import { View } from "../../view.js";

const {
	SECTION_CONTAINER,
	CONTAINER,
	TITLE,
	ITEM,
	TITLE_CONTAINER,
	LIST_SECTION_CONTAINER,
	LIST_LOADING_OVERLAY,
	SECTION_TITLE_CONTAINER,
	SECTION_TITLE,
	ACTION_CONTAINER,
	SECTION_ACTION_CONTAINER,
	ACTION_INNER_CONTAINER,
	SECTION_ACTION_INNER_CONTAINER,
	SECTION_ACTION_ROW,
	ACTION_ROW_1,
	ACTION_ROW_2,
	SECTION_ACTION_ROW_1,
	SECTION_ACTION_ROW_2,
	ADD_ACTION_BUTTON,
	EDIT_ACTION_BUTTON,
	CANCEL_ACTION_BUTTON,
	SAVE_ACTION_BUTTON,
	LIST_BUTTON_CONTAINER,
	LIST_CONTAINER,
	LIST_INNER_CONTAINER,
	LIST_BUTTON,
	LIST_SECTION_EDIT_BUTTONS,
	LIST_EDIT_BUTTON,
	LIST_DELETE_BUTTON,
	BUTTON,
	SECTION_ACTION_BUTTON,
	NO_ITEMS_IN_LIST_MESSAGE_CONTAINER,
	NO_ITEMS_IN_LIST_MESSAGE,
} = HTMLAttributesConstants;
const { LOADING } = DisplayText.general;

export class ListSectionView extends View {
	constructor(moduleName, sectionTitle) {
		super(moduleName);
		this._sectionTitle = sectionTitle;
	}

	generateHTML() {
		const moduleName = this._moduleName;
		const sectionTitle = this._sectionTitle;
		const listSectionHTML = `
			<section
				id="${moduleName}-${CONTAINER}"
				class="${moduleName}-${CONTAINER} ${LIST_SECTION_CONTAINER} ${SECTION_CONTAINER}"
			>
				<div
					id="${moduleName}-${TITLE_CONTAINER}"
					class="${moduleName}-${TITLE_CONTAINER} ${SECTION_TITLE_CONTAINER}"
				>
					<span
						id="${moduleName}-${TITLE}"
						class="${moduleName}-${TITLE} ${SECTION_TITLE}"
					>
						${sectionTitle}
					</span>
				</div>

				<div
					id="${moduleName}-${ACTION_CONTAINER}"
					class="${moduleName}-${ACTION_CONTAINER} ${SECTION_ACTION_CONTAINER}"
				>
				</div>

				<div
					id="${moduleName}-${LIST_CONTAINER}"
					class="${moduleName}-${LIST_CONTAINER} ${LIST_CONTAINER}"
				>
				</div>
			</section>
		`;
		return listSectionHTML;
	}
}

export class ListSectionActionView extends View {
	constructor(moduleName, actionButtonsText) {
		super(moduleName);
		this._actionButtonsText = actionButtonsText;
	}

	generateHTML() {
		const moduleName = this._moduleName;
		const addItemButtonText = this._actionButtonsText.addItemButtonText;
		const editItemButtonText = this._actionButtonsText.editItemButtonText;
		const cancelItemButtonText =
			this._actionButtonsText.cancelItemButtonText;
		const saveItemButtonText = this._actionButtonsText.saveItemButtonText;
		const listActionHTML = `
			<div
				id="${moduleName}-${ACTION_INNER_CONTAINER}"
				class="${moduleName}-${ACTION_INNER_CONTAINER} ${SECTION_ACTION_INNER_CONTAINER}"
			>
				<div
					id="${moduleName}-${ACTION_ROW_1}"
					class="${moduleName}-${ACTION_ROW_1} ${SECTION_ACTION_ROW_1} ${SECTION_ACTION_ROW}"
				>
					<div
						id="${moduleName}-${ADD_ACTION_BUTTON}"
						class="${moduleName}-${ADD_ACTION_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${addItemButtonText}
					</div>
					<div
						id="${moduleName}-${EDIT_ACTION_BUTTON}"
						class="${moduleName}-${EDIT_ACTION_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${editItemButtonText}
					</div>
				</div>
				<div
					id="${moduleName}-${ACTION_ROW_2}"
					class="${moduleName}-${ACTION_ROW_2} ${SECTION_ACTION_ROW_2} ${SECTION_ACTION_ROW}"
				>
					<div
						id="${moduleName}-${CANCEL_ACTION_BUTTON}"
						class="${moduleName}-${CANCEL_ACTION_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${cancelItemButtonText}
					</div>
					<div
						id="${moduleName}-${SAVE_ACTION_BUTTON}"
						class="${moduleName}-${SAVE_ACTION_BUTTON} ${SECTION_ACTION_BUTTON} ${BUTTON}"
					>
						${saveItemButtonText}
					</div>
				</div>
			</div>
		`;
		return listActionHTML;
	}
}

export class ListSectionListContainerView extends View {
	constructor(moduleName, noItemsText, itemKeys) {
		super(moduleName);
		this._noItemsText = noItemsText;
		this._itemKeys = itemKeys;
	}

	generateHTML(items) {
		if (isArrayNullOrEmpty(items)) {
			return this._generateNoItemsMessageHTML();
		}
		const itemsHTML = this._generateItemsHTML(items);
		const itemListContainerHTML =
			this._generateItemListContainerHTML(itemsHTML);
		return itemListContainerHTML;
	}

	generateNewItemHTML(newItem, isFirstItem) {
		const newItemHTML = this._generateListItemHTML(newItem);
		if (isFirstItem) {
			return this._generateItemListContainerHTML(newItemHTML);
		}
		return newItemHTML;
	}

	generateLoadingOverlayHTML() {
		const moduleName = this._moduleName;
		const loadingOverlayHTML = `
			<div
				id="${moduleName}-${LIST_LOADING_OVERLAY}"
				class="${moduleName}-${LIST_LOADING_OVERLAY} ${LIST_LOADING_OVERLAY}"
			>
				<span>
					${LOADING}
				</span>
			</div>
		`;
		return loadingOverlayHTML;
	}

	_generateItemsHTML(items) {
		const itemsHTML = items
			.map((item) => {
				return this._generateListItemHTML(item);
			})
			.join("");
		return itemsHTML;
	}

	_generateListItemHTML(item) {
		const moduleName = this._moduleName;
		// const id = item[this._itemKeys.id] ?? "";
		const order = item[this._itemKeys.order] ?? 0;
		const itemName = item[this._itemKeys.name] ?? "";
		const listItemHTML = `
			<div
				id="${moduleName}-${LIST_BUTTON_CONTAINER}-${order}"
				class="${moduleName}-${LIST_BUTTON_CONTAINER} ${LIST_BUTTON_CONTAINER}"
				draggable="true"
			>
				<div
					id="${moduleName}-${LIST_EDIT_BUTTON}-${order}"
					class="${moduleName}-${LIST_EDIT_BUTTON} ${LIST_EDIT_BUTTON} ${LIST_SECTION_EDIT_BUTTONS}"
				>
					<span></span>
				</div>
				<div
					id="${moduleName}-${order}"
					class="${moduleName}-${BUTTON} ${LIST_BUTTON}"
				>
					<span>${itemName}</span>
				</div>
				<div
					id="${moduleName}-${LIST_DELETE_BUTTON}-${order}"
					class="${moduleName}-${LIST_DELETE_BUTTON} ${LIST_DELETE_BUTTON} ${LIST_SECTION_EDIT_BUTTONS}"
				>
					<span></span>
				</div>
			</div>
		`;
		return listItemHTML;
	}

	_generateItemListContainerHTML(itemsHTML) {
		const moduleName = this._moduleName;
		const itemListContainerHTML = `
			<div
				id="${moduleName}-${LIST_INNER_CONTAINER}"
				class="${moduleName}-${LIST_INNER_CONTAINER} ${LIST_INNER_CONTAINER}"
			>
				${itemsHTML}
			</div>
		`;
		return itemListContainerHTML;
	}

	_generateNoItemsMessageHTML() {
		const moduleName = this._moduleName;
		const noItemsText = this._noItemsText;
		const noItemsInListMessageContainer =
			NO_ITEMS_IN_LIST_MESSAGE_CONTAINER.replace(ITEM, moduleName);
		const noItemsInListMessage = NO_ITEMS_IN_LIST_MESSAGE.replace(
			ITEM,
			moduleName,
		);
		const noSubjectsInListHTML = `
			<div
				id="${noItemsInListMessageContainer}"
				class="${NO_ITEMS_IN_LIST_MESSAGE_CONTAINER}"
			>
				<span
					id="${noItemsInListMessage}"
					class ="${NO_ITEMS_IN_LIST_MESSAGE}"
				>
					${noItemsText}
				</span>
			</div>
		`;
		return noSubjectsInListHTML;
	}
}
