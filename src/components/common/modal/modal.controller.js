import {
	HTMLAttributesConstants,
	HTMLModalAttributesConstants,
	DisplayText,
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
const { FORM_FIELDS_NOT_FILLED } = DisplayText.modal;

// NOTE: Currently unused
const mergeFormFields = (formFieldValues, fields) => {
	const mergedMap = new Map();
	fields.forEach((field) => {
		mergedMap.set(field.name, { ...field });
	});

	const mergedFormFields = formFieldValues.map((formField) => {
		if (mergedMap.has(formField.name)) {
			const field = mergedMap.get(formField.name);
			formField.inputTag = field.inputTag;
		}
		return formField;
	});
	return mergedFormFields;
};

export class ModalController extends Controller {
	constructor(moduleName, content, formSubmitCallback, options = {}) {
		super(moduleName);
		const { fields } = content;
		this._content = content;
		this._fields = fields ?? [];
		this._formSubmitCallback = formSubmitCallback;
		this._options = {
			removeOnClose: false,
			...options,
		};
		this._elementId = `${moduleName}-${MODAL}`;
	}

	addComponent() {
		try {
			const modalContent = {
				...this._content,
				fields: this._fields,
			};
			const modalView = new ModalView(this._moduleName, modalContent);
			const modalHTML = modalView.generateHTML();
			domManipulation.addHTMLStringToDomById(ROOT, modalHTML);
			this.addEventListeners(this._moduleName);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	open() {
		try {
			const modal = document.getElementById(this._elementId);
			if (domManipulation.isElementInDOM(modal)) {
				modal.style.display = "flex";
			}
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	removeComponent() {
		try {
			domManipulation.removeElementById(this._elementId);
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
			const modal = document.getElementById(this._elementId);
			const closeModalButton = document.getElementById(
				`${CLOSE}-${moduleName}-${MODAL}`,
			);

			closeModalButton.addEventListener("click", () => {
				modal.style.display = "none";
				if (this._options.removeOnClose) {
					this.removeComponent();
				}
			});

			modal.addEventListener("click", (event) => {
				if (event.target === modal) {
					modal.style.display = "none";
					if (this._options.removeOnClose) {
						this.removeComponent();
					}
				}
			});
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_modalFormSubmitEventListeners() {
		try {
			const moduleName = this._moduleName;
			const modal = document.getElementById(this._elementId);
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
				throw new Error(FORM_FIELDS_NOT_FILLED);
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

	prefillForm(formFieldValues) {
		// const formValues = mergeFormFields(formFieldValues, this._fields);
		formFieldValues.forEach((formField) => {
			this._setFormFieldValued(formField);
		});
	}

	_setFormFieldValued(formField) {
		const { name, value } = formField;
		const moduleName = this._moduleName;
		const inputElement = document.getElementById(
			`${moduleName}-${MODAL}-${name}-${INPUT}`,
		);
		inputElement.value = value;
	}
}
