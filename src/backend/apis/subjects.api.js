import { BackendErrorConstants } from "../../constants/ErrorConstants.js";
import { Result } from "../result.js";
import { subjectService } from "../services/subject.service.js";

const { UNEXPECTED_ERROR } = BackendErrorConstants;

export const subjectAPI = {
	getSubjects: () => {
		try {
			const subjectsResult = subjectService.getSubjects();
			if (!subjectsResult.success) {
				subjectsResult.value = [];
				return subjectsResult;
			}
			return subjectsResult;
		} catch (error) {
			return Result.fail(
				`${UNEXPECTED_ERROR}: ${error.message}`,
				500,
				[],
			);
		}
	},

	getSubjectById: (subjectId) => {
		try {
			const subjectResult = subjectService.getSubjectById(subjectId);
			return subjectResult;
		} catch (error) {
			return Result.fail(
				`${UNEXPECTED_ERROR}: ${error.message}`,
				500,
				null,
			);
		}
	},

	addSubject: (subject) => {
		try {
			const addSubjectResult = subjectService.addSubject(subject);
			return addSubjectResult;
		} catch (error) {
			return Result.fail(
				`${UNEXPECTED_ERROR}: ${error.message}`,
				500,
				null,
			);
		}
	},

	editSubjectById(subjectId, newSubject) {
		try {
			return Result.fail(`Not Implemented yet`, 501, null);
		} catch (error) {
			return Result.fail(
				`${UNEXPECTED_ERROR}: ${error.message}`,
				500,
				null,
			);
		}
	},

	deleteSubjectByIds(subjectIds) {
		try {
			const deleteSubjectResult =
				subjectService.deleteSubjectByIds(subjectIds);
			return deleteSubjectResult;
		} catch (error) {
			return Result.fail(
				`${UNEXPECTED_ERROR}: ${error.message}`,
				500,
				null,
			);
		}
	},

	deleteAllSubjects() {
		try {
			const deleteSubjectsResult = subjectService.deleteAllSubjects();
			return deleteSubjectsResult;
		} catch (error) {
			return Result.fail(
				`${UNEXPECTED_ERROR}: ${error.message}`,
				500,
				null,
			);
		}
	},
};
