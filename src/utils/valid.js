import { DBSubjectConstants } from "../constants/DBConstants.js";
import { isStringNullOrWhiteSpace } from "./common.js";

export const isInvalidSubject = {
	id: (subjectId) => {
		return isStringNullOrWhiteSpace(subjectId);
	},

	name: (subjectName) => {
		return (
			typeof subjectName !== "string" ||
			isStringNullOrWhiteSpace(subjectName)
		);
	},

	code: (subjectCode) => {
		return (
			typeof subjectCode !== "string" ||
			isStringNullOrWhiteSpace(subjectCode)
		);
	},

	description: (subjectDescription) => {
		return typeof subjectDescription !== "string";
	},

	courseList: (subjectCourseList) => {
		return !Array.isArray(subjectCourseList);
	},

	fullWithoutId: (subject) => {
		return (
			isInvalidSubject.name(subject[DBSubjectConstants.SUBJECT_NAME]) ||
			isInvalidSubject.code(subject[DBSubjectConstants.SUBJECT_CODE]) ||
			isInvalidSubject.description(
				subject[DBSubjectConstants.SUBJECT_DESCRIPTION],
			) ||
			isInvalidSubject.courseList(subject[DBSubjectConstants.COURSE_LIST])
		);
	},

	full: (subject) => {
		return (
			isInvalidSubject.id(subject[DBSubjectConstants.ID]) ||
			isInvalidSubject.fullWithoutId(subject)
		);
	},
};
