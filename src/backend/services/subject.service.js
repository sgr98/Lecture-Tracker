import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { BackendErrorConstants } from "../../constants/ErrorConstants.js";
import {
	isStringNullOrEmpty,
	convertJSONToCustomArray,
	isValueNull,
} from "../../utils/common.js";
import { isInvalidSubject } from "../../utils/valid.js";
import { localStorageService } from "./localStorage.service.js";
import { Subject } from "../models/subject.model.js";
import { Result } from "../result.js";

const {
	SUBJECT_NOT_FOUND,
	INVALID_SUBJECT_ID,
	INVALID_SUBJECT_NAME,
	INVALID_SUBJECT_CODE,
	INVALID_SUBJECT_DESCRIPTION,
	INVALID_COURSE_LIST,
} = BackendErrorConstants;

const isSubjectValid = ({
	subjectName,
	subjectCode,
	subjectDescription,
	courseList,
}) => {
	let errorMessage = "";
	const isSubjectNameInvalid = isInvalidSubject.name(subjectName);
	const isSubjectCodeInvalid = isInvalidSubject.code(subjectCode);
	const isSubjectDescriptionInvalid =
		isInvalidSubject.description(subjectDescription);
	const isCourseListInvalid = isInvalidSubject.courseList(courseList);

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
	errorMessage = errorMessage.trim();
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
		if (isInvalidSubject.id(subjectId)) {
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
		if (isValueNull(subject)) {
			return Result.fail(SUBJECT_NOT_FOUND, 400);
		}
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
		// TODO: IMPLEMENT THIS
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
		return Result.success(saveSubjectResult.value, 201);
	},

	deleteAllSubjects() {
		const result = localStorageService.deleteKeys([
			DBSubjectConstants.SUBJECT_LIST,
		]);
		return result;
	},
};
