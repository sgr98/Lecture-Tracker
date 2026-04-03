import { DBSubjectConstants } from "../../constants/DBConstants.js";

// id
// subjectName
// subjectCode
// subjectDescription
// courseList

// order
// isSelectedForDeletion
//

export class SubjectUIModel {
	constructor(subject, order) {
		this._subjectDB = subject;
		this._order = order;
		this._isSelectedForDeletion = false;
		this._edits = {
			isEdited: false,
			subjectName: null,
			subjectCode: null,
			subjectDescription: null,
		};
	}

	get id() {
		return this._subjectDB[DBSubjectConstants.ID];
	}

	set id(iden) {
		this._subjectDB[DBSubjectConstants.ID] = iden;
	}

	get subjectName() {
		return this._subjectDB[DBSubjectConstants.SUBJECT_NAME];
	}

	set subjectName(name) {
		this._subjectDB[DBSubjectConstants.SUBJECT_NAME] = name;
	}

	get subjectCode() {
		return this._subjectDB[DBSubjectConstants.SUBJECT_CODE];
	}

	set subjectCode(code) {
		this._subjectDB[DBSubjectConstants.SUBJECT_CODE] = code;
	}

	get subjectDescription() {
		return this._subjectDB[DBSubjectConstants.SUBJECT_DESCRIPTION];
	}

	set subjectDescription(description) {
		this._subjectDB[DBSubjectConstants.SUBJECT_DESCRIPTION] = description;
	}

	get courseList() {
		return this._subjectDB[DBSubjectConstants.COURSE_LIST];
	}

	set courseList(courses) {
		this._subjectDB[DBSubjectConstants.COURSE_LIST] = courses;
	}

	get order() {
		return this._order;
	}

	set order(ord) {
		this._order = ord;
	}

	get isSelectedForDeletion() {
		return this._isSelectedForDeletion;
	}

	set isSelectedForDeletion(isfd) {
		this._isSelectedForDeletion = isfd;
	}

	get edits() {
		return this._edits;
	}

	set edits(subject) {
		this._edits.isEdited = true;
		this._edits.subjectName = subject.subjectName;
		this._edits.subjectCode = subject.subjectCode;
		this._edits.subjectDescription = subject.subjectDescription;
	}

	get isEdited() {
		return this._edits.isEdited;
	}

	get editedSubject() {
		return {
			subjectName: this._edits.subjectName,
			subjectCode: this._edits.subjectCode,
			subjectDescription: this._edits.subjectDescription,
		};
	}

	getEffectiveSubject() {
		if (this.isEdited) {
			return {
				id: this.id,
				...this.editedSubject,
			};
		}
		return this._subjectDB;
	}
}
