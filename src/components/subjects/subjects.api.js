import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { handler } from "../../utils/handler.js";
import { isArrayNullOrEmpty } from "../../utils/common.js";
import { localStorageDB } from "../../utils/localStorageDB.js";
import { Subject } from "../../models/subject.js";

export class SubjectAPI {
	constructor() {
		this._subjects = null;
	}

	get subjects() {
		try {
			if (isArrayNullOrEmpty(this._subjects)) {
				this._subjects = this._getSubjects();
			}
			return this._subjects;
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	}

	getSubjects() {
		return [...this.subjects];
	}

	getSubjectById(id) {
		try {
			const subject = this.subjects.find(
				(subject) => subject[DBSubjectConstants.ID] === id,
			);
			return subject;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	}

	addSubject(subject) {
		try {
			// NOTE: CHECK IF THE SUBJECT IS VALID
			// const isValidSubject = this._validateSubject(subject);
			const { subjectName, subjectCode, subjectDescription, courseList } =
				subject;
			const numberOfExistingSubjects = this.subjects.length;
			const newSubject = new Subject({
				id: null,
				subjectName,
				subjectCode,
				subjectDescription,
				courseList,
				order: numberOfExistingSubjects,
			});

			this._subjects.push(newSubject);
			this._saveSubjects();
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

	_getSubjects() {
		try {
			let subjectList = localStorageDB.getCustom(
				DBSubjectConstants.SUBJECT_LIST,
				this._convertDBtoObj,
			);
			subjectList.sort(
				(a, b) =>
					a[DBSubjectConstants.ORDER] - b[DBSubjectConstants.ORDER],
			);
			subjectList.forEach((subject, index) => {
				subject[DBSubjectConstants.ORDER] = index;
			});
			return [...subjectList];
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

	_saveSubjects() {
		try {
			this._resetOrder();
			localStorageDB.setJSON(
				DBSubjectConstants.SUBJECT_LIST,
				this.subjects,
			);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_resetOrder() {
		try {
			this._subjects.forEach((subject, index) => {
				subject[DBSubjectConstants.ORDER] = index;
			});
		} catch (error) {
			handler.errorWithPopup(error);
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
