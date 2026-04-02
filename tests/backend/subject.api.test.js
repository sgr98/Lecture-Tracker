// @vitest-environment node

import { DBSubjectConstants } from "../../src/constants/DBConstants.js";
import { BackendErrorConstants } from "../../src/constants/ErrorConstants.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { subjectAPI } from "../../src/backend/apis/subjects.api.js";
import { subjects0, subjects1, subjects2 } from "../data/subjects.js";
import { subjectService } from "../../src/backend/services/subject.service.js";
import { handler } from "../../src/utils/handler.js";
import { Result } from "../../src/backend/result.js";
import { Subject } from "../../src/backend/models/subject.model.js";

const { UNEXPECTED_ERROR } = BackendErrorConstants;

const TEST_ERROR = "Test Error";

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

describe("SUBJECT API - getSubjects", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it.each([
		{ name: "empty array", subjects: subjects0 },
		{ name: "subjects 1", subjects: subjects1 },
		{ name: "subjects 2", subjects: subjects2 },
	])(
		"gets subjects from subjec t service when storage has $name",
		({ subjects }) => {
			const expectedResult = convertToSubjectsArray(subjects);
			const getSubjectsSpy = vi
				.spyOn(subjectService, "getSubjects")
				.mockReturnValue(Result.success(subjects, 200));

			const result = subjectAPI.getSubjects();

			expect(subjectService.getSubjects).toHaveBeenCalled();
			expect(result.success).toEqual(true);
			expect(result.error).toEqual(null);
			expect(result.statusCode).toEqual(200);
			expect(result.value).toEqual(expectedResult);
			getSubjectsSpy.mockRestore();
		},
	);

	it("handles failed result from the service", () => {
		const getSubjectsSpy = vi
			.spyOn(subjectService, "getSubjects")
			.mockReturnValue(Result.fail(TEST_ERROR, 400));

		const result = subjectAPI.getSubjects();

		expect(subjectService.getSubjects).toHaveBeenCalled();
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(400);
		expect(result.value).toEqual([]);
		getSubjectsSpy.mockRestore();
	});

	it("handles an unexpected error", () => {
		const getSubjectsSpy = vi
			.spyOn(subjectService, "getSubjects")
			.mockImplementation(() => {
				throw new Error(TEST_ERROR);
			});

		const result = subjectAPI.getSubjects();

		expect(subjectService.getSubjects).toHaveBeenCalled();
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(`${UNEXPECTED_ERROR}: ${TEST_ERROR}`);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual([]);
		getSubjectsSpy.mockRestore();
	});
});

describe("SUBJECT API - getSubjectById", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it.each([
		{ name: "subjects 1", subjects: subjects1, ind: 2 },
		{ name: "subjects 2", subjects: subjects2, ind: 4 },
	])(
		"get subject by id (with $ind) from subjects service when storage has $name",
		({ subjects, ind }) => {
			const id = subjects[ind].id;
			const expectedResult = convertToSubjectsObj(subjects[ind]);
			const getSubjectByIdSpy = vi
				.spyOn(subjectService, "getSubjectById")
				.mockReturnValue(Result.success(subjects[ind], 200));

			const result = subjectAPI.getSubjectById(id);

			expect(subjectService.getSubjectById).toHaveBeenCalledWith(id);
			expect(result.success).toEqual(true);
			expect(result.error).toEqual(null);
			expect(result.statusCode).toEqual(200);
			expect(result.value).toEqual(expectedResult);
			getSubjectByIdSpy.mockRestore();
		},
	);

	it("handles failed result from the service", () => {
		const id = "any id";
		const getSubjectByIdSpy = vi
			.spyOn(subjectService, "getSubjectById")
			.mockReturnValue(Result.fail(TEST_ERROR, 400));

		const result = subjectAPI.getSubjectById(id);

		expect(subjectService.getSubjectById).toHaveBeenCalledWith(id);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(400);
		expect(result.value).toEqual(null);
		getSubjectByIdSpy.mockRestore();
	});

	it("handles an unexpected error", () => {
		const id = "any id";
		const getSubjectByIdSpy = vi
			.spyOn(subjectService, "getSubjectById")
			.mockImplementation(() => {
				throw new Error(TEST_ERROR);
			});

		const result = subjectAPI.getSubjectById(id);

		expect(subjectService.getSubjectById).toHaveBeenCalledWith(id);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(`${UNEXPECTED_ERROR}: ${TEST_ERROR}`);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		getSubjectByIdSpy.mockRestore();
	});
});

