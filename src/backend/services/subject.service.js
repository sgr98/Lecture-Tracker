import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { BackendErrorConstants } from "../../constants/ErrorConstants.js";
import {
	isStringNullOrEmpty,
	isStringNullOrWhiteSpace,
	convertJSONToCustomArray,
} from "../../utils/common.js";
import { localStorageService } from "./localStorage.service.js";
import { Subject } from "../models/subject.model.js";
import { Result } from "../result.js";

const {
	INVALID_SUBJECT_ID,
	INVALID_SUBJECT_NAME,
	INVALID_SUBJECT_CODE,
	INVALID_SUBJECT_DESCRIPTION,
	INVALID_COURSE_LIST,
} = BackendErrorConstants;

const isSubjectIdInvalid = (subjectId) => {
	return isStringNullOrWhiteSpace(subjectId);
};

const isSubjectValid = ({
	subjectName,
	subjectCode,
	subjectDescription,
	courseList,
}) => {
	let errorMessage = "";
	const isSubjectNameInvalid =
		typeof subjectName !== "string" &&
		isStringNullOrWhiteSpace(subjectName);
	const isSubjectCodeInvalid =
		typeof subjectCode !== "string" &&
		isStringNullOrWhiteSpace(subjectCode);
	const isSubjectDescriptionInvalid = typeof subjectDescription !== "string";
	const isCourseListInvalid = !Array.isArray(courseList);

	if (isSubjectNameInvalid) {
		errorMessage += INVALID_SUBJECT_NAME + " ";
	}
	if (isSubjectCodeInvalid) {
		errorMessage += INVALID_SUBJECT_CODE + " ";
	}
	if (isSubjectDescriptionInvalid) {
		errorMessage += INVALID_SUBJECT_DESCRIPTION + " ";
	}
	if (isCourseListInvalid) {
		errorMessage += INVALID_COURSE_LIST + " ";
	}
	if (!isStringNullOrEmpty(errorMessage)) {
		return Result.fail(errorMessage, 400);
	}
	return Result.success(true, 200);
};

const filterSubjects = (subjects, filterIds) => {
	return subjects.filter((subject) => {
		return !filterIds.includes(subject[DBSubjectConstants.ID]);
	});
};

const saveSubjectsToDB = (subjects) => {
	const saveSubjectsResult = localStorageService.setJSON(
		DBSubjectConstants.SUBJECT_LIST,
		subjects,
	);
	return saveSubjectsResult;
};

export const subjectService = {
	getSubjects: () => {
		let subjectListResult = localStorageService.getJSON(
			DBSubjectConstants.SUBJECT_LIST,
		);
		if (!subjectListResult.success) {
			return subjectListResult;
		}

		const subjectList =
			convertJSONToCustomArray(subjectListResult.value, Subject) ?? [];
		return Result.success([...subjectList], 200);
	},

	getSubjectById: (subjectId) => {
		if (isSubjectIdInvalid(subjectId)) {
			return Result.fail(INVALID_SUBJECT_ID, 400);
		}

		const subjectsResult = subjectService.getSubjects();
		if (!subjectsResult.success) {
			return subjectsResult;
		}
		const subjects = subjectsResult.value;

		const subject = subjects.find(
			(subject) => subject[DBSubjectConstants.ID] === subjectId,
		);
		return Result.success(subject, 200);
	},

	addSubject: (subject) => {
		const isSubjectValidResult = isSubjectValid(subject);
		if (!isSubjectValidResult.success) {
			return isSubjectValidResult;
		}

		const { subjectName, subjectCode, subjectDescription, courseList } =
			subject;
		const subjectsResult = subjectService.getSubjects();
		if (!subjectsResult.success) {
			return subjectsResult;
		}
		const subjects = subjectsResult.value;
		// const numberOfExistingSubjects = subjects.length;
		const newSubject = new Subject({
			id: null,
			subjectName,
			subjectCode,
			subjectDescription,
			courseList,
			// order: numberOfExistingSubjects,
		});

		subjects.push(newSubject);
		const saveSubjectResult = saveSubjectsToDB(subjects);
		if (!saveSubjectResult.success) {
			return saveSubjectResult;
		}
		return Result.success(newSubject, 201);
	},

	editSubjectById(subjectId, newSubject) {
		// ...
	},

	deleteSubjectByIds(subjectIds) {
		const subjectsResult = subjectService.getSubjects();
		if (!subjectsResult.success) {
			return subjectsResult;
		}
		const subjects = subjectsResult.value;

		const newSubjects = filterSubjects(subjects, subjectIds);

		const saveSubjectResult = saveSubjectsToDB(newSubjects);
		if (!saveSubjectResult.success) {
			return saveSubjectResult;
		}
		return Result.success(newSubjects, 201);
	},

	deleteAllSubjects() {
		const result = localStorageService.deleteKeys([
			DBSubjectConstants.SUBJECT_LIST,
		]);
		return result;
	},
};
