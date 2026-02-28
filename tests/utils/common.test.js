// @vitest-environment node

import { describe, it, expect, vi } from "vitest";
import {
	isValueNull,
	isStringNullOrEmpty,
	isArrayNullOrEmpty,
	isObjectNullOrEmpty,
	getStringValueOrDefault,
	getNumberValueOrDefault,
	getBooleanValueOrDefault,
	getArrayValueOrDefault,
	getObjectValueOrDefault,
	isInputValueNullOrEmpty,
	getDefaultInputValue,
} from "../../src/utils/common.js";
import { HTMLInputTypeEnum } from "../../src/utils/enum.js";

describe("UTILS - COMMMON - isValueNull Function", () => {
	it("should check if blank is null", () => {
		expect(isValueNull()).toBe(true);
	});

	it("should check if null is null", () => {
		expect(isValueNull(null)).toBe(true);
	});

	it("should check if undefined is null", () => {
		expect(isValueNull(undefined)).toBe(true);
	});

	it("should check if {} is not null", () => {
		expect(isValueNull({})).toBe(false);
	});

	it("should check if {a: 1, b: 'name'} is not null", () => {
		expect(isValueNull({ a: 1, b: "name" })).toBe(false);
	});

	it("should check if [] is not null", () => {
		expect(isValueNull([])).toBe(false);
	});

	it("should check if ['a', 3, {}] is not null", () => {
		expect(isValueNull(["a", 3, {}])).toBe(false);
	});

	it("should check if [1, 2, 3, 4, 5] is not null", () => {
		expect(isValueNull([1, 2, 3, 4, 5])).toBe(false);
	});

	it("should check if '' is not null", () => {
		expect(isValueNull("")).toBe(false);
	});

	it("should check if 'abcd' is not null", () => {
		expect(isValueNull("abcd")).toBe(false);
	});

	it("should check if 0 is not null", () => {
		expect(isValueNull(0)).toBe(false);
	});

	it("should check if 367386 is not null", () => {
		expect(isValueNull(367386)).toBe(false);
	});

	it("should check if 367386 is not null", () => {
		expect(isValueNull(367386)).toBe(false);
	});
});

describe("UTILS - COMMMON - isStringNullOrEmpty Function", () => {
	it("should check if blank is null or empty", () => {
		expect(isStringNullOrEmpty()).toBe(true);
	});

	it("should check if null is null or empty", () => {
		expect(isStringNullOrEmpty(null)).toBe(true);
	});

	it("should check if undefined is null or empty", () => {
		expect(isStringNullOrEmpty(undefined)).toBe(true);
	});

	it("should check if '' is null or empty", () => {
		expect(isStringNullOrEmpty("")).toBe(true);
	});

	it("should check if 'abcd' is not null or empty", () => {
		expect(isStringNullOrEmpty("abcd")).toBe(false);
	});
});

describe("UTILS - COMMMON - isArrayNullOrEmpty Function", () => {
	it("should check if blank is null or empty", () => {
		expect(isArrayNullOrEmpty()).toBe(true);
	});

	it("should check if null is null or empty", () => {
		expect(isArrayNullOrEmpty(null)).toBe(true);
	});

	it("should check if undefined is null or empty", () => {
		expect(isArrayNullOrEmpty(undefined)).toBe(true);
	});

	it("should check if [] is null or empty", () => {
		expect(isArrayNullOrEmpty([])).toBe(true);
	});

	it("should check if ['abcd', 1, 2] is not null or empty", () => {
		expect(isArrayNullOrEmpty(["abcd", 1, 2])).toBe(false);
	});
});

describe("UTILS - COMMMON - isObjectNullOrEmpty Function", () => {
	it("should check if blank is null or empty", () => {
		expect(isObjectNullOrEmpty()).toBe(true);
	});

	it("should check if null is null or empty", () => {
		expect(isObjectNullOrEmpty(null)).toBe(true);
	});

	it("should check if undefined is null or empty", () => {
		expect(isObjectNullOrEmpty(undefined)).toBe(true);
	});

	it("should check if {} is null or empty", () => {
		expect(isObjectNullOrEmpty({})).toBe(true);
	});

	it("should check if {a: 1, b: 'name'} is not null or empty", () => {
		expect(isObjectNullOrEmpty({ a: 1, b: "name" })).toBe(false);
	});
});

describe("UTILS - COMMMON - getStringValueOrDefault Function", () => {
	it("should check if default value for blank is ''", () => {
		expect(getStringValueOrDefault()).toEqual("");
	});

	it("should check if default value for null is ''", () => {
		expect(getStringValueOrDefault(null)).toEqual("");
	});

	it("should check if default value for undefined is ''", () => {
		expect(getStringValueOrDefault(undefined)).toEqual("");
	});

	it("should check if default value for '' is ''", () => {
		expect(getStringValueOrDefault("")).toEqual("");
	});

	it("should check if default value for 'abcd' is 'abcd'", () => {
		expect(getStringValueOrDefault("abcd")).toEqual("abcd");
	});
});

