import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { localStorageDB } from "../../utils/localStorageDB.js";
import {
	getStringValueOrDefault,
	getArrayValueOrDefault,
} from "../../utils/common.js";
import { errorPopupController } from "../popup/popup.controller.js";

const checkSubject = (subject) => {};

const createSubject = (
	subjectName,
	subjectCode,
	subjectDescription = "",
	courseList = [],
	order,
) => {
	const subject = {};
	subject[DBSubjectConstants.ID] = crypto.randomUUID();
	subject[DBSubjectConstants.SUBJECT_NAME] =
		getStringValueOrDefault(subjectName);
	subject[DBSubjectConstants.SUBJECT_CODE] =
		getStringValueOrDefault(subjectCode);
	subject[DBSubjectConstants.SUBJECT_DESCRIPTION] =
		getStringValueOrDefault(subjectDescription);
	subject[DBSubjectConstants.COURSE_LIST] =
		getArrayValueOrDefault(courseList);
	subject[DBSubjectConstants.ORDER] = order;
	return subject;
};

const getCurrentSubjectId = () => {
	try {
		return localStorageDB.getNumberOrString(
			DBSubjectConstants.CURRENT_SUBJECT,
		);
	} catch (error) {
		console.error(error);
		errorPopupController.open(error);
		return null;
	}
};

const setCurrentSubjectId = (id) => {
	try {
		localStorageDB.setNumberOrString(
			DBSubjectConstants.CURRENT_SUBJECT,
			id,
		);
	} catch (error) {
		console.error(error);
		errorPopupController.open(error);
	}
};

const getSubjects = () => {
	try {
		let subjectList = localStorageDB.getJSON(
			DBSubjectConstants.SUBJECT_LIST,
		);
		subjectList = getArrayValueOrDefault(subjectList);
		return subjectList;
	} catch (error) {
		console.error(error);
		errorPopupController.open(error);
		return [];
	}
};

const getSubjectById = (id) => {
	const subjects = getSubjects();
	return subjects.find((subject) => subject.id === id);
};

const addSubject = (subject) => {
	try {
		const { subjectName, subjectCode, subjectDescription, courseList } =
			subject;
		const subjects = getSubjects();
		const numberOfExistingSubjects = subjects.length;

		const formedSubject = createSubject(
			subjectName,
			subjectCode,
			subjectDescription,
			courseList,
			numberOfExistingSubjects,
		);
		subjects.push(formedSubject);
		localStorageDB.setJSON(DBSubjectConstants.SUBJECT_LIST, subjects);
	} catch (error) {
		console.error(error);
		errorPopupController.open(error);
	}
};

export const subjectModel = {
	getCurrentSubjectId,
	setCurrentSubjectId,
	getSubjects,
	getSubjectById,
	addSubject,
};
