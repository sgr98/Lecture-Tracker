import { errorPopupController } from "../components/common/popup/popup.controller.js";

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
			errorPopupController.open(err);
		} catch (e) {
			console.error(e);
		}
	},
};
