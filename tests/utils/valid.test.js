// @vitest-environment node

import { describe, it, expect, vi } from "vitest";
import { isInvalidSubject } from "../../src/utils/valid.js";

describe("UTILS - VALID - isInvalidSubject Object", () => {
	it.each([
		{ input: null },
		{ input: undefined },
		{ input: "" },
		{ input: "	 " },
	])("should be invalid subject id when input is '$input'", ({ input }) => {
		expect(isInvalidSubject.id(input)).toBe(true);
	});

	it.each([
		{ input: "a" },
		{ input: "1" },
		{ input: "ahuioigui3ghu9a88dy2g90s0" },
		{ input: "b3178c9c-be7d-4203-b207-4d08ae02197b" },
	])(
		"should not be invalid subject id when input is '$input'",
		({ input }) => {
			expect(isInvalidSubject.id(input)).toBe(false);
		},
	);

	it.each([
		{ input: null },
		{ input: undefined },
		{ input: "" },
		{ input: "	 " },
		{ input: 6546 },
		{ input: {} },
	])("should be invalid subject name when input is '$input'", ({ input }) => {
		expect(isInvalidSubject.name(input)).toBe(true);
	});

	it.each([
		{ input: "a" },
		{ input: "1" },
		{ input: "Subject 1" },
		{ input: "Mathematics" },
	])(
		"should not be invalid subject name when input is '$input'",
		({ input }) => {
			expect(isInvalidSubject.name(input)).toBe(false);
		},
	);

	it.each([
		{ input: null },
		{ input: undefined },
		{ input: "" },
		{ input: "	 " },
		{ input: 6546 },
		{ input: {} },
	])("should be invalid subject code when input is '$input'", ({ input }) => {
		expect(isInvalidSubject.code(input)).toBe(true);
	});

	it.each([
		{ input: "a" },
		{ input: "1" },
		{ input: "Subject Code 1" },
		{ input: "MA-101" },
	])(
		"should not be invalid subject code when input is '$input'",
		({ input }) => {
			expect(isInvalidSubject.code(input)).toBe(false);
		},
	);

	it.each([
		{ input: null },
		{ input: undefined },
		{ input: 6546 },
		{ input: {} },
	])(
		"should be invalid subject description when input is '$input'",
		({ input }) => {
			expect(isInvalidSubject.description(input)).toBe(true);
		},
	);

	it.each([
		{ input: "" },
		{ input: "	 " },
		{ input: "a" },
		{ input: "1" },
		{ input: "Subject description 1" },
		{ input: "Mathematics is the core of all subjects" },
	])(
		"should not be invalid subject description when input is '$input'",
		({ input }) => {
			expect(isInvalidSubject.description(input)).toBe(false);
		},
	);

	it.each([
		{ input: null },
		{ input: undefined },
		{ input: 6546 },
		{ input: {} },
		{ input: "	 " },
	])(
		"should be invalid subject course list when input is '$input'",
		({ input }) => {
			expect(isInvalidSubject.courseList(input)).toBe(true);
		},
	);

	it.each([{ input: [] }])(
		"should not be invalid subject course list when input is '$input'",
		({ input }) => {
			expect(isInvalidSubject.courseList(input)).toBe(false);
		},
	);
});
