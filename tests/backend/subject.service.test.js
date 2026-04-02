// @vitest-environment node

import { DBSubjectConstants } from "../../src/constants/DBConstants.js";
import { BackendErrorConstants } from "../../src/constants/ErrorConstants.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { subjectService } from "../../src/backend/services/subject.service.js";
import { subjects0, subjects1, subjects2 } from "../data/subjects.js";
import { localStorageService } from "../../src/backend/services/localStorage.service.js";
import { handler } from "../../src/utils/handler.js";
import { Result } from "../../src/backend/result.js";
import { Subject } from "../../src/backend/models/subject.model.js";

const {
	SUBJECT_NOT_FOUND,
	INVALID_SUBJECT_ID,
	INVALID_SUBJECT_NAME,
	INVALID_SUBJECT_CODE,
	INVALID_SUBJECT_DESCRIPTION,
	INVALID_COURSE_LIST,
} = BackendErrorConstants;

const TEST_ERROR = "Test Error";
const GUID_LENGTH = 36;

const convertToSubjectsObj = (subjectObj) => {
	return new Subject(subjectObj);
};

const convertToSubjectsArray = (subjectsObj) => {
	return subjectsObj.map((sub) => {
		return new Subject(sub);
	});
};

vi.mock("../../src/utils/handler.js", () => ({
	handler: {
		errorWithPopup: vi.fn(),
		error: vi.fn(),
	},
}));

describe("SUBJECT Service - getSubjects", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it.each([
		{ name: "empty array", subjects: subjects0 },
		{ name: "subjects 1", subjects: subjects1 },
		{ name: "subjects 2", subjects: subjects2 },
	])(
		"gets Subjects from Local Storage when storage has $name",
		({ subjects }) => {
			const getJSONSpy = vi
				.spyOn(localStorageService, "getJSON")
				.mockReturnValue(Result.success(subjects, 200));

			const expectedResult = convertToSubjectsArray(subjects);
			const result = subjectService.getSubjects();

			expect(localStorageService.getJSON).toHaveBeenCalledWith(
				DBSubjectConstants.SUBJECT_LIST,
			);
			expect(result.success).toEqual(true);
			expect(result.error).toEqual(null);
			expect(result.statusCode).toEqual(200);
			expect(result.value).toEqual(expectedResult);
			getJSONSpy.mockRestore();
		},
	);

	it("handles an unsuccessful result and returns it as it is", () => {
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.fail(TEST_ERROR, 500));

		const result = subjectService.getSubjects();

		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		getJSONSpy.mockRestore();
	});
});

describe("SUBJECT Service - getSubjectById", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it.each([
		{ name: "subjects 1", subjects: subjects1, ind: 1 },
		{ name: "subjects 2", subjects: subjects2, ind: 2 },
	])(
		"gets Subject by id from Local Storage when storage has $name",
		({ subjects, ind }) => {
			const getJSONSpy = vi
				.spyOn(localStorageService, "getJSON")
				.mockReturnValue(Result.success(subjects, 200));

			const expectedResult = convertToSubjectsObj(subjects[ind]);
			const result = subjectService.getSubjectById(
				subjects[ind][DBSubjectConstants.ID],
			);

			expect(localStorageService.getJSON).toHaveBeenCalledWith(
				DBSubjectConstants.SUBJECT_LIST,
			);
			expect(result.success).toEqual(true);
			expect(result.error).toEqual(null);
			expect(result.statusCode).toEqual(200);
			expect(result.value).toEqual(expectedResult);
			getJSONSpy.mockRestore();
		},
	);

	it.each([
		{ name: "subjects 1", subjects: subjects1, id: null },
		{ name: "subjects 2", subjects: subjects2, id: undefined },
		{ name: "subjects 2", subjects: subjects1, id: "" },
		{ name: "subjects 2", subjects: subjects2, id: "   	" },
	])(
		"returns a failed result when an invalid Id: $id is sent when storage has $name",
		({ subjects, id }) => {
			const getJSONSpy = vi
				.spyOn(localStorageService, "getJSON")
				.mockReturnValue(Result.success(subjects, 200));

			const result = subjectService.getSubjectById(id);

			expect(result.success).toEqual(false);
			expect(result.error).toEqual(INVALID_SUBJECT_ID);
			expect(result.statusCode).toEqual(400);
			expect(result.value).toEqual(null);
			getJSONSpy.mockRestore();
		},
	);

	it("returns a failed result when the id belonging to the subject is not found", () => {
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.success(subjects2));

		const result = subjectService.getSubjectById(
			subjects1[0][DBSubjectConstants.ID],
		);

		expect(result.success).toEqual(false);
		expect(result.error).toEqual(SUBJECT_NOT_FOUND);
		expect(result.statusCode).toEqual(400);
		expect(result.value).toEqual(null);
		getJSONSpy.mockRestore();
	});

	it("handles an unsuccessful result from getSubjects and returns it as it is", () => {
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.fail(TEST_ERROR, 500));

		const result = subjectService.getSubjectById("any id");

		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		getJSONSpy.mockRestore();
	});
});

