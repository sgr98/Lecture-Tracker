import { HTMLModalAttributesConstants } from "../../../constants/HTMLConstants.js";
import {
	isArrayNullOrEmpty,
	isStringNullOrEmpty,
} from "../../../utils/common.js";
import { FieldView } from "../field/field.view.js";
import { View } from "../../view.js";

const {
	MODAL,
	MODAL_CONTAINER,
	MODAL_TITLEBAR,
	MODAL_TITLE,
	MODAL_CLOSE_BUTTON,
	MODAL_CONTENT,
	MODAL_DESCRIPTION,
	MODAL_FORM,
	MODAL_ADD_BUTTON,
	CLOSE,
	MODAL_SUBMIT_BUTTON_TEXT,
} = HTMLModalAttributesConstants;

export class ModalView extends View {
	constructor(moduleName, title, description, fields) {
		super(moduleName);
		this._title = title;
		this._description = description ?? "";
		this._fields = fields ?? [];
	}

	generateHTML() {
		const descriptionHTML = this._generateModalDescriptionHTML();
		const formHTML = this._generateModalFormHTML();
		const moduleName = this._moduleName;
		const title = this._title;
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

					<div
						id="${moduleName}-${MODAL_CONTENT}"
						class="${MODAL_CONTENT}"
					>
						${descriptionHTML}
						${formHTML}
					</div>
                </div>
            </section>

        `;
		return modalHTML;
	}

	_generateModalDescriptionHTML() {
		const moduleName = this._moduleName;
		const description = this._description;
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
	}

	_generateModalFormHTML() {
		const moduleName = this._moduleName;
		const fields = this._fields;
		if (isArrayNullOrEmpty(fields)) {
			return "";
		}

		const formFieldsHTML = fields
			.map((field) => {
				const fieldView = new FieldView(moduleName, MODAL, field);
				return fieldView.generateHTML();
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
	}
}
