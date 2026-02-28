// @vitest-environment node

import { DBSubjectConstants } from "../../src/constants/DBConstants.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { SubjectAPI } from "../../src/components/subjects/subjects.api.js";
import { subjects0, subjects1, subjects2 } from "../data/subjects.js";
import { localStorageDB } from "../../src/utils/localStorageDB.js";
import { handler } from "../../src/utils/handler.js";

vi.mock("../../src/utils/handler.js", () => ({
	handler: {
		errorWithPopup: vi.fn(),
	},
}));

describe("SUBJECT API - getSubjects", () => {
	let subjectAPI;

	beforeEach(() => {
		vi.clearAllMocks();
		subjectAPI = new SubjectAPI();
	});

	it.each([
		{ name: "empty array", subjects: subjects0 },
		{ name: "subjects 1", subjects: subjects1 },
		{ name: "subjects 2", subjects: subjects2 },
	])(
		"gets Subjects from Local Storage when storage has $name",
		({ name, subjects }) => {
			const getCustomSpy = vi
				.spyOn(localStorageDB, "getCustom")
				.mockReturnValue(subjects);

			const result = subjectAPI.getSubjects();

			expect(localStorageDB.getCustom).toHaveBeenCalledWith(
				DBSubjectConstants.SUBJECT_LIST,
				subjectAPI._convertDBtoObj,
			);
			expect(result).toEqual(subjects);
			getCustomSpy.mockRestore();
		},
	);

	it("handles an error and returns an empty array", () => {
		const getCustomSpy = vi
			.spyOn(localStorageDB, "getCustom")
			.mockImplementation(() => {
				throw new Error("Test Error");
			});

		const result = subjectAPI.getSubjects();

		expect(handler.errorWithPopup).toHaveBeenCalled("Test Error");
		expect(result).toEqual([]);
		getCustomSpy.mockRestore();
	});
});

// describe("SUBJECT API - getSubjectById", () => {
// 	let subjectAPI;

// 	beforeEach(() => {
// 		vi.clearAllMocks();
// 		subjectAPI = new SubjectAPI();
// 	});
// });

describe("SUBJECT API - addSubject", () => {
	let subjectAPI;

	beforeEach(() => {
		vi.clearAllMocks();
		subjectAPI = new SubjectAPI();
	});

	it.each([
		{ name: "empty array", subjects: subjects0 },
		{ name: "subjects 1", subjects: subjects1 },
	])(
		"add a subject to Local Storage when storage has $name",
		({ name, subjects }) => {
			const newSubject = {
				subjectName: "Subject 1",
				subjectCode: "Subject Code",
				subjectDescription: "Subject Description",
				courseList: [],
			};
			const getCustomSpy = vi
				.spyOn(localStorageDB, "getCustom")
				.mockReturnValue(subjects);
			const setJSONSpy = vi.spyOn(localStorageDB, "setJSON");

			const result = subjectAPI.addSubject(newSubject);

			expect(localStorageDB.getCustom).toHaveBeenCalledWith(
				DBSubjectConstants.SUBJECT_LIST,
				subjectAPI._convertDBtoObj,
			);
			// expect(localStorageDB.setJSON).toHaveBeenCalledWith(
			// 	DBSubjectConstants.SUBJECT_LIST,
			// 	subjects,
			// );
			expect(result.subjectName).toEqual(newSubject.subjectName);
			expect(result.subjectCode).toEqual(newSubject.subjectCode);
			expect(result.subjectDescription).toEqual(
				newSubject.subjectDescription,
			);
			expect(result.courseList).toEqual(newSubject.courseList);
			expect(result.order).toEqual(subjects.length);
			getCustomSpy.mockRestore();
		},
	);

	it("handles an error and returns null", () => {
		const newSubject = {
			subjectName: "Subject 1",
			subjectCode: "Subject Code",
			subjectDescription: "Subject Description",
			courseList: [],
		};
		const getCustomSpy = vi
			.spyOn(localStorageDB, "getCustom")
			.mockReturnValue(subjects1);
		const saveSubjectsSpy = vi
			.spyOn(subjectAPI, "_saveSubjects")
			.mockImplementation(() => {
				throw new Error("Test Error");
			});

		const result = subjectAPI.addSubject(newSubject);

		expect(handler.errorWithPopup).toHaveBeenCalled("Test Error");
		expect(result).toEqual(null);
		getCustomSpy.mockRestore();
		saveSubjectsSpy.mockRestore();
	});
});

describe("SUBJECT API - deleteAllSubjects", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("deletes all subjects from Local Storage", () => {
		const deleteKeysSpy = vi.spyOn(localStorageDB, "deleteKeys");

		SubjectAPI.deleteAllSubjects();

		expect(localStorageDB.deleteKeys).toHaveBeenCalledWith([
			DBSubjectConstants.SUBJECT_LIST,
		]);
		deleteKeysSpy.mockRestore();
	});

	it("handles an error and returns null", () => {
		const deleteKeysSpy = vi
			.spyOn(localStorageDB, "deleteKeys")
			.mockImplementation(() => {
				throw new Error("Test Error");
			});

		SubjectAPI.deleteAllSubjects();

		expect(handler.errorWithPopup).toHaveBeenCalled("Test Error");
		deleteKeysSpy.mockRestore();
	});
});
