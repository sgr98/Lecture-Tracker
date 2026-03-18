import { DBSubjectConstants } from "../../constants/DBConstants.js";
import { isStringNullOrWhiteSpace } from "../../utils/common.js";

// id
// subjectName
// subjectCode
// subjectDescription
// courseList

export class Subject {
	constructor(subject) {
		const { id, subjectName, subjectCode, subjectDescription, courseList } =
			subject;
		this[DBSubjectConstants.ID] = isStringNullOrWhiteSpace(id)
			? crypto.randomUUID()
			: id;
		this[DBSubjectConstants.SUBJECT_NAME] = subjectName ?? "";
		this[DBSubjectConstants.SUBJECT_CODE] = subjectCode ?? "";
		this[DBSubjectConstants.SUBJECT_DESCRIPTION] = subjectDescription ?? "";
		this[DBSubjectConstants.COURSE_LIST] = courseList ?? [];
	}
}