describe("SUBJECT Service - addSubject", () => {
	const sampleSubject = {
		subjectName: "Subject 1",
		subjectCode: "Subject Code",
		subjectDescription: "Subject Description",
		courseList: [],
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it.each([
		{ name: "empty array", subjects: subjects0 },
		{ name: "subjects 1", subjects: subjects1 },
	])(
		"add a subject to Local Storage when storage has $name",
		({ subjects }) => {
			const mockResult = new Subject(sampleSubject);
			const getJSONSpy = vi
				.spyOn(localStorageService, "getJSON")
				.mockReturnValue(Result.success(subjects, 200));
			const setJSONSpy = vi
				.spyOn(localStorageService, "setJSON")
				.mockReturnValue(Result.success(mockResult, 201));

			const result = subjectService.addSubject(sampleSubject);

			expect(localStorageService.getJSON).toHaveBeenCalledWith(
				DBSubjectConstants.SUBJECT_LIST,
			);
			expect(localStorageService.setJSON).toHaveBeenCalled();
			expect(result.success).toEqual(true);
			expect(result.error).toEqual(null);
			expect(result.statusCode).toEqual(201);
			expect(result.value.id.length).toEqual(GUID_LENGTH);
			expect(result.value.subjectName).toEqual(sampleSubject.subjectName);
			expect(result.value.subjectCode).toEqual(sampleSubject.subjectCode);
			expect(result.value.subjectDescription).toEqual(
				sampleSubject.subjectDescription,
			);
			expect(result.value.courseList).toEqual(sampleSubject.courseList);
			getJSONSpy.mockRestore();
			setJSONSpy.mockRestore();
		},
	);

	it.each([
		{
			name: INVALID_SUBJECT_NAME,
			invalidSubject: {
				...sampleSubject,
				subjectName: " 		",
			},
			errorMessage: INVALID_SUBJECT_NAME,
		},
		{
			name: INVALID_SUBJECT_CODE,
			invalidSubject: {
				...sampleSubject,
				subjectCode: "",
			},
			errorMessage: INVALID_SUBJECT_CODE,
		},
		{
			name: INVALID_SUBJECT_DESCRIPTION,
			invalidSubject: {
				...sampleSubject,
				subjectDescription: 52522,
			},
			errorMessage: INVALID_SUBJECT_DESCRIPTION,
		},
		{
			name: INVALID_COURSE_LIST,
			invalidSubject: {
				...sampleSubject,
				courseList: null,
			},
			errorMessage: INVALID_COURSE_LIST,
		},
		{
			name: INVALID_COURSE_LIST,
			invalidSubject: {
				...sampleSubject,
				courseList: {},
			},
			errorMessage: INVALID_COURSE_LIST,
		},
		{
			name: "Everything Invalid",
			invalidSubject: {
				subjectName: " 		",
				subjectCode: "",
				subjectDescription: 52522,
				courseList: null,
			},
			errorMessage: `${INVALID_SUBJECT_NAME} ${INVALID_SUBJECT_CODE} ${INVALID_SUBJECT_DESCRIPTION} ${INVALID_COURSE_LIST}`,
		},
	])(
		"handles an invalid subject ($name) by returning a failed result ",
		({ invalidSubject, errorMessage }) => {
			const result = subjectService.addSubject(invalidSubject);

			expect(result.success).toEqual(false);
			expect(result.error).toEqual(errorMessage);
			expect(result.statusCode).toEqual(400);
			expect(result.value).toEqual(null);
		},
	);

	it("handles an unsuccessful result from getSubjects and returns it as it is", () => {
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.fail(TEST_ERROR, 500));

		const result = subjectService.addSubject(sampleSubject);

		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		getJSONSpy.mockRestore();
	});

	it("returns a failed result when some problem occurs while saving the subjects to DB", () => {
		const mockResult = new Subject(sampleSubject);
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.success(subjects1, 200));
		const setJSONSpy = vi
			.spyOn(localStorageService, "setJSON")
			.mockReturnValue(Result.fail(TEST_ERROR, 500));

		const result = subjectService.addSubject(sampleSubject);

		expect(localStorageService.getJSON).toHaveBeenCalledWith(
			DBSubjectConstants.SUBJECT_LIST,
		);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		getJSONSpy.mockRestore();
		setJSONSpy.mockRestore();
	});
});