describe("SUBJECT API - addSubject", () => {
	const sampleSubject = {
		subjectName: "Subject 1",
		subjectCode: "Subject Code",
		subjectDescription: "Subject Description",
		courseList: [],
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("add sample subject to subjects service when storage has $name", () => {
		const mockResult = new Subject(sampleSubject);
		const addSubjectSpy = vi
			.spyOn(subjectService, "addSubject")
			.mockReturnValue(Result.success(mockResult, 201));

		const result = subjectAPI.addSubject(sampleSubject);

		expect(subjectService.addSubject).toHaveBeenCalledWith(sampleSubject);
		expect(result.success).toEqual(true);
		expect(result.error).toEqual(null);
		expect(result.statusCode).toEqual(201);
		expect(result.value.subjectName).toEqual(mockResult.subjectName);
		expect(result.value.subjectCode).toEqual(mockResult.subjectCode);
		expect(result.value.subjectDescription).toEqual(
			mockResult.subjectDescription,
		);
		expect(result.value.courseList).toEqual(mockResult.courseList);
		addSubjectSpy.mockRestore();
	});

	it("handles failed result from the service", () => {
		const addSubjectSpy = vi
			.spyOn(subjectService, "addSubject")
			.mockReturnValue(Result.fail(TEST_ERROR, 400));

		const result = subjectAPI.addSubject(sampleSubject);

		expect(subjectService.addSubject).toHaveBeenCalledWith(sampleSubject);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(400);
		expect(result.value).toEqual(null);
		addSubjectSpy.mockRestore();
	});

	it("handles an unexpected error", () => {
		const addSubjectSpy = vi
			.spyOn(subjectService, "addSubject")
			.mockImplementation(() => {
				throw new Error(TEST_ERROR);
			});

		const result = subjectAPI.addSubject(sampleSubject);

		expect(subjectService.addSubject).toHaveBeenCalledWith(sampleSubject);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(`${UNEXPECTED_ERROR}: ${TEST_ERROR}`);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		addSubjectSpy.mockRestore();
	});
});

describe("SUBJECT API - editSubjectById", () => {
	const sampleSubject = {
		subjectName: "New Subject 1",
		subjectCode: "New Subject Code",
		subjectDescription: "New Subject Description",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("edit sample subject to subjects service when storage has $name", () => {
		const mockResult = new Subject(sampleSubject);
		const editSubjectByIdSpy = vi
			.spyOn(subjectService, "editSubjectById")
			.mockReturnValue(Result.success(mockResult, 201));

		const result = subjectAPI.editSubjectById("any_id", sampleSubject);

		expect(subjectService.editSubjectById).toHaveBeenCalledWith(
			"any_id",
			sampleSubject,
		);
		expect(result.success).toEqual(true);
		expect(result.error).toEqual(null);
		expect(result.statusCode).toEqual(201);
		expect(result.value.subjectName).toEqual(mockResult.subjectName);
		expect(result.value.subjectCode).toEqual(mockResult.subjectCode);
		expect(result.value.subjectDescription).toEqual(
			mockResult.subjectDescription,
		);
		expect(result.value.courseList).toEqual(mockResult.courseList);
		editSubjectByIdSpy.mockRestore();
	});

	it("handles failed result from the service", () => {
		const editSubjectByIdSpy = vi
			.spyOn(subjectService, "editSubjectById")
			.mockReturnValue(Result.fail(TEST_ERROR, 400));

		const result = subjectAPI.editSubjectById("any_id", sampleSubject);

		expect(subjectService.editSubjectById).toHaveBeenCalledWith(
			"any_id",
			sampleSubject,
		);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(400);
		expect(result.value).toEqual(null);
		editSubjectByIdSpy.mockRestore();
	});

	it("handles an unexpected error", () => {
		const editSubjectByIdSpy = vi
			.spyOn(subjectService, "editSubjectById")
			.mockImplementation(() => {
				throw new Error(TEST_ERROR);
			});

		const result = subjectAPI.editSubjectById("any_id", sampleSubject);

		expect(subjectService.editSubjectById).toHaveBeenCalledWith(
			"any_id",
			sampleSubject,
		);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(`${UNEXPECTED_ERROR}: ${TEST_ERROR}`);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		editSubjectByIdSpy.mockRestore();
	});
});

describe("SUBJECT API - deleteSubjectByIds", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it.each([
		{ name: "subjects 1", subjects: subjects1 },
		{ name: "subjects 2", subjects: subjects2 },
	])(
		"deletes subjects of given ids from subjects service when storage has $name",
		({ subjects }) => {
			const ids = [
				"4cbece53-2fcc-44cc-9586-e36399126115",
				"ba2d2a25-4ba0-4cc1-8c73-5bf2d2185624",
			];
			const expectedResult = subjects.filter((subject) => {
				return !ids.includes(subject.id);
			});
			const deleteSubjectByIdsSpy = vi
				.spyOn(subjectService, "deleteSubjectByIds")
				.mockReturnValue(Result.success(expectedResult, 200));

			const result = subjectAPI.deleteSubjectByIds(ids);

			expect(subjectService.deleteSubjectByIds).toHaveBeenCalledWith(ids);
			expect(result.success).toEqual(true);
			expect(result.error).toEqual(null);
			expect(result.statusCode).toEqual(200);
			expect(result.value).toEqual(expectedResult);
			deleteSubjectByIdsSpy.mockRestore();
		},
	);

	it("handles failed result from the service", () => {
		const ids = [
			"4cbece53-2fcc-44cc-9586-e36399126115",
			"ba2d2a25-4ba0-4cc1-8c73-5bf2d2185624",
		];
		const deleteSubjectByIdsSpy = vi
			.spyOn(subjectService, "deleteSubjectByIds")
			.mockReturnValue(Result.fail(TEST_ERROR, 400));

		const result = subjectAPI.deleteSubjectByIds(ids);

		expect(subjectService.deleteSubjectByIds).toHaveBeenCalledWith(ids);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(400);
		expect(result.value).toEqual(null);
		deleteSubjectByIdsSpy.mockRestore();
	});

	it("handles an unexpected error", () => {
		const ids = [
			"4cbece53-2fcc-44cc-9586-e36399126115",
			"ba2d2a25-4ba0-4cc1-8c73-5bf2d2185624",
		];
		const deleteSubjectByIdsSpy = vi
			.spyOn(subjectService, "deleteSubjectByIds")
			.mockImplementation(() => {
				throw new Error(TEST_ERROR);
			});

		const result = subjectAPI.deleteSubjectByIds(ids);

		expect(subjectService.deleteSubjectByIds).toHaveBeenCalledWith(ids);
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(`${UNEXPECTED_ERROR}: ${TEST_ERROR}`);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		deleteSubjectByIdsSpy.mockRestore();
	});
});

describe("SUBJECT API - deleteAllSubjects", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it.each("deletes all subjects from subjects service", () => {
		const keys = [DBSubjectConstants.SUBJECT_LIST];
		const deleteAllSubjectsSpy = vi
			.spyOn(subjectService, "deleteAllSubjects")
			.mockReturnValue(Result.success(keys, 201));

		const result = subjectAPI.deleteAllSubjects();

		expect(subjectService.deleteAllSubjects).toHaveBeenCalled();
		expect(result.success).toEqual(true);
		expect(result.error).toEqual(null);
		expect(result.statusCode).toEqual(201);
		expect(result.value).toEqual(keys);
		deleteAllSubjectsSpy.mockRestore();
	});

	it("handles failed result from the service", () => {
		const deleteAllSubjectsSpy = vi
			.spyOn(subjectService, "deleteAllSubjects")
			.mockReturnValue(Result.fail(TEST_ERROR, 400));

		const result = subjectAPI.deleteAllSubjects();

		expect(subjectService.deleteAllSubjects).toHaveBeenCalled();
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(TEST_ERROR);
		expect(result.statusCode).toEqual(400);
		expect(result.value).toEqual(null);
		deleteAllSubjectsSpy.mockRestore();
	});

	it("handles an unexpected error", () => {
		const deleteAllSubjectsSpy = vi
			.spyOn(subjectService, "deleteAllSubjects")
			.mockImplementation(() => {
				throw new Error(TEST_ERROR);
			});

		const result = subjectAPI.deleteAllSubjects();

		expect(subjectService.deleteAllSubjects).toHaveBeenCalled();
		expect(result.success).toEqual(false);
		expect(result.error).toEqual(`${UNEXPECTED_ERROR}: ${TEST_ERROR}`);
		expect(result.statusCode).toEqual(500);
		expect(result.value).toEqual(null);
		deleteAllSubjectsSpy.mockRestore();
	});
});