describe("UTILS - COMMMON - getNumberValueOrDefault Function", () => {
	it("should check if default value for blank is ''", () => {
		expect(getNumberValueOrDefault()).toEqual(0);
	});

	it("should check if default value for null is ''", () => {
		expect(getNumberValueOrDefault(null)).toEqual(0);
	});

	it("should check if default value for undefined is ''", () => {
		expect(getNumberValueOrDefault(undefined)).toEqual(0);
	});

	it("should check if default value for 0 is 0", () => {
		expect(getNumberValueOrDefault(0)).toEqual(0);
	});

	it("should check if default value for 100 is 100", () => {
		expect(getNumberValueOrDefault(100)).toEqual(100);
	});
});

describe("UTILS - COMMMON - getBooleanValueOrDefault Function", () => {
	it("should check if default value for blank is false", () => {
		expect(getBooleanValueOrDefault()).toEqual(false);
	});

	it("should check if default value for null is false", () => {
		expect(getBooleanValueOrDefault(null)).toEqual(false);
	});

	it("should check if default value for undefined is false", () => {
		expect(getBooleanValueOrDefault(undefined)).toEqual(false);
	});

	it("should check if default value for false is false", () => {
		expect(getBooleanValueOrDefault(false)).toEqual(false);
	});

	it("should check if default value for true is true", () => {
		expect(getBooleanValueOrDefault(true)).toEqual(true);
	});
});

describe("UTILS - COMMMON - getArrayValueOrDefault Function", () => {
	it("should check if default value for blank is []", () => {
		expect(getArrayValueOrDefault()).toEqual([]);
	});

	it("should check if default value for null is []", () => {
		expect(getArrayValueOrDefault(null)).toEqual([]);
	});

	it("should check if default value for undefined is []", () => {
		expect(getArrayValueOrDefault(undefined)).toEqual([]);
	});

	it("should check if default value for [] is []", () => {
		expect(getArrayValueOrDefault([])).toEqual([]);
	});

	it("should check if default value for ['a', 3, {}] is ['a', 3, {}]", () => {
		expect(getArrayValueOrDefault(["a", 3, {}])).toEqual(["a", 3, {}]);
	});

	it("should check if default value for [1, 2, 3, 4, 5] is [1, 2, 3, 4, 5]", () => {
		expect(getArrayValueOrDefault([1, 2, 3, 4, 5])).toEqual([
			1, 2, 3, 4, 5,
		]);
	});
});

describe("UTILS - COMMMON - getObjectValueOrDefault Function", () => {
	it("should check if default value for blank is {}", () => {
		expect(getObjectValueOrDefault()).toEqual({});
	});

	it("should check if default value for null is {}", () => {
		expect(getObjectValueOrDefault(null)).toEqual({});
	});

	it("should check if default value for undefined is {}", () => {
		expect(getObjectValueOrDefault(undefined)).toEqual({});
	});

	it("should check if default value for {} is {}", () => {
		expect(getObjectValueOrDefault({})).toEqual({});
	});

	it("should check if default value for {a: 1, b: 'name'} is {a: 1, b: 'name'}", () => {
		expect(getObjectValueOrDefault({ a: 1, b: "name" })).toEqual({
			a: 1,
			b: "name",
		});
	});
});

