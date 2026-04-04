import { HTMLAttributesConstants } from "../../../constants/HTMLConstants.js";
import { domManipulation } from "../../../utils/domManipulation.js";
import { handler } from "../../../utils/handler.js";

const { LIST_DRAGGING, LIST_DRAGGING_ACTIVE } = HTMLAttributesConstants;

export const listDragEvent = {
	addEventListeners(listId, listItemClass, triggerConditionCallback) {
		try {
			const draggableListContainer = document.getElementById(listId);
			if (!domManipulation.isElementInDOM(draggableListContainer)) {
				return;
			}
			const boxTopBottomRelPos = {
				top: null,
				bottom: null,
			};

			draggableListContainer.addEventListener("dragstart", (e) => {
				if (!triggerConditionCallback()) {
					return;
				}
				const item = e.target.closest(`.${listItemClass}`);
				if (domManipulation.isElementInDOM(item)) {
					const mouseY = e.clientY;
					const itemBox = item.getBoundingClientRect();
					boxTopBottomRelPos.top = mouseY - itemBox.top;
					boxTopBottomRelPos.bottom = mouseY - itemBox.bottom;

					item.classList.add(LIST_DRAGGING);
					// IMPORTANT: BROWSER NEEDS A TINY DELAY
					setTimeout(
						() => item.classList.add(LIST_DRAGGING_ACTIVE),
						0,
					);
				}
			});

			draggableListContainer.addEventListener("dragend", (e) => {
				if (!triggerConditionCallback()) {
					return;
				}
				boxTopBottomRelPos.top = null;
				boxTopBottomRelPos.bottom = null;
				const item = e.target.closest(`.${listItemClass}`);
				if (domManipulation.isElementInDOM(item)) {
					item.classList.remove(LIST_DRAGGING, LIST_DRAGGING_ACTIVE);
				}
			});

			draggableListContainer.addEventListener("dragover", (e) => {
				if (!triggerConditionCallback()) {
					return;
				}
				e.preventDefault(); // Required to allow drop

				const draggable = draggableListContainer.querySelector(
					`.${LIST_DRAGGING}`,
				);
				if (!domManipulation.isElementInDOM(draggable)) {
					return;
				}

				const mouseY = e.clientY;
				const dragBoxPos = {
					top: mouseY - boxTopBottomRelPos.top,
					bottom: mouseY - boxTopBottomRelPos.bottom,
				};

				let afterElement = null;

				const siblings = [
					...draggableListContainer.querySelectorAll(
						`.${listItemClass}:not(.${LIST_DRAGGING})`,
					),
				];
				for (let sibling of siblings) {
					const centreLine = (dragBoxPos.top + dragBoxPos.bottom) / 2;
					const box = sibling.getBoundingClientRect();

					const topOffset = centreLine - box.top;
					const bottomOffset = centreLine - box.bottom;
					const crossoverOffset = topOffset * bottomOffset;

					const boxCentreLine = box.top + box.height / 2;
					const offset = centreLine - boxCentreLine;

					if (crossoverOffset < 0 && offset < 0) {
						afterElement = sibling.nextSibling;
						break;
					} else if (crossoverOffset < 0 || offset < 0) {
						afterElement = sibling;
						break;
					}
				}

				if (afterElement == null) {
					draggableListContainer.appendChild(draggable);
				} else {
					draggableListContainer.insertBefore(
						draggable,
						afterElement,
					);
				}
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	},
};
