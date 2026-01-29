const ID = "id";
const ORDER = "order";
const SUBJECT_ID = "subjectId";
const COURSE_ID = "courseId";
const SUBJECT_LIST = "subjectList";
const COURSE_LIST = "courseList";

export const DBConstants = {
	ID,
};

export const DBSubjectConstants = {
	ID,
	SUBJECT_ID,
	COURSE_ID,
	CURRENT_SUBJECT: "currentSubject",
	SUBJECT_LIST,
	SUBJECT_NAME: "subjectName",
	SUBJECT_CODE: "subjectCode",
	SUBJECT_DESCRIPTION: "subjectDescription",
	COURSE_LIST,
	ORDER,
};

export const DBCourseConstants = {
	ID,
	COURSE_ID,
	SUBJECT_ID,
	COURSE_LIST,
	ORDER,
};
