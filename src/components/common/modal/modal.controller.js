import {
	HTMLAttributesConstants,
	HTMLModalAttributesConstants,
} from "../../../constants/HTMLConstants.js";
import { addHTMLStringToDomById } from "../../../utils/domManipulation.js";
import { handler } from "../../../utils/handler.js";
import { ModalView } from "./modal.view.js";

const { MODAL, CLOSE } = HTMLModalAttributesConstants;
const { ROOT } = HTMLAttributesConstants;

export const modalController = {
	addModal: (moduleName, title, description = "", fields = []) => {
		try {
			const modalView = new ModalView(
				moduleName,
				title,
				description,
				fields,
			);
			const modalHTML = modalView.generateHTML();
			addHTMLStringToDomById(ROOT, modalHTML);
			modalController.addCommonModalEventListeners(moduleName);
		} catch (error) {
			handler.errorWithPopup(error);
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
			handler.errorWithPopup(error);
		}
	},
};
