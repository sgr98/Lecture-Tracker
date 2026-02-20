import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { localStorageDB } from "../../utils/localStorageDB.js";
import { handler } from "../../utils/handler.js";
import { Subject } from "../../models/subject.js";

export class SubjectAPI {
	constructor() {}

	getSubjects() {
		try {
			let subjectList = localStorageDB.getCustom(
				DBSubjectConstants.SUBJECT_LIST,
				this._convertDBtoObj,
			);
			subjectList.sort(
				(a, b) =>
					a[DBSubjectConstants.ORDER] - b[DBSubjectConstants.ORDER],
			);
			return [...subjectList];
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	}

	getSubjectById(id) {
		const subjects = this.getSubjects();
		const subject = subjects.find((subject) => subject.id === id) ?? {};
		return { ...subject };
	}

	addSubject(subject) {
		try {
			// NOTE: CHECK IF THE SUBJECT IS VALID
			const isValidSubject = this._validateSubject(subject);
			const { subjectName, subjectCode, subjectDescription, courseList } =
				subject;
			const subjects = this.getSubjects();
			const numberOfExistingSubjects = subjects.length;

			const newSubject = new Subject({
				id: null,
				subjectName,
				subjectCode,
				subjectDescription,
				courseList,
				order: numberOfExistingSubjects,
			});
			subjects.push(newSubject);
			localStorageDB.setJSON(DBSubjectConstants.SUBJECT_LIST, subjects);
			return newSubject;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	}

	static deleteAllSubjects() {
		try {
			localStorageDB.deleteKeys([DBSubjectConstants.SUBJECT_LIST]);
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	}

	_validateSubject(subject) {
		try {
			// ...
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	}

	_convertDBtoObj(subjectsStr) {
		try {
			subjectsStr = subjectsStr ?? "[]";
			const subjDBArray = JSON.parse(subjectsStr) ?? [];
			let subjects = subjDBArray.map((subDB) => {
				return new Subject(subDB);
			});
			return subjects;
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	}
}