describe("SUBJECT Service - editSubjectById", () => {
	const sampleSubject = {
		subjectName: "New Subject 1",
		subjectCode: "New Subject Code",
		subjectDescription: "New Subject Description",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it.each([
		{ name: "subjects 1", subjects: subjects1, ind: 2 },
		{ name: "subjects 2", subjects: subjects2, ind: 4 },
	])(
		"edit a subject to Local Storage when storage has $name with index: $ind",
		({ subjects, ind }) => {
			const subjectId = subjects[ind][DBSubjectConstants.ID];
			const mockResult = new Subject({
				id: subjectId,
				...sampleSubject,
				courseList: [],
			});
			const getJSONSpy = vi
				.spyOn(localStorageService, "getJSON")
				.mockReturnValue(Result.success(subjects, 200));
			subjects[ind] = mockResult;
			const setJSONSpy = vi
				.spyOn(localStorageService, "setJSON")
				.mockReturnValue(Result.success(subjects, 201));

			const result = subjectService.editSubjectById(
				subjectId,
				sampleSubject,
			);

			expect(localStorageService.getJSON).toHaveBeenCalledWith(
				DBSubjectConstants.SUBJECT_LIST,
			);
			expect(localStorageService.setJSON).toHaveBeenCalled();
			expect(result.success).toEqual(true);
			expect(result.error).toEqual(null);
			expect(result.statusCode).toEqual(201);
			expect(result.value.id).toEqual(mockResult.id);
			expect(result.value.subjectName).toEqual(mockResult.subjectName);
			expect(result.value.subjectCode).toEqual(mockResult.subjectCode);
			expect(result.value.subjectDescription).toEqual(
				mockResult.subjectDescription,
			);
			expect(result.value.courseList).toEqual(mockResult.courseList);
			getJSONSpy.mockRestore();
			setJSONSpy.mockRestore();
		},
	);

	it.each([
		{
			name: INVALID_SUBJECT_NAME,
			invalidSubject: {
				...sampleSubject,
				subjectName: " 		",
			},
			subjectId: "any_id",
			errorMessage: INVALID_SUBJECT_NAME,
		},
		{
			name: INVALID_SUBJECT_CODE,
			invalidSubject: {
				...sampleSubject,
				subjectCode: "",
			},
			subjectId: "any_id",
			errorMessage: INVALID_SUBJECT_CODE,
		},
		{
			name: INVALID_SUBJECT_DESCRIPTION,
			invalidSubject: {
				...sampleSubject,
				subjectDescription: 52522,
			},
			subjectId: "any_id",
			errorMessage: INVALID_SUBJECT_DESCRIPTION,
		},
		{
			name: "Everything Invalid",
			invalidSubject: {
				subjectName: " 		",
				subjectCode: "",
				subjectDescription: 52522,
			},
			subjectId: "any_id",
			errorMessage: `${INVALID_SUBJECT_NAME} ${INVALID_SUBJECT_CODE} ${INVALID_SUBJECT_DESCRIPTION}`,
		},
	])(
		"handles an invalid subject ($name) by returning a failed result ",
		({ invalidSubject, subjectId, errorMessage }) => {
			const result = subjectService.editSubjectById(
				subjectId,
				invalidSubject,
			);

			expect(result.success).toEqual(false);
			expect(result.error).toEqual(errorMessage);
			expect(result.statusCode).toEqual(400);
			expect(result.value).toEqual(null);
		},
	);

	it("handles an unsuccessful result from getSubjects and returns it as it is", () => {
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.fail(TEST_ERROR, 500));

		const result = subjectService.editSubjectById("any_id", sampleSubject);

		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		getJSONSpy.mockRestore();
	});

	it.each([
		{ name: "Empty array", subjects: subjects0 },
		{ name: "subjects 1", subjects: subjects1 },
	])(
		"edit a subject to Local Storage when storage has $name with index: $ind",
		({ subjects }) => {
			const getJSONSpy = vi
				.spyOn(localStorageService, "getJSON")
				.mockReturnValue(Result.success(subjects, 200));

			const result = subjectService.editSubjectById(
				"any_id",
				sampleSubject,
			);

			expect(result.success).toEqual(false);
			expect(result.error).toEqual(SUBJECT_NOT_FOUND);
			expect(result.statusCode).toEqual(400);
			expect(result.value).toEqual(null);
			getJSONSpy.mockRestore();
		},
	);

	it("returns a failed result when some problem occurs while saving the subjects to DB", () => {
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.success(subjects1, 200));
		const setJSONSpy = vi
			.spyOn(localStorageService, "setJSON")
			.mockReturnValue(Result.fail(TEST_ERROR, 500));

		const result = subjectService.editSubjectById(
			"ba2d2a25-4ba0-4cc1-8c73-5bf2d2185624",
			sampleSubject,
		);

		expect(localStorageService.getJSON).toHaveBeenCalledWith(
			DBSubjectConstants.SUBJECT_LIST,
		);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		getJSONSpy.mockRestore();
		setJSONSpy.mockRestore();
	});
});

