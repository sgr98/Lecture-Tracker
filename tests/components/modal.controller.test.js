// @vitest-environment jsdom

import {
	HTMLModalAttributesConstants,
	HTMLFieldAttributesConstants,
} from "../../src/constants/HTMLConstants.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../src/utils/enum.js";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { domManipulation } from "../../src/utils/domManipulation.js";
import { handler } from "../../src/utils/handler.js";
import { ModalController } from "../../src/components/common/modal/modal.controller.js";

const { MODAL, MODAL_TITLE, MODAL_DESCRIPTION, MODAL_FORM, MODAL_ADD_BUTTON } =
	HTMLModalAttributesConstants;
const { FIELD, INPUT, LABEL } = HTMLFieldAttributesConstants;

const MODULE = "test";
const MODULE_TITLE = "test title";
const MODULE_DESCRIOPTION = "test description";
const FIELD1 = `${FIELD}-1`;
const FIELD1_LABEL = `${FIELD1}-${LABEL}`;
const FIELD1_PLACEHOLDER = `${FIELD1}-placeholder`;
const FIELD2 = `${FIELD}-2`;
const FIELD2_LABEL = `${FIELD2}-${LABEL}`;
const FIELD2_PLACEHOLDER = `${FIELD2}-placeholder`;
const FIELD3 = `${FIELD}-3`;
const FIELD3_LABEL = `${FIELD3}-${LABEL}`;
const FIELD3_PLACEHOLDER = `${FIELD3}-placeholder`;
const FIELDS = [
	{
		name: FIELD1,
		label: FIELD1_LABEL,
		placeholder: FIELD1_PLACEHOLDER,
		inputTag: HTMLInputTagEnum.Input,
		inputType: HTMLInputTypeEnum.Text,
		isRequired: false,
		mapTo: FIELD1,
	},
	{
		name: FIELD2,
		label: FIELD2_LABEL,
		placeholder: FIELD2_PLACEHOLDER,
		inputTag: HTMLInputTagEnum.Textarea,
		inputType: HTMLInputTypeEnum.Text,
		isRequired: true,
		mapTo: FIELD2,
	},
	{
		name: FIELD3,
		label: FIELD3_LABEL,
		placeholder: FIELD3_PLACEHOLDER,
		inputTag: HTMLInputTagEnum.Input,
		inputType: HTMLInputTypeEnum.Password,
		isRequired: true,
		mapTo: FIELD3,
	},
];
const SIMULATED_DOM_FAILURE = "Simulated DOM Failure";

vi.mock("../../src/utils/handler.js", () => ({
	handler: {
		errorWithPopup: vi.fn(),
		error: vi.fn(),
	},
}));

