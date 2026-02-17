import { ElementModuleName } from "./constants/HTMLConstants.js";
import {
	AlertPopupController,
	InfoPopupController,
	WarningPopupController,
	ErrorPopupController,
	SuccessPopupController,
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

		const alertPopupController = new AlertPopupController(
			"Placeholder test description added here for testing 1",
		);
		alertPopupController.addComponent();

		const infoPopupController = new InfoPopupController(
			"Placeholder test description added here for testing 1",
		);
		infoPopupController.addComponent();

		const warningPopupController = new WarningPopupController(
			"Placeholder test description added here for testing 1",
		);
		warningPopupController.addComponent();

		const errorPopupController = new ErrorPopupController(
			"Placeholder test description added here for testing 1",
		);
		errorPopupController.addComponent();

		const successPopupController = new SuccessPopupController(
			"Placeholder test description added here for testing 1",
		);
		successPopupController.addComponent();

		const successPopupController2 = new SuccessPopupController(
			"Placeholder test description added here for testing 2",
		);
		successPopupController2.addComponent();
	}
}
