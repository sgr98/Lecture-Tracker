// @vitest-environment jsdom

import { HTMLFieldAttributesConstants } from "../../src/constants/HTMLConstants.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../src/utils/enum.js";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { domManipulation } from "../../src/utils/domManipulation.js";
import { InputView } from "../../src/components/common/input/input.view.js";

const { FIELD, INPUT, SYSTEM_DEFAULT } = HTMLFieldAttributesConstants;

const MODULE_NAME = "test-module";
const COMPONENT_NAME = "test-component";
const FIELD_NAME = `${FIELD}-name`;
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
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Text,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Password,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Email,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Number,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Date,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Datetime_Local,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Month,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Time,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Week,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Url,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Search,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Tel,
				isRequired: false,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Input,
				inputType: HTMLInputTypeEnum.Color,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Textarea,
				inputType: HTMLInputTypeEnum.Text,
				isRequired: true,
			},
		},
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: HTMLInputTagEnum.Textarea,
				inputType: HTMLInputTypeEnum.Date,
				isRequired: false,
			},
		},
	])("should add an input as defined by field", ({ field }) => {
		const { name, placeholder, inputTag, inputType, isRequired } = field;
		const inputView = new InputView(MODULE_NAME, COMPONENT_NAME, field);
		const inputHTML = inputView.generateHTML();
		domManipulation.addHTMLStringToDomById(elementId, inputHTML);

		const rootComponent = document.getElementById(elementId);
		const inputComponent = document.getElementById(
			`${MODULE_NAME}-${COMPONENT_NAME}-${name}-${INPUT}`,
		);

		expect(rootComponent).not.toBe(null);
		expect(rootComponent).not.toBe(undefined);

		expect(inputComponent).not.toBe(null);
		expect(inputComponent).not.toBe(undefined);
		expect(inputComponent.tagName.toLowerCase()).toBe(inputTag);
		expect(inputComponent.placeholder).toBe(placeholder);
		if (inputTag === HTMLInputTagEnum.Input) {
			expect(inputComponent.type.toLowerCase()).toBe(inputType);
		} else if (inputTag === HTMLInputTagEnum.Textarea) {
			expect(inputComponent.type.toLowerCase()).toBe(
				HTMLInputTypeEnum.Textarea,
			);
		}
		expect(inputComponent.required).toBe(isRequired);
	});

	it.each([
		{
			field: {},
		},
		{
			field: {
				name: null,
				placeholder: null,
				inputTag: null,
				inputType: null,
				isRequired: null,
			},
		},
	])(
		"should set default properties for field attributes and use them for input",
		({ field }) => {
			const inputView = new InputView(MODULE_NAME, COMPONENT_NAME, field);
			const inputHTML = inputView.generateHTML();
			domManipulation.addHTMLStringToDomById(elementId, inputHTML);

			const rootComponent = document.getElementById(elementId);
			const inputComponent = document.getElementById(
				`${MODULE_NAME}-${COMPONENT_NAME}-${SYSTEM_DEFAULT}-${INPUT}`,
			);

			expect(rootComponent).not.toBe(null);
			expect(rootComponent).not.toBe(undefined);

			expect(inputComponent).not.toBe(null);
			expect(inputComponent).not.toBe(undefined);
			expect(inputComponent.tagName.toLowerCase()).toBe(
				inputView._DEFAULT_INPUT_TAG,
			);
			expect(inputComponent.type.toLowerCase()).toBe(
				inputView._DEFAULT_INPUT_TYPE,
			);
			expect(inputComponent.placeholder).toBe(SYSTEM_DEFAULT);
			expect(inputComponent.required).toBe(false);
		},
	);

	it.each([
		{
			field: {
				name: FIELD_NAME,
				placeholder: FIELD_PLACEHOLDER,
				inputTag: "",
				inputType: HTMLInputTypeEnum.Text,
				isRequired: false,
			},
		},
	])(
		"should have no html string when field is not defined properly",
		({ field }) => {
			const { name } = field;
			const inputView = new InputView(MODULE_NAME, COMPONENT_NAME, field);
			const inputHTML = inputView.generateHTML();

			const rootComponent = document.getElementById(elementId);
			const inputComponent = document.getElementById(
				`${MODULE_NAME}-${COMPONENT_NAME}-${name}-${INPUT}`,
			);

			expect(rootComponent).not.toBe(null);
			expect(rootComponent).not.toBe(undefined);
			expect(inputComponent).toBe(null);
			expect(inputHTML).toBe("");
		},
	);
});
