// @vitest-environment jsdom

import {
	HTMLModalAttributesConstants,
	HTMLFieldAttributesConstants,
	HTMLSubjectAttributesConstants,
	DisplayText,
	ElementModuleName,
} from "../../src/constants/HTMLConstants.js";
import { DBSubjectConstants } from "../../src/constants/DBConstants.js";

import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { domManipulation } from "../../src/utils/domManipulation.js";
import { handler } from "../../src/utils/handler.js";
import { AddSubjectModalController } from "../../src/components/subjects/addSubjectModal/addSubjectModal.controller.js";

const TEST_SUBJECT_NAME = "Subject Name";
const TEST_SUBJECT_CODE = "Subject Code";
const TEST_SUBJECT_DESC =
	"Subject Description Consequat deserunt laborum laboris elit tempor.";

const { MODAL, MODAL_TITLE, MODAL_DESCRIPTION, MODAL_FORM, MODAL_ADD_BUTTON } =
	HTMLModalAttributesConstants;
const { FIELD, INPUT, LABEL } = HTMLFieldAttributesConstants;
const {
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
} = HTMLSubjectAttributesConstants;
const { ADD_SUBJECT_MODULE } = ElementModuleName;
const {
	ADD_SUBJECT_MODAL_TITLE,
	ADD_SUBJECT_MODAL_DESCRIPTION,
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_PLACEHOLDER,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_PLACEHOLDER,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_PLACEHOLDER,
} = DisplayText.subject;

const MODULE = "add-subject-modal";
const SIMULATED_DOM_FAILURE = "Simulated DOM Failure";

vi.mock("../../src/utils/handler.js", () => ({
	handler: {
		errorWithPopup: vi.fn(),
		error: vi.fn(),
	},
}));

