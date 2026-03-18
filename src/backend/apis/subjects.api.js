import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { handler } from "../../utils/handler.js";
import { isArrayNullOrEmpty, isObjectNullOrEmpty } from "../../utils/common.js";
import { localStorageDB } from "../../utils/localStorageDB.js";
import { Subject } from "../models/subject.model.js";

const validateSubject = (subject) => {
	try {
		// ...
	} catch (error) {
		handler.errorWithPopup(error);
		return [];
	}
};

const filterSubjects = (subjects, filterIds) => {
	return subjects.filter((subject) => {
		return !filterIds.includes(subject[DBSubjectConstants.ID]);
	});
};

const saveSubjectsToDB = (subjects) => {
	try {
		localStorageDB.setJSON(DBSubjectConstants.SUBJECT_LIST, subjects);
	} catch (error) {
		handler.error(error);
		return [];
	}
};

const convertDBtoObj = (subjectsStr) => {
	try {
		subjectsStr = subjectsStr ?? "[]";
		const subjDBArray = JSON.parse(subjectsStr) ?? [];
		let subjects = subjDBArray.map((subDB) => {
			return new Subject(subDB);
		});
		return subjects;
	} catch (error) {
		handler.error(error);
		return [];
	}
};

export const subjectAPI = {
	getSubjects: () => {
		try {
			let subjectList = localStorageDB.getCustom(
				DBSubjectConstants.SUBJECT_LIST,
				convertDBtoObj,
			);
			// subjectList.sort(
			// 	(a, b) =>
			// 		a[DBSubjectConstants.ORDER] - b[DBSubjectConstants.ORDER],
			// );
			// subjectList.forEach((subject, index) => {
			// 	subject[DBSubjectConstants.ORDER] = index;
			// });
			return [...subjectList];
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	},

	getSubjectById: (subjectId) => {
		try {
			const subjects = subjectAPI.getSubjects();
			const subject = subjects.find(
				(subject) => subject[DBSubjectConstants.ID] === subjectId,
			);
			return subject;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	},

	addSubject: (subject) => {
		try {
			// NOTE: CHECK IF THE SUBJECT IS VALID
			// const isValidSubject = this._validateSubject(subject);
			const { subjectName, subjectCode, subjectDescription, courseList } =
				subject;
			const subjects = subjectAPI.getSubjects();
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
			saveSubjectsToDB(subjects);
			return newSubject;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	},

	editSubjectById(subjectId, newSubject) {
		try {
			// ...
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	},

	deleteSubjectByIds(subjectIds) {
		try {
			const subjects = subjectAPI.getSubjects();
			// const subject = subjects.find(
			// 	(subject) => subject[DBSubjectConstants.ID] === subjectId,
			// );
			// if (isObjectNullOrEmpty(subject)) {
			// 	return null;
			// }
			const newSubjects = filterSubjects(subjects, subjectIds);
			saveSubjectsToDB(newSubjects);
			return true;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	},

	deleteAllSubjects() {
		try {
			localStorageDB.deleteKeys([DBSubjectConstants.SUBJECT_LIST]);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	},
};
