// @vitest-environment jsdom

import { HTMLFieldAttributesConstants } from "../../src/constants/HTMLConstants.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../src/utils/enum.js";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { domManipulation } from "../../src/utils/domManipulation.js";
import { FieldView } from "../../src/components/common/field/field.view.js";

const { FIELD, LABEL, INPUT, SYSTEM_DEFAULT } = HTMLFieldAttributesConstants;

const MODULE_NAME = "test-module";
const COMPONENT_NAME = "test-component";
const FIELD_NAME = `${FIELD}-name`;
const FIELD_LABEL = `${FIELD}-${LABEL}`;
const FIELD_PLACEHOLDER = `${FIELD}-placeholder`;

describe("COMPONENTS - MODAL CONTROLLER - ModalController", () => {
	let element;
	const elementId = "root";

	beforeEach(() => {
		vi.clearAllMocks();
		element = document.createElement("div");
		element.id = elementId;
		document.body.appendChild(element);
	});

	afterEach(() => {
		element.remove();
		element = null;
	});

	it.each([
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Text,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Password,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Email,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Number,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Date,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Datetime_Local,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Month,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Time,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Week,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Url,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Search,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Tel,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Color,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Textarea,
				inputType: HTMLInputTypeEnum.Text,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				label: FIELD_LABEL,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Textarea,
				inputType: HTMLInputTypeEnum.Date,
				isRequired: false,
			},
		},
	])("should add an input as defined by field", ({ field }) => {
		const { name, label, isRequired } = field;
		const fieldView = new FieldView(MODULE_NAME, COMPONENT_NAME, field);
		const fieldHTML = fieldView.generateHTML();
		domManipulation.addHTMLStringToDomById(elementId, fieldHTML);

		const rootComponent = document.getElementById(elementId);
		const fieldComponent = document.getElementById(
			`${MODULE_NAME}-${COMPONENT_NAME}-${name}-${FIELD}`,
		);
		const fieldLabelComponent = document.getElementById(
			`${MODULE_NAME}-${COMPONENT_NAME}-${name}-${LABEL}`,
		);
		const inputId = `${MODULE_NAME}-${COMPONENT_NAME}-${name}-${INPUT}`;
		const fieldInputComponent = document.getElementById(inputId);
		const actualLabel = label + (isRequired ? "*" : "");

		expect(rootComponent).not.toBe(null);
		expect(rootComponent).not.toBe(undefined);

		expect(rootComponent).not.toBe(null);
		expect(rootComponent).not.toBe(undefined);

		expect(fieldComponent).not.toBe(null);
		expect(fieldComponent).not.toBe(undefined);

		expect(fieldLabelComponent).not.toBe(null);
		expect(fieldLabelComponent).not.toBe(undefined);
		expect(fieldLabelComponent.tagName.toLowerCase()).toBe("label");
		expect(fieldLabelComponent.textContent.trim()).toBe(actualLabel);

		expect(fieldInputComponent).not.toBe(null);
		expect(fieldInputComponent).not.toBe(undefined);
	});

	it.each([
		{
			field: {},
		},
		{
			field: {
				name: null,
				label: null,
				placeholder: null,
				inputTag: null,
				inputType: null,
				isRequired: null,
			},
		},
	])(
		"should set defined properties for field attributes and use them for input",
		({ field }) => {
			const fieldView = new FieldView(MODULE_NAME, COMPONENT_NAME, field);
			const fieldHTML = fieldView.generateHTML();
			domManipulation.addHTMLStringToDomById(elementId, fieldHTML);

			const rootComponent = document.getElementById(elementId);
			const fieldComponent = document.getElementById(
				`${MODULE_NAME}-${COMPONENT_NAME}-${SYSTEM_DEFAULT}-${FIELD}`,
			);
			const fieldLabelComponent = document.getElementById(
				`${MODULE_NAME}-${COMPONENT_NAME}-${SYSTEM_DEFAULT}-${LABEL}`,
			);
			const inputId = `${MODULE_NAME}-${COMPONENT_NAME}-${SYSTEM_DEFAULT}-${INPUT}`;
			const fieldInputComponent = document.getElementById(inputId);

			expect(rootComponent).not.toBe(null);
			expect(rootComponent).not.toBe(undefined);

			expect(fieldComponent).not.toBe(null);
			expect(fieldComponent).not.toBe(undefined);

			expect(fieldLabelComponent).not.toBe(null);
			expect(fieldLabelComponent).not.toBe(undefined);
			expect(fieldLabelComponent.tagName.toLowerCase()).toBe("label");
			expect(fieldLabelComponent.textContent.trim()).toBe(SYSTEM_DEFAULT);

			expect(fieldInputComponent).not.toBe(null);
			expect(fieldInputComponent).not.toBe(undefined);
		},
	);
});
