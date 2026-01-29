import {
	HTMLAttributesConstants,
	HTMLModalAttributesConstants,
} from "../../constants/HTMLConstants.js";
import { addHTMLStringToDOM } from "../../utils/domManipulation.js";
import { modalView } from "./modal.view.js";

const { MODAL, CLOSE } = HTMLModalAttributesConstants;
const { ROOT } = HTMLAttributesConstants;

export const modalController = {
	addModal: (moduleName, title, description = "", fields = []) => {
		try {
			const modalHTML = modalView.generateModalHTML(
				moduleName,
				title,
				description,
				fields,
			);
			addHTMLStringToDOM(ROOT, modalHTML);
			modalController.addCommonModalEventListeners(moduleName);
		} catch (error) {
			console.error(error);
			errorPopupController.open(error);
		}
	},

	addCommonModalEventListeners: (moduleName) => {
		try {
			const modal = document.getElementById(`${moduleName}-${MODAL}`);
			const closeModalButton = document.getElementById(
				`${CLOSE}-${moduleName}-${MODAL}`,
			);

			closeModalButton.addEventListener("click", () => {
				modal.style.display = "none";
			});

			modal.addEventListener("click", (event) => {
				if (event.target === modal) {
					modal.style.display = "none";
				}
			});
		} catch (error) {
			console.error(error);
			errorPopupController.open(error);
		}
	},
};
