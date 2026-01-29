import { HTMLModalAttributesConstants } from "../../constants/HTMLConstants.js";
import {
	getBooleanValueOrDefault,
	getStringValueOrDefault,
	isArrayNullOrEmpty,
	isObjectNullOrEmpty,
	isStringNullOrEmpty,
} from "../../utils/common.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../utils/enum.js";

const {
	MODAL,
	MODAL_CONTAINER,
	MODAL_TITLEBAR,
	MODAL_TITLE,
	MODAL_CLOSE_BUTTON,
	MODAL_DESCRIPTION,
	MODAL_FORM,
	MODAL_ADD_BUTTON,
	FIELD,
	MODAL_FIELD,
	MODAL_FIELD_LABEL,
	INPUT,
	MODAL_FIELD_TEXT_TEXTAREA,
	CLOSE,
	LABEL,
	MODAL_SUBMIT_BUTTON_TEXT,
} = HTMLModalAttributesConstants;

export const modalView = {
	DEFAULT_INPUT_TAG: HTMLInputTagEnum.Input,
	DEFAULT_INPUT_TYPE: HTMLInputTypeEnum.Text,
	DEFAULT_TEXT_AREA_ROWS: 5,
	DEFAULT_TEXT_AREA_MAX_LENGTH: 400,

	getDefaultFieldObject: () => {
		return {
			name: "default",
			label: "default",
			placeholder: "default",
			inputTag: modalView.DEFAULT_INPUT_TAG,
			inputType: modalView.DEFAULT_INPUT_TYPE,
			isRequired: false,
		};
	},

	generateModalDescriptionHTML: (moduleName, description = "") => {
		if (isStringNullOrEmpty(description)) {
			return "";
		}
		const descriptionHTML = `
            <div
                id="${moduleName}-${MODAL_DESCRIPTION}" 
                class="${MODAL_DESCRIPTION}"
            >
                ${description}
            </div>
        `;
		return descriptionHTML;
	},

	getFieldAttributes: (field) => {
		if (isObjectNullOrEmpty(field)) {
			return modalView.getDefaultFieldObject();
		}

		const name = getStringValueOrDefault(field.name);
		const label = getStringValueOrDefault(field.label);
		const placeholder = getStringValueOrDefault(field.placeholder);
		const inputTag = field.inputTag ?? modalView.DEFAULT_INPUT_TAG;
		const inputType = field.inputType ?? modalView.DEFAULT_INPUT_TYPE;
		const isRequired = getBooleanValueOrDefault(field.isRequired);
		return {
			name,
			label,
			placeholder,
			inputTag,
			inputType,
			isRequired,
		};
	},

	generateModalFormFieldInputHTML: (moduleName, field) => {
		const { name, label, placeholder, inputTag, inputType, isRequired } =
			field;
		const requiredInput = isRequired ? "required" : "";

		let fieldInputHTML = "";
		if (inputTag === HTMLInputTagEnum.Input) {
			fieldInputHTML = `
                <input
                    id="${moduleName}-${MODAL}-${name}-${INPUT}"
                    type="${inputType}"
                    ${requiredInput}
                    placeholder="${placeholder}"
                    class="modal-field-${inputType}-${INPUT}"
                />
            `;
		} else if (inputTag === HTMLInputTagEnum.Textarea) {
			const rows = modalView.DEFAULT_TEXT_AREA_ROWS;
			const maxlength = modalView.DEFAULT_TEXT_AREA_MAX_LENGTH;
			fieldInputHTML = `
                <textarea
                    id="${moduleName}-${MODAL}-${name}-${INPUT}"
                    name="${moduleName}-${MODAL}-${name}-${INPUT}"
                    rows="${rows}"
                    maxlength="${maxlength}"
                    placeholder="${placeholder}"
                    class="${MODAL_FIELD_TEXT_TEXTAREA}"
                ></textarea>
            `;
		}
		return fieldInputHTML;
	},

	generateModalFormFieldHTML: (moduleName, field) => {
		const { name, label, placeholder, inputTag, inputType, isRequired } =
			modalView.getFieldAttributes(field);

		const requiredLabel = isRequired ? "&#x2a;" : "";

		const fieldInputHTML = modalView.generateModalFormFieldInputHTML(
			moduleName,
			{
				name,
				label,
				placeholder,
				inputTag,
				inputType,
				isRequired,
			},
		);

		const fieldHTML = `
            <div
                id="${moduleName}-${MODAL}-${name}-${FIELD}"
                class="${MODAL_FIELD}"
            >
                <label 
                    id="${moduleName}-${MODAL}-${name}-${LABEL}"
                    for="${moduleName}-${MODAL}-${name}-${INPUT}"
                    class="${MODAL_FIELD_LABEL}"
                >
                    ${label}${requiredLabel}
                </label>
                ${fieldInputHTML}

            </div>
        `;

		return fieldHTML;
	},

	generateModalFormHTML: (moduleName, fields = []) => {
		if (isArrayNullOrEmpty(fields)) {
			return "";
		}

		const formFieldsHTML = fields
			.map((field) => {
				return modalView.generateModalFormFieldHTML(moduleName, field);
			})
			.join("");

		const formHTML = `
            <form
                id="${moduleName}-${MODAL_FORM}"
                class="${moduleName}-${MODAL_FORM} ${MODAL_FORM}"
            >
                ${formFieldsHTML}
                
                <input
                    id="${moduleName}-${MODAL_ADD_BUTTON}"
                    form="${moduleName}-${MODAL_FORM}"
                    type="submit"
                    value="${MODAL_SUBMIT_BUTTON_TEXT}"
                    class="${MODAL_ADD_BUTTON}"
                />
            </form>
        `;
		return formHTML;
	},

	generateModalHTML: (moduleName, title, description = "", fields = []) => {
		const descriptionHTML = modalView.generateModalDescriptionHTML(
			moduleName,
			description,
		);
		const formHTML = modalView.generateModalFormHTML(moduleName, fields);

		const modalHTML = `
            <section
                id="${moduleName}-${MODAL}" 
                class="${moduleName}-${MODAL} ${MODAL}"
            >
                <div
                    id="${moduleName}-${MODAL_CONTAINER}"
                    class="${moduleName}-${MODAL_CONTAINER} ${MODAL_CONTAINER}"
                >
                    <div
                        id="${moduleName}-${MODAL_TITLEBAR}"
                        class="${MODAL_TITLEBAR}"
                    >
                        <h2
                            id="${moduleName}-${MODAL_TITLE}"
                            class="${MODAL_TITLE}"
                        >
                            ${title}
                        </h2>
                        <span
                            id="${CLOSE}-${moduleName}-${MODAL}"
                            class="${MODAL_CLOSE_BUTTON}"
                        >
                            &times;
                        </span>
                    </div>
                    ${descriptionHTML}
                    ${formHTML}
                    
                </div>
            </section>

        `;
		return modalHTML;
	},
};