describe("SUBJECT Service - deleteSubjectByIds", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it.each([
		{
			name: "subjects 1",
			subjects: subjects1,
			ids: [
				"ba2d2a25-4ba0-4cc1-8c73-5bf2d2185624",
				"1b540e30-2e7b-489e-9ac5-28046ab85739",
			],
		},
		{
			name: "subjects 2",
			subjects: subjects2,
			ids: [
				"4cbece53-2fcc-44cc-9586-e36399126115",
				"af0b2ae3-7ba8-49e2-b957-980a504624ff",
			],
		},
		{
			name: "subjects 1",
			subjects: subjects1,
			ids: [
				"4cbece53-2fcc-44cc-9586-e36399126115",
				"ba2d2a25-4ba0-4cc1-8c73-5bf2d2185624",
			],
		},
	])(
		"deletes subjects of given Ids with mock storage: $name",
		({ subjects, ids }) => {
			const expectedResult = subjects.filter((subject) => {
				return !ids.includes(subject.id);
			});
			const getJSONSpy = vi
				.spyOn(localStorageService, "getJSON")
				.mockReturnValue(Result.success(subjects, 200));
			const setJSONSpy = vi
				.spyOn(localStorageService, "setJSON")
				.mockReturnValue(Result.success(expectedResult, 201));

			const result = subjectService.deleteSubjectByIds(ids);

			expect(localStorageService.getJSON).toHaveBeenCalledWith(
				DBSubjectConstants.SUBJECT_LIST,
			);
			expect(localStorageService.setJSON).toHaveBeenCalled();
			expect(result.success).toEqual(true);
			expect(result.error).toEqual(null);
			expect(result.statusCode).toEqual(201);
			expect(result.value).toEqual(expectedResult);
			getJSONSpy.mockRestore();
			setJSONSpy.mockRestore();
		},
	);

	it("does nothing when there is nothing in the DB", () => {
		const ids = [
			"4cbece53-2fcc-44cc-9586-e36399126115",
			"af0b2ae3-7ba8-49e2-b957-980a504624ff",
		];
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.success([], 200));
		const setJSONSpy = vi
			.spyOn(localStorageService, "setJSON")
			.mockReturnValue(Result.success([], 201));

		const result = subjectService.deleteSubjectByIds(ids);

		expect(localStorageService.getJSON).toHaveBeenCalledWith(
			DBSubjectConstants.SUBJECT_LIST,
		);
		expect(localStorageService.setJSON).toHaveBeenCalled();
		expect(result.success).toEqual(true);
		expect(result.error).toEqual(null);
		expect(result.statusCode).toEqual(201);
		expect(result.value).toEqual([]);
		getJSONSpy.mockRestore();
		setJSONSpy.mockRestore();
	});

	it("returns a failed result when some problem occurs while saving the subjects to DB", () => {
		const ids = [
			"4cbece53-2fcc-44cc-9586-e36399126115",
			"af0b2ae3-7ba8-49e2-b957-980a504624ff",
		];
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.success(subjects2, 200));
		const setJSONSpy = vi
			.spyOn(localStorageService, "setJSON")
			.mockReturnValue(Result.fail(TEST_ERROR, 500));

		const result = subjectService.deleteSubjectByIds(ids);

		expect(localStorageService.getJSON).toHaveBeenCalledWith(
			DBSubjectConstants.SUBJECT_LIST,
		);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		getJSONSpy.mockRestore();
		setJSONSpy.mockRestore();
	});

	it("handles an unsuccessful result from getSubjects and returns it as it is", () => {
		const getJSONSpy = vi
			.spyOn(localStorageService, "getJSON")
			.mockReturnValue(Result.fail(TEST_ERROR, 500));

		const result = subjectService.getSubjectById("any id");

		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		getJSONSpy.mockRestore();
	});
});

describe("SUBJECT Service - deleteAllSubjects", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("deletes all subjects from Local Storage", () => {
		const keys = [DBSubjectConstants.SUBJECT_LIST];
		const deleteKeysSpy = vi
			.spyOn(localStorageService, "deleteKeys")
			.mockReturnValue(Result.success(keys, 201));

		const result = subjectService.deleteAllSubjects();

		expect(localStorageService.deleteKeys).toHaveBeenCalledWith(keys);
		expect(result.success).toEqual(true);
		expect(result.error).toEqual(null);
		expect(result.statusCode).toEqual(201);
		expect(result.value).toEqual(keys);
		deleteKeysSpy.mockRestore();
	});

	it("handles an error and returns null", () => {
		const keys = [DBSubjectConstants.SUBJECT_LIST];
		const deleteKeysSpy = vi
			.spyOn(localStorageService, "deleteKeys")
			.mockReturnValue(Result.fail(TEST_ERROR, 500));

		const result = subjectService.deleteAllSubjects();

		expect(localStorageService.deleteKeys).toHaveBeenCalledWith(keys);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		deleteKeysSpy.mockRestore();
	});
});
