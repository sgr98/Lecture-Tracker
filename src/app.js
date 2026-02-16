import { HTMLPopupTypeEnum } from "./utils/enum.js";
import { ElementModuleName } from "./constants/HTMLConstants.js";
import {
	alertPopupController,
	infoPopupController,
	warningPopupController,
	errorPopupController,
	successPopupController,
	multiplePopupsController,
} from "./components/common/popup/popup.controller.js";
import { TopbarController } from "./components/topbar/topbar.controller.js";
import { StageController } from "./components/stage/stage.controller.js";
import { SubjectController } from "./components/subjects/subjects.controller.js";
import { CourseController } from "./components/courses/courses.controller.js";
import { LectureController } from "./components/lectures/lectures.controller.js";

const {
	TOPBAR_MODULE,
	STAGE_MODULE,
	SUBJECT_MODULE,
	COURSE_MODULE,
	LECTURE_MODULE,
} = ElementModuleName;

export class App {
	constructor() {
		this._topbarController = new TopbarController(TOPBAR_MODULE);
		this._stageController = new StageController(STAGE_MODULE);
		this._subjectController = new SubjectController(SUBJECT_MODULE);
		this._courseController = new CourseController(COURSE_MODULE);
		this._lectureController = new LectureController(LECTURE_MODULE);
	}

	start() {
		console.log("App started");
		this._topbarController.addComponent();
		this._stageController.addComponent();
		this._subjectController.addComponent();
		this._courseController.addComponent();
		this._lectureController.addComponent();

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
	}
}
