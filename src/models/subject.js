import { DBSubjectConstants } from "../constants/DBConstants.js";

// id
// subjectName
// subjectCode
// subjectDescription
// courseList
// order

export class Subject {
	constructor(
		subjectName,
		subjectCode,
		subjectDescription,
		courseList,
		order,
	) {
		this[DBSubjectConstants.ID] = crypto.randomUUID();
		this[DBSubjectConstants.SUBJECT_NAME] = subjectName ?? "";
		this[DBSubjectConstants.SUBJECT_CODE] = subjectCode ?? "";
		this[DBSubjectConstants.SUBJECT_DESCRIPTION] = subjectDescription ?? "";
		this[DBSubjectConstants.COURSE_LIST] = courseList ?? [];
		this[DBSubjectConstants.ORDER] = order ?? -1;
	}

	log = () => {
		console.log(this);
		console.log(this[DBSubjectConstants.ID]);
		console.log(this[DBSubjectConstants.SUBJECT_NAME]);
		console.log(this[DBSubjectConstants.SUBJECT_CODE]);
		console.log(this[DBSubjectConstants.SUBJECT_DESCRIPTION]);
		console.log(this[DBSubjectConstants.COURSE_LIST]);
		console.log(this[DBSubjectConstants.ORDER]);
	};
}

