import { HTMLFieldAttributesConstants } from "../../../constants/HTMLConstants.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../../utils/enum.js";
import { InputView } from "../input/input.view.js";
import { View } from "../../view.js";

const { FIELD, INPUT, LABEL, SYSTEM_DEFAULT } = HTMLFieldAttributesConstants;

export class FieldView extends View {
	constructor(moduleName, componentName, field) {
		super(moduleName);
		this._componentName = componentName;

		this._DEFAULT_INPUT_TAG = HTMLInputTagEnum.Input;
		this._DEFAULT_INPUT_TYPE = HTMLInputTypeEnum.Text;

		const { name, label, placeholder, inputTag, inputType, isRequired } =
			field;
		this._field = {
			name: name ?? SYSTEM_DEFAULT,
			label: label ?? SYSTEM_DEFAULT,
			placeholder: placeholder ?? SYSTEM_DEFAULT,
			inputTag: inputTag ?? this._DEFAULT_INPUT_TAG,
			inputType: inputType ?? this._DEFAULT_INPUT_TYPE,
			isRequired: isRequired ?? false,
		};
		this._inputView = new InputView(moduleName, componentName, field);
	}

	log() {
		console.log(this);
	}

	generateHTML() {
		const { name, label, isRequired } = this._field;
		const requiredLabel = this._getRequiredLabel(isRequired);
		const inputHTML = this._inputView.generateHTML();
		const moduleName = this._moduleName;
		const componentName = this._componentName;
		const fieldHTML = `
            <div
                id="${moduleName}-${componentName}-${name}-${FIELD}"
                class="${componentName}-${FIELD}"
            >
                <label
                    id="${moduleName}-${componentName}-${name}-${LABEL}"
                    for="${moduleName}-${componentName}-${name}-${INPUT}"
                    class="${componentName}-${FIELD}-${LABEL}"
                >
                    ${label}${requiredLabel}
                </label>
                ${inputHTML}
            </div>
        `;
		return fieldHTML;
	}

	_getRequiredLabel(isRequired) {
		return isRequired ? "&#x2a;" : "";
	}
}
