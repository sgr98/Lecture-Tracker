import { HTMLFieldAttributesConstants } from "../../../constants/HTMLConstants.js";
import { HTMLInputTagEnum } from "../../../utils/enum.js";
import { View } from "../../view.js";

const { FIELD, INPUT, TEXT, TEXTAREA, SYSTEM_DEFAULT } =
	HTMLFieldAttributesConstants;

export class InputView extends View {
	constructor(moduleName, componentName, field) {
		super(moduleName);
		this._componentName = componentName;

		this._DEFAULT_TEXT_AREA_ROWS = 5;
		this._DEFAULT_TEXT_AREA_MAX_LENGTH = 400;

		const { name, placeholder, inputTag, inputType, isRequired } = field;
		this._field = {
			name: name ?? SYSTEM_DEFAULT,
			placeholder: placeholder ?? SYSTEM_DEFAULT,
			inputTag: inputTag ?? this._DEFAULT_INPUT_TAG,
			inputType: inputType ?? this._DEFAULT_INPUT_TYPE,
			isRequired: isRequired ?? false,
		};
	}

	log() {
		console.log(this);
	}

	generateHTML() {
		const { inputTag } = this._field;
		if (inputTag === HTMLInputTagEnum.Input) {
			return this._generateInputTypeHTML();
		} else if (inputTag === HTMLInputTagEnum.Textarea) {
			return this._generateTextAreaTypeHTML();
		}
		return "";
	}

	_generateInputTypeHTML() {
		const { name, placeholder, inputType, isRequired } = this._field;
		const requiredInput = this._getRequiredInput(isRequired);
		const moduleName = this._moduleName;
		const componentName = this._componentName;
		const fieldInputHTML = `
			<input
				id="${moduleName}-${componentName}-${name}-${INPUT}"
				type="${inputType}"
				${requiredInput}
				placeholder="${placeholder}"
				class="${componentName}-${FIELD}-${inputType}-${INPUT}"
			/>
		`;
		return fieldInputHTML;
	}

	_generateTextAreaTypeHTML() {
		const { name, placeholder } = this._field;
		const rows = this._DEFAULT_TEXT_AREA_ROWS;
		const maxlength = this._DEFAULT_TEXT_AREA_MAX_LENGTH;
		const moduleName = this._moduleName;
		const componentName = this._componentName;
		const fieldInputHTML = `
			<textarea
				id="${moduleName}-${componentName}-${name}-${INPUT}"
				name="${moduleName}-${componentName}-${name}-${INPUT}"
				rows="${rows}"
				maxlength="${maxlength}"
				placeholder="${placeholder}"
				class="${componentName}-${FIELD}-${TEXT}-${TEXTAREA}"
			></textarea>
		`;
		return fieldInputHTML;
	}

	_getRequiredInput(isRequired) {
		return isRequired ? "required" : "";
	}
}
