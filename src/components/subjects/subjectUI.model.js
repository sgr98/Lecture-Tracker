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
		this.subjectDB = subject;
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
		return this.subjectDB[DBSubjectConstants.ID];
	}

	set id(iden) {
		this.subjectDB[DBSubjectConstants.ID] = iden;
	}

	get subjectName() {
		return this.subjectDB[DBSubjectConstants.SUBJECT_NAME];
	}

	set subjectName(name) {
		this.subjectDB[DBSubjectConstants.SUBJECT_NAME] = name;
	}

	get subjectCode() {
		return this.subjectDB[DBSubjectConstants.SUBJECT_CODE];
	}

	set subjectCode(code) {
		this.subjectDB[DBSubjectConstants.SUBJECT_CODE] = code;
	}

	get subjectDescription() {
		return this.subjectDB[DBSubjectConstants.SUBJECT_DESCRIPTION];
	}

	set subjectDescription(description) {
		this.subjectDB[DBSubjectConstants.SUBJECT_DESCRIPTION] = description;
	}

	get courseList() {
		return this.subjectDB[DBSubjectConstants.COURSE_LIST];
	}

	set courseList(courses) {
		this.subjectDB[DBSubjectConstants.COURSE_LIST] = courses;
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
}