describe("UTILS - COMMMON - isInputValueNullOrEmpty Function", () => {
	it("should check if default value for blank is true", () => {
		expect(isInputValueNullOrEmpty()).toEqual(true);
	});

	it("should check if default value for null is true", () => {
		expect(isInputValueNullOrEmpty(null)).toEqual(true);
	});

	it("should check if default value for undefined is true", () => {
		expect(isInputValueNullOrEmpty(undefined)).toEqual(true);
	});

	it("should check if default value for null is true when inputType is null", () => {
		expect(isInputValueNullOrEmpty(null, null)).toEqual(true);
	});

	it("should check if default value for undefined is true when inputType is undefined", () => {
		expect(isInputValueNullOrEmpty(undefined, undefined)).toEqual(true);
	});

	it("should check if default value for null is true when inputType is Text", () => {
		expect(isInputValueNullOrEmpty(null, HTMLInputTypeEnum.Text)).toEqual(
			true,
		);
	});

	it("should check if default value for undefined is true when inputType is Text", () => {
		expect(
			isInputValueNullOrEmpty(undefined, HTMLInputTypeEnum.Text),
		).toEqual(true);
	});

	it("should check if default value for '' is true when inputType is Text", () => {
		expect(isInputValueNullOrEmpty("", HTMLInputTypeEnum.Text)).toEqual(
			true,
		);
	});

	it("should check if default value for null is true when inputType is Password", () => {
		expect(
			isInputValueNullOrEmpty(null, HTMLInputTypeEnum.Password),
		).toEqual(true);
	});

	it("should check if default value for undefined is true when inputType is Password", () => {
		expect(
			isInputValueNullOrEmpty(undefined, HTMLInputTypeEnum.Password),
		).toEqual(true);
	});

	it("should check if default value for '' is true when inputType is Password", () => {
		expect(isInputValueNullOrEmpty("", HTMLInputTypeEnum.Password)).toEqual(
			true,
		);
	});

	it("should check if default value for 'abcd' is true when inputType is Text", () => {
		expect(isInputValueNullOrEmpty("abcd", HTMLInputTypeEnum.Text)).toEqual(
			false,
		);
	});

	it("should check if default value for 'abcd' is true when inputType is Password", () => {
		expect(
			isInputValueNullOrEmpty("abcd", HTMLInputTypeEnum.Password),
		).toEqual(false);
	});

	it("should check if default value for 'abcd' is true when inputType is Email", () => {
		expect(
			isInputValueNullOrEmpty("abcd", HTMLInputTypeEnum.Email),
		).toEqual(false);
	});

	it("should check if default value for 'abcd' is true when inputType is Month", () => {
		expect(
			isInputValueNullOrEmpty("abcd", HTMLInputTypeEnum.Month),
		).toEqual(false);
	});

	it("should check if default value for 'abcd' is true when inputType is Week", () => {
		expect(isInputValueNullOrEmpty("abcd", HTMLInputTypeEnum.Week)).toEqual(
			false,
		);
	});

	it("should check if default value for 'abcd' is true when inputType is Url", () => {
		expect(isInputValueNullOrEmpty("abcd", HTMLInputTypeEnum.Url)).toEqual(
			false,
		);
	});

	it("should check if default value for 'abcd' is true when inputType is Search", () => {
		expect(
			isInputValueNullOrEmpty("abcd", HTMLInputTypeEnum.Search),
		).toEqual(false);
	});

	it("should check if default value for 'abcd' is true when inputType is Tel", () => {
		expect(isInputValueNullOrEmpty("abcd", HTMLInputTypeEnum.Tel)).toEqual(
			false,
		);
	});

	it("should check if default value for 'abcd' is true when inputType is Color", () => {
		expect(
			isInputValueNullOrEmpty("abcd", HTMLInputTypeEnum.Color),
		).toEqual(false);
	});

	it("should check if default value for 'abcd' is true when inputType is Number", () => {
		expect(isInputValueNullOrEmpty(5391, HTMLInputTypeEnum.Number)).toEqual(
			false,
		);
	});

	it("should check if default value for 'abcd' is true when inputType is Date", () => {
		expect(
			isInputValueNullOrEmpty(new Date(), HTMLInputTypeEnum.Date),
		).toEqual(false);
	});

	it("should check if default value for 'abcd' is true when inputType is Datetime_Local", () => {
		expect(
			isInputValueNullOrEmpty(
				new Date(),
				HTMLInputTypeEnum.Datetime_Local,
			),
		).toEqual(false);
	});

	it("should check if default value for 'abcd' is true when inputType is Time", () => {
		expect(
			isInputValueNullOrEmpty(new Date(), HTMLInputTypeEnum.Time),
		).toEqual(false);
	});
});

describe("UTILS - COMMMON - getDefaultInputValue Function", () => {
	it("should check if default value for inputType: blank is ''", () => {
		expect(getDefaultInputValue()).toEqual("");
	});

	it("should check if default value for inputType: null is ''", () => {
		expect(getDefaultInputValue(null)).toEqual("");
	});

	it("should check if default value for inputType: undefined is ''", () => {
		expect(getDefaultInputValue(undefined)).toEqual("");
	});

	it("should check if default value for inputType: Text is ''", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Text)).toEqual("");
	});

	it("should check if default value for inputType: Password is ''", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Password)).toEqual("");
	});

	it("should check if default value for inputType: Email is ''", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Email)).toEqual("");
	});

	it("should check if default value for inputType: Month is ''", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Month)).toEqual("");
	});

	it("should check if default value for inputType: Week is ''", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Week)).toEqual("");
	});

	it("should check if default value for inputType: Url is ''", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Url)).toEqual("");
	});

	it("should check if default value for inputType: Search is ''", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Search)).toEqual("");
	});

	it("should check if default value for inputType: Tel is ''", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Tel)).toEqual("");
	});

	it("should check if default value for inputType: Color is ''", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Color)).toEqual("");
	});

	it("should check if default value for inputType: Number is -1", () => {
		expect(getDefaultInputValue(HTMLInputTypeEnum.Number)).toEqual(-1);
	});

	it("should check if default value for inputType: Date is ''", () => {
		const mockDate = new Date(2022, 0, 1);
		vi.setSystemTime(mockDate);
		expect(getDefaultInputValue(HTMLInputTypeEnum.Date)).toEqual(
			new Date(),
		);
		vi.useRealTimers();
	});

	it("should check if default value for inputType: Datetime_Local is ''", () => {
		const mockDate = new Date(2022, 0, 1);
		vi.setSystemTime(mockDate);
		expect(getDefaultInputValue(HTMLInputTypeEnum.Datetime_Local)).toEqual(
			new Date(),
		);
		vi.useRealTimers();
	});

	it("should check if default value for inputType: Time is ''", () => {
		const mockDate = new Date(2022, 0, 1);
		vi.setSystemTime(mockDate);
		expect(getDefaultInputValue(HTMLInputTypeEnum.Time)).toEqual(
			new Date(),
		);
		vi.useRealTimers();
	});
});
