import { HTMLPopupTypeEnum } from "./utils/enum.js";
import { subjectController } from "./components/subjects/subjects.controller.js";
import {
	alertPopupController,
	infoPopupController,
	warningPopupController,
	errorPopupController,
	successPopupController,
	multiplePopupsController,
} from "./components/common/popup/popup.controller.js";
import { TopbarController } from "./components/topbar/topbar.controller.js";

export class App {
	constructor() {
		this._topbarController = new TopbarController("topbar")
	}

	start() {
		console.log("App started");
		this._topbarController.addComponent();
		subjectController.init();
	}
}

export const app = {
	init: () => {
		// To be performed when the app is run for the very first time and no data exists in local storage
		// Initialize the local storage data
		// set a flag to indicate first time run
	},

	start: () => {


		// alertPopupController.open(
		//     "Placeholder test description added here for testing 1",
		// );
		// infoPopupController.open(
		//     "Placeholder test description added here for testing 2",
		// );
		// warningPopupController.open(
		//     "Placeholder test description added here for testing 3",
		// );
		// errorPopupController.open(
		//     "Placeholder test description added here for testing 4",
		// );
		// successPopupController.open(
		//     "Placeholder test description added here for testing 5",
		// );

		// multiplePopupsController.open([
		//     {
		//         popupType: HTMLPopupTypeEnum.Alert,
		//         description:
		//             "Placeholder test description added here for testing 1",
		//     },
		//     {
		//         popupType: HTMLPopupTypeEnum.Info,
		//         description:
		//             "Placeholder test description added here for testing 2",
		//     },
		//     {
		//         popupType: HTMLPopupTypeEnum.Warning,
		//         description:
		//             "Placeholder test description added here for testing 3",
		//     },
		//     {
		//         popupType: HTMLPopupTypeEnum.Error,
		//         description:
		//             "Placeholder test description added here for testing 4",
		//     },
		//     {
		//         popupType: HTMLPopupTypeEnum.Success,
		//         description:
		//             "Placeholder test description added here for testing 5",
		//     },
		// ]);
	},
};