describe("COMPONENTS - ADD SUBJECT MODAL CONTROLLER - AddSubjectModalController", () => {
	let element;
	const elementId = "root";
	let addSubjectModalController;

	beforeEach(() => {
		vi.clearAllMocks();
		element = document.createElement("div");
		element.id = elementId;
		document.body.appendChild(element);

		addSubjectModalController = new AddSubjectModalController(
			MODULE,
			(newSubject) => {},
		);
	});

	afterEach(() => {
		element.remove();
		element = null;
		addSubjectModalController = null;
	});

	it("should add subject modal with all its fields", () => {
		addSubjectModalController.addComponent();

		const rootComponent = document.getElementById(elementId);
		const modalComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}`,
		);
		const modalTitleComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL_TITLE}`,
		);
		const modalDescriptionComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL_DESCRIPTION}`,
		);
		const modalFormComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL_FORM}`,
		);
		const subjectNameFieldComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD}-${FIELD}`,
		);
		const subjectNameFieldLabelComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD}-${LABEL}`,
		);
		const subjectNameFieldInputComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD}-${INPUT}`,
		);
		const subjectCodeFieldComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD}-${FIELD}`,
		);
		const subjectCodeFieldLabelComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD}-${LABEL}`,
		);
		const subjectCodeFieldInputComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD}-${INPUT}`,
		);
		const subjectDescFieldComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD}-${FIELD}`,
		);
		const subjectDescFieldLabelComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD}-${LABEL}`,
		);
		const subjectDescFieldInputComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD}-${INPUT}`,
		);
		const modalFormSubmitComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL_ADD_BUTTON}`,
		);

		expect(rootComponent).not.toBe(null);
		expect(rootComponent).not.toBe(undefined);

		expect(modalComponent).not.toBe(null);
		expect(modalComponent).not.toBe(undefined);

		expect(modalTitleComponent).not.toBe(null);
		expect(modalTitleComponent).not.toBe(undefined);
		expect(modalTitleComponent.textContent.trim()).toBe(
			ADD_SUBJECT_MODAL_TITLE,
		);

		expect(modalDescriptionComponent).not.toBe(undefined);
		expect(modalDescriptionComponent).not.toBe(null);
		expect(modalDescriptionComponent.textContent.trim()).toBe(
			ADD_SUBJECT_MODAL_DESCRIPTION,
		);

		expect(modalFormComponent).not.toBe(null);
		expect(modalFormComponent).not.toBe(undefined);

		expect(subjectNameFieldComponent).not.toBe(null);
		expect(subjectNameFieldComponent).not.toBe(undefined);
		expect(subjectNameFieldLabelComponent).not.toBe(null);
		expect(subjectNameFieldLabelComponent).not.toBe(undefined);
		expect(subjectNameFieldLabelComponent.textContent.trim()).toBe(
			`${ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_LABEL}*`,
		);
		expect(subjectNameFieldInputComponent).not.toBe(null);
		expect(subjectNameFieldInputComponent).not.toBe(undefined);
		expect(subjectNameFieldInputComponent.tagName.toLowerCase()).toBe(
			"input",
		);
		expect(subjectNameFieldInputComponent.type.toLowerCase()).toBe("text");
		expect(subjectNameFieldInputComponent.placeholder).toBe(
			ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_PLACEHOLDER,
		);
		expect(subjectNameFieldInputComponent.required).toBe(true);

		expect(subjectCodeFieldComponent).not.toBe(null);
		expect(subjectCodeFieldComponent).not.toBe(undefined);
		expect(subjectCodeFieldLabelComponent).not.toBe(null);
		expect(subjectCodeFieldLabelComponent).not.toBe(undefined);
		expect(subjectCodeFieldLabelComponent.textContent.trim()).toBe(
			`${ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_LABEL}*`,
		);
		expect(subjectCodeFieldInputComponent).not.toBe(null);
		expect(subjectCodeFieldInputComponent).not.toBe(undefined);
		expect(subjectCodeFieldInputComponent.tagName.toLowerCase()).toBe(
			"input",
		);
		expect(subjectCodeFieldInputComponent.type.toLowerCase()).toBe("text");
		expect(subjectCodeFieldInputComponent.placeholder).toBe(
			ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_PLACEHOLDER,
		);
		expect(subjectCodeFieldInputComponent.required).toBe(true);

		expect(subjectDescFieldComponent).not.toBe(null);
		expect(subjectDescFieldComponent).not.toBe(undefined);
		expect(subjectDescFieldLabelComponent).not.toBe(null);
		expect(subjectDescFieldLabelComponent).not.toBe(undefined);
		expect(subjectDescFieldLabelComponent.textContent.trim()).toBe(
			`${ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_LABEL}`,
		);
		expect(subjectDescFieldInputComponent).not.toBe(null);
		expect(subjectDescFieldInputComponent).not.toBe(undefined);
		expect(subjectDescFieldInputComponent.tagName.toLowerCase()).toBe(
			"textarea",
		);
		expect(subjectDescFieldInputComponent.type.toLowerCase()).toBe(
			"textarea",
		);
		expect(subjectDescFieldInputComponent.placeholder).toBe(
			ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_PLACEHOLDER,
		);
		expect(subjectDescFieldInputComponent.required).toBe(false);

		expect(modalFormSubmitComponent).not.toBe(null);
		expect(modalFormSubmitComponent).not.toBe(undefined);
	});

	it("should be able to add a new subject after filling a form and submitting it", () => {
		const formFields = [
			{
				name: ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD,
				value: TEST_SUBJECT_NAME,
				mapTo: DBSubjectConstants.SUBJECT_NAME,
			},
			{
				name: ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD,
				value: TEST_SUBJECT_CODE,
				mapTo: DBSubjectConstants.SUBJECT_CODE,
			},
			{
				name: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
				value: TEST_SUBJECT_DESC,
				mapTo: DBSubjectConstants.SUBJECT_DESCRIPTION,
			},
		];
		const addSubjectCallbackSpy = vi.spyOn(
			addSubjectModalController,
			"_addSubjectModalCallback",
		);

		addSubjectModalController.addComponent();

		const subjectNameFieldInputComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD}-${INPUT}`,
		);
		const subjectCodeFieldInputComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD}-${INPUT}`,
		);
		const subjectDescFieldInputComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}-${ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD}-${INPUT}`,
		);
		const modalFormSubmitComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL_ADD_BUTTON}`,
		);

		subjectNameFieldInputComponent.value = formFields[0].value;
		subjectCodeFieldInputComponent.value = formFields[1].value;
		subjectDescFieldInputComponent.value = formFields[2].value;

		expect(subjectNameFieldInputComponent.value).toBe(formFields[0].value);
		expect(subjectCodeFieldInputComponent.value).toBe(formFields[1].value);
		expect(subjectDescFieldInputComponent.value).toBe(formFields[2].value);

		modalFormSubmitComponent.click();

		expect(
			addSubjectModalController._addSubjectModalCallback,
		).toHaveBeenCalledWith(formFields);
		expect(subjectNameFieldInputComponent.value).toBe("");
		expect(subjectCodeFieldInputComponent.value).toBe("");
		expect(subjectDescFieldInputComponent.value).toBe("");

		addSubjectCallbackSpy.mockRestore();
	});

	it("throw an error", () => {
		const domSpy = vi
			.spyOn(domManipulation, "addHTMLStringToDomById")
			.mockImplementation(() => {
				throw new Error(SIMULATED_DOM_FAILURE);
			});

		addSubjectModalController.addComponent();

		const rootComponent = document.getElementById(elementId);
		const modalComponent = document.getElementById(
			`${ADD_SUBJECT_MODULE}-${MODAL}`,
		);

		expect(handler.errorWithPopup).toHaveBeenCalledWith(
			new Error(SIMULATED_DOM_FAILURE),
		);
		expect(rootComponent).not.toBe(null);
		expect(rootComponent).not.toBe(undefined);
		expect(modalComponent).toBe(null);
		domSpy.mockRestore();
	});
});