describe("COMPONENTS - MODAL CONTROLLER - ModalController", () => {
	let element;
	const elementId = "root";
	let modalController;

	beforeEach(() => {
		vi.clearAllMocks();
		element = document.createElement("div");
		element.id = elementId;
		document.body.appendChild(element);

		modalController = new ModalController(
			MODULE,
			MODULE_TITLE,
			MODULE_DESCRIOPTION,
			FIELDS,
			(fields) => {},
		);
	});

	afterEach(() => {
		element.remove();
		element = null;
		modalController = null;
	});

	it("should add a modal as defined", () => {
		modalController.addComponent();

		const rootComponent = document.getElementById(elementId);
		const modalComponent = document.getElementById(`${MODULE}-${MODAL}`);
		const modalTitleComponent = document.getElementById(
			`${MODULE}-${MODAL_TITLE}`,
		);
		const modalDescriptionComponent = document.getElementById(
			`${MODULE}-${MODAL_DESCRIPTION}`,
		);
		const modalFormComponent = document.getElementById(
			`${MODULE}-${MODAL_FORM}`,
		);
		const modalFormField1Component = document.getElementById(
			`${MODULE}-${MODAL}-${FIELD1}-${FIELD}`,
		);
		const modalFormField1LabelComponent = document.getElementById(
			`${MODULE}-${MODAL}-${FIELD1}-${LABEL}`,
		);
		const modalFormField1InputComponent = document.getElementById(
			`${MODULE}-${MODAL}-${FIELD1}-${INPUT}`,
		);
		const modalFormField2Component = document.getElementById(
			`${MODULE}-${MODAL}-${FIELD2}-${FIELD}`,
		);
		const modalFormField2LabelComponent = document.getElementById(
			`${MODULE}-${MODAL}-${FIELD2}-${LABEL}`,
		);
		const modalFormField2InputComponent = document.getElementById(
			`${MODULE}-${MODAL}-${FIELD2}-${INPUT}`,
		);
		const modalFormField3Component = document.getElementById(
			`${MODULE}-${MODAL}-${FIELD3}-${FIELD}`,
		);
		const modalFormField3LabelComponent = document.getElementById(
			`${MODULE}-${MODAL}-${FIELD3}-${LABEL}`,
		);
		const modalFormField3InputComponent = document.getElementById(
			`${MODULE}-${MODAL}-${FIELD3}-${INPUT}`,
		);
		const modalFormSubmitComponent = document.getElementById(
			`${MODULE}-${MODAL_ADD_BUTTON}`,
		);

		expect(rootComponent).not.toBe(null);
		expect(rootComponent).not.toBe(undefined);

		expect(modalComponent).not.toBe(null);
		expect(modalComponent).not.toBe(undefined);

		expect(modalTitleComponent).not.toBe(null);
		expect(modalTitleComponent).not.toBe(undefined);
		expect(modalTitleComponent.textContent.trim()).toBe(MODULE_TITLE);

		expect(modalDescriptionComponent).not.toBe(undefined);
		expect(modalDescriptionComponent).not.toBe(null);
		expect(modalDescriptionComponent.textContent.trim()).toBe(
			MODULE_DESCRIOPTION,
		);

		expect(modalFormComponent).not.toBe(null);
		expect(modalFormComponent).not.toBe(undefined);

		expect(modalFormField1Component).not.toBe(null);
		expect(modalFormField1Component).not.toBe(undefined);
		expect(modalFormField1LabelComponent).not.toBe(null);
		expect(modalFormField1LabelComponent).not.toBe(undefined);
		expect(modalFormField1LabelComponent.textContent.trim()).toBe(
			`${FIELD1_LABEL}`,
		);
		expect(modalFormField1InputComponent).not.toBe(null);
		expect(modalFormField1InputComponent).not.toBe(undefined);
		expect(modalFormField1InputComponent.tagName.toLowerCase()).toBe(
			"input",
		);
		expect(modalFormField1InputComponent.type.toLowerCase()).toBe("text");
		expect(modalFormField1InputComponent.placeholder).toBe(
			FIELD1_PLACEHOLDER,
		);
		expect(modalFormField1InputComponent.required).toBe(false);

		expect(modalFormField2Component).not.toBe(null);
		expect(modalFormField2Component).not.toBe(undefined);
		expect(modalFormField2LabelComponent).not.toBe(null);
		expect(modalFormField2LabelComponent).not.toBe(undefined);
		expect(modalFormField2LabelComponent.textContent.trim()).toBe(
			`${FIELD2_LABEL}*`,
		);
		expect(modalFormField2InputComponent).not.toBe(null);
		expect(modalFormField2InputComponent).not.toBe(undefined);
		expect(modalFormField2InputComponent.tagName.toLowerCase()).toBe(
			"textarea",
		);
		expect(modalFormField2InputComponent.name).toBe(
			`${MODULE}-${MODAL}-${FIELD2}-${INPUT}`,
		);
		expect(modalFormField2InputComponent.placeholder).toBe(
			FIELD2_PLACEHOLDER,
		);
		// expect(modalFormField2InputComponent.required).toBe(true);

		expect(modalFormField3Component).not.toBe(null);
		expect(modalFormField3Component).not.toBe(undefined);
		expect(modalFormField3LabelComponent).not.toBe(null);
		expect(modalFormField3LabelComponent).not.toBe(undefined);
		expect(modalFormField3LabelComponent.textContent.trim()).toBe(
			`${FIELD3_LABEL}*`,
		);
		expect(modalFormField3InputComponent).not.toBe(null);
		expect(modalFormField3InputComponent).not.toBe(undefined);
		expect(modalFormField3InputComponent.tagName.toLowerCase()).toBe(
			"input",
		);
		expect(modalFormField3InputComponent.type.toLowerCase()).toBe(
			"password",
		);
		expect(modalFormField3InputComponent.placeholder).toBe(
			FIELD3_PLACEHOLDER,
		);
		expect(modalFormField3InputComponent.required).toBe(true);

		expect(modalFormSubmitComponent).not.toBe(null);
		expect(modalFormSubmitComponent).not.toBe(undefined);
	});

	it("throw an error", () => {
		const domSpy = vi
			.spyOn(domManipulation, "addHTMLStringToDomById")
			.mockImplementation(() => {
				throw new Error(SIMULATED_DOM_FAILURE);
			});

		modalController.addComponent();

		const rootComponent = document.getElementById(elementId);
		const modalComponent = document.getElementById(`${MODULE}-${MODAL}`);

		expect(handler.errorWithPopup).toHaveBeenCalled(SIMULATED_DOM_FAILURE);
		expect(rootComponent).not.toBe(null);
		expect(rootComponent).not.toBe(undefined);
		expect(modalComponent).toBe(null);
		domSpy.mockRestore();
	});
});
