// @vitest-environment jsdom

import {
	HTMLPopupAttributesConstants,
	DisplayText,
} from "../../src/constants/HTMLConstants.js";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { domManipulation } from "../../src/utils/domManipulation.js";
import { handler } from "../../src/utils/handler.js";
import {
	AlertPopupController,
	InfoPopupController,
	WarningPopupController,
	ErrorPopupController,
	SuccessPopupController,
	CustomPopupController,
} from "../../src/components/common/popup/popup.controller.js";

const SIMULATED_DOM_FAILURE = "Simulated DOM Failure";

const { POPUP, CLOSE, ALERT, INFO, WARNING, ERROR, SUCCESS, CUSTOM } =
	HTMLPopupAttributesConstants;
const { ALERT_TEXT } = DisplayText.popup;
const { POPUP_TITLE, POPUP_DESCRIPTION } = HTMLPopupAttributesConstants;

vi.mock("../../src/utils/handler.js", () => ({
	handler: {
		errorWithPopup: vi.fn(),
		error: vi.fn(),
	},
}));

describe("COMPONENTS - POPUP CONTROLLER - PopupController", () => {
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
			moduleName: ALERT,
			moduleTitle: ALERT_TEXT,
			AnyController: AlertPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: INFO,
			moduleTitle: "ⓘ Info",
			AnyController: InfoPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: WARNING,
			moduleTitle: "⚠ Warning",
			AnyController: WarningPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: ERROR,
			moduleTitle: "‼ Error",
			AnyController: ErrorPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: SUCCESS,
			moduleTitle: "✅ Success",
			AnyController: SuccessPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: CUSTOM,
			moduleTitle: "Test Title",
			AnyController: CustomPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
	])(
		"should add a $moduleName popup as defined",
		({ moduleName, moduleTitle, AnyController, description }) => {
			let anyController;
			if (AnyController === CustomPopupController) {
				anyController = new AnyController(description, moduleTitle);
			} else {
				anyController = new AnyController(description);
			}
			anyController.addComponent();

			const rootComponent = document.getElementById(elementId);
			const popupComponent = document.getElementById(
				`${moduleName}-${POPUP}-1`,
			);
			const popupTitleComponent = document.getElementById(
				`${moduleName}-1-${POPUP_TITLE}`,
			);
			const popupDescriptionComponent = document.getElementById(
				`${moduleName}-1-${POPUP_DESCRIPTION}`,
			);
			const popupCloseButtonComponent = document.getElementById(
				`${CLOSE}-${moduleName}-1-${POPUP}`,
			);

			expect(rootComponent).not.toBe(null);
			expect(rootComponent).not.toBe(undefined);

			expect(popupComponent).not.toBe(null);
			expect(popupComponent).not.toBe(undefined);

			expect(popupTitleComponent).not.toBe(null);
			expect(popupTitleComponent).not.toBe(undefined);
			expect(popupTitleComponent.textContent.trim()).toBe(moduleTitle);

			expect(popupDescriptionComponent).not.toBe(undefined);
			expect(popupDescriptionComponent).not.toBe(null);
			expect(popupDescriptionComponent.textContent.trim()).toBe(
				description,
			);

			expect(popupCloseButtonComponent).not.toBe(null);
			expect(popupCloseButtonComponent).not.toBe(undefined);
		},
	);

	it.each([
		{
			moduleName: ALERT,
			AnyController: AlertPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: INFO,
			AnyController: InfoPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: WARNING,
			AnyController: WarningPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: ERROR,
			AnyController: ErrorPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: SUCCESS,
			AnyController: SuccessPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
		{
			moduleName: CUSTOM,
			moduleTitle: "Test Title",
			AnyController: CustomPopupController,
			description:
				"Laboris Lorem aliquip dolor deserunt labore fugiat nisi exercitation.",
		},
	])(
		"should throw an error - $moduleName popup",
		({ moduleName, moduleTitle, AnyController, description }) => {
			const domSpy = vi
				.spyOn(domManipulation, "addHTMLStringToDomById")
				.mockImplementation(() => {
					throw new Error(SIMULATED_DOM_FAILURE);
				});

			const anyController = new AnyController(description);
			anyController.addComponent();

			const rootComponent = document.getElementById(elementId);
			const popupComponent = document.getElementById(
				`${moduleName}-${POPUP}-1`,
			);

			expect(handler.error).toHaveBeenCalledWith(
				new Error(SIMULATED_DOM_FAILURE),
			);
			expect(rootComponent).not.toBe(null);
			expect(rootComponent).not.toBe(undefined);
			expect(popupComponent).toBe(null);
			domSpy.mockRestore();
		},
	);
});
