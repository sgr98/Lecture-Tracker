import { ErrorPopupController } from "../components/common/popup/popup.controller.js";

const STACK_TRACE = "Current stack trace:";

export const handler = {
	error: (err) => {
		console.error(err);
		console.trace(STACK_TRACE);
	},

	errorWithPopup: (err) => {
		try {
			console.error(err);
			console.trace(STACK_TRACE);
			const errorPopupController = new ErrorPopupController(err);
			errorPopupController.addComponent();
		} catch (e) {
			console.error(e);
		}
	},
};
