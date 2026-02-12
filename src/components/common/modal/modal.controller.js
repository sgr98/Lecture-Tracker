import {
	HTMLAttributesConstants,
	HTMLModalAttributesConstants,
} from "../../../constants/HTMLConstants.js";
import { ModalView } from "./modal.view.js";
import { Controller } from "../../controller.js";
import { domManipulation } from "../../../utils/domManipulation.js";
import { handler } from "../../../utils/handler.js";
import {
	isInputValueNullOrEmpty,
	getDefaultInputValue,
} from "../../../utils/common.js";

const { MODAL, MODAL_FORM, CLOSE, INPUT } = HTMLModalAttributesConstants;
const { ROOT } = HTMLAttributesConstants;

export class ModalController extends Controller {
	constructor(moduleName, title, description, fields, formSubmitCallback) {
		super(moduleName);
		this._title = title;
		this._description = description ?? "";
		this._fields = fields ?? [];
		this._formSubmitCallback = formSubmitCallback;
	}

	addComponent() {
		try {
			const modalView = new ModalView(
				this._moduleName,
				this._title,
				this._description,
				this._fields,
			);
			const modalHTML = modalView.generateHTML();
			domManipulation.addHTMLStringToDomById(ROOT, modalHTML);
			this.addEventListeners(this._moduleName);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	addEventListeners() {
		try {
			this._closeModalEventListener();
			this._modalFormSubmitEventListeners();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_closeModalEventListener() {
		try {
			const moduleName = this._moduleName;
			const modal = document.getElementById(`${moduleName}-${MODAL}`);
			const closeModalButton = document.getElementById(
				`${CLOSE}-${moduleName}-${MODAL}`,
			);

			closeModalButton.addEventListener("click", () => {
				modal.style.display = "none";
			});

			modal.addEventListener("click", (event) => {
				if (event.target === modal) {
					modal.style.display = "none";
				}
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_modalFormSubmitEventListeners() {
		try {
			const moduleName = this._moduleName;
			const modal = document.getElementById(`${moduleName}-${MODAL}`);
			const modalForm = document.getElementById(
				`${moduleName}-${MODAL_FORM}`,
			);

			modalForm.addEventListener("submit", (event) => {
				event.preventDefault();
				let formFields = this._fields.map((field) => {
					return this._extractFormValues(field);
				});
				this._formSubmitCallback(formFields);

				modal.style.display = "none";
				modalForm.reset();
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_extractFormValues(field) {
		try {
			const moduleName = this._moduleName;
			const { name, inputType, isRequired, mapTo } = field;
			const fieldElement = document.getElementById(
				`${moduleName}-${MODAL}-${name}-${INPUT}`,
			);

			let value = fieldElement?.value;
			if (isRequired && isInputValueNullOrEmpty(value, inputType)) {
				throw new Error("Some of the required fields are empty.");
			}
			value = value ?? getDefaultInputValue(inputType);

			const formField = {
				name,
				value,
				mapTo,
			};
			return formField;
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
