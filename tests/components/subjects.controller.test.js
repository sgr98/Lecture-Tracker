// @vitest-environment jsdom

import {
	HTMLAttributesConstants,
	ElementModuleName,
	DisplayText,
} from "../../src/constants/HTMLConstants.js";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { domManipulation } from "../../src/utils/domManipulation.js";
import { handler } from "../../src/utils/handler.js";
import { SubjectController } from "../../src/components/subjects/subjects.controller.js";

const SIMULATED_DOM_FAILURE = "Simulated DOM Failure";

const { SUBJECT_MODULE } = ElementModuleName;
const { STAGE } = HTMLAttributesConstants;

vi.mock("../../src/utils/handler.js", () => ({
	handler: {
		errorWithPopup: vi.fn(),
		error: vi.fn(),
	},
}));

describe("COMPONENTS - SUBJECT CONTROLLER - SubjectsController", () => {
	let element;
	let subjectController;

	beforeEach(() => {
		vi.clearAllMocks();
		element = document.createElement("div");
		element.id = STAGE;
		document.body.appendChild(element);
		subjectController = new SubjectController(SUBJECT_MODULE);
	});

	afterEach(() => {
		element.remove();
		element = null;
		subjectController = null;
	});

	it("should add the subject section to stage", () => {
		subjectController.addComponent()
	});

	it("should throw an error", () => {});
});
