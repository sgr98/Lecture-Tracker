import { isValueNull } from "../../utils/common.js";
import { subjectAPI } from "../../backend/apis/subjects.api.js";
import { Subject } from "../../backend/models/subject.model.js";
import { SubjectViewModel } from "./subjectView.model.js";
import { handler } from "../../utils/handler.js";

export class SubjectData {
	constructor() {
		this._currentSubject = null;
		this._subjects = null;
	}

	get currentSubject() {
		return this._currentSubject;
	}

	set currentSubject(subject) {
		this._currentSubject = subject;
	}

	get subjects() {
		try {
			if (isValueNull(this._subjects)) {
				this._subjects = this._getSubjects();
			}
			return this._subjects;
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	}

	_getSubjects() {
		try {
			const subjectsDB = subjectAPI.getSubjects();
			const subjects = this._mapSubjectsFromDB(subjectsDB);
			return subjects;
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	}

	addSubject(subject) {
		try {
			// NOTE: Can check if subject is valid or not
			const newSubject = subjectAPI.addSubject(subject);

			const numberOfExistingSubjects = this.subjects.length;
			const newSubjectViewModel = new SubjectViewModel(
				newSubject,
				numberOfExistingSubjects,
			);
			this._subjects.push(newSubjectViewModel);
			return newSubjectViewModel;
		} catch (error) {
			handler.errorWithPopup(error);
			return null;
		}
	}

	_mapSubjectsFromDB(subjectsDB) {
		try {
			let subjects = [];
			subjectsDB.map((subject, index) => {
				const subjectViewModel = new SubjectViewModel(subject, index);
				subjects.push(subjectViewModel);
			});
			return subjects;
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	}

	_mapSubjectsToDB(subjects) {
		try {
			let subjectsDB = [];
			subjects.map((subject) => {
				const subjectViewModel = new Subject(subject);
				subjectsDB.push(subjectViewModel);
			});
			return subjectsDB;
		} catch (error) {
			handler.errorWithPopup(error);
			return [];
		}
	}

	// _resetOrder() {
	// 	try {
	// 		this._subjects.forEach((subject, index) => {
	// 			subject[DBSubjectConstants.ORDER] = index;
	// 		});
	// 	} catch (error) {
	// 		handler.errorWithPopup(error);
	// 	}
	// }
}
