import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { localStorageDB } from "../../utils/localStorageDB.js";
import {
	getStringValueOrDefault,
	getArrayValueOrDefault,
} from "../../utils/common.js";
import { handler } from "../../utils/handler.js";

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
		handler.errorWithPopup(error);
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
		handler.errorWithPopup(error);
	}
};

const getSubjects = () => {
	try {
		let subjectList = localStorageDB.getJSON(
			DBSubjectConstants.SUBJECT_LIST,
		);
		subjectList = getArrayValueOrDefault(subjectList);
		subjectList.sort(
			(a, b) => a[DBSubjectConstants.ORDER] - b[DBSubjectConstants.ORDER],
		);
		return subjectList;
	} catch (error) {
		handler.errorWithPopup(error);
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
		return formedSubject;
	} catch (error) {
		handler.errorWithPopup(error);
		return null;
	}
};

const deleteAll = () => {
	localStorageDB.deleteKeys([DBSubjectConstants.SUBJECT_LIST]);
};

export const subjectAPI = {
	getCurrentSubjectId,
	setCurrentSubjectId,
	getSubjects,
	getSubjectById,
	addSubject,
	deleteAll,
};
