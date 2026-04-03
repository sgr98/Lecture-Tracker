import { HTMLFieldAttributesConstants } from "../../../constants/HTMLConstants.js";
import { isStringNullOrEmpty } from "../../../utils/common.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../../utils/enum.js";
import { View } from "../../view.js";

const { FIELD, INPUT, TEXT, TEXTAREA, SYSTEM_DEFAULT, READONLY } =
	HTMLFieldAttributesConstants;

export class InputView extends View {
	constructor(moduleName, componentName, field) {
		super(moduleName);
		this._componentName = componentName;

		this._DEFAULT_INPUT_TAG = HTMLInputTagEnum.Input;
		this._DEFAULT_INPUT_TYPE = HTMLInputTypeEnum.Text;
		this._DEFAULT_TEXT_AREA_ROWS = 5;
		this._DEFAULT_TEXT_AREA_MAX_LENGTH = 400;

		if (field.inputTag === HTMLInputTagEnum.Textarea) {
			field.inputType = HTMLInputTypeEnum.Textarea;
		}

		const {
			name,
			placeholder,
			inputTag,
			inputType,
			isRequired,
			isReadonly,
		} = field;
		this._field = {
			name: name ?? SYSTEM_DEFAULT,
			placeholder: placeholder ?? SYSTEM_DEFAULT,
			inputTag: inputTag ?? this._DEFAULT_INPUT_TAG,
			inputType: inputType ?? this._DEFAULT_INPUT_TYPE,
			isRequired: isRequired ?? false,
			isReadonly: isReadonly ?? false,
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
		const { name, placeholder, inputType, isRequired, isReadonly } =
			this._field;
		const requiredInput = this._getRequiredInput(isRequired);
		const readonlyInput = this._getReadonlyInput(isReadonly);
		const inputClass = this._getInputClassName();
		const moduleName = this._moduleName;
		const componentName = this._componentName;
		const fieldInputHTML = `
			<input
				id="${moduleName}-${componentName}-${name}-${INPUT}"
				type="${inputType}"
				${requiredInput}
				${readonlyInput}
				placeholder="${placeholder}"
				class="${inputClass}"
			/>
		`;
		return fieldInputHTML;
	}

	_generateTextAreaTypeHTML() {
		const { name, placeholder, isRequired, isReadonly } = this._field;
		const requiredInput = this._getRequiredInput(isRequired);
		const readonlyInput = this._getReadonlyInput(isReadonly);
		const inputClass = this._getInputClassName();
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
				${requiredInput}
				${readonlyInput}
				placeholder="${placeholder}"
				class="${inputClass}"
			></textarea>
		`;
		return fieldInputHTML;
	}

	_getInputClassName() {
		const { inputTag, inputType, isReadonly } = this._field;
		const inputTagClassName = this._getInputTagClassName(
			inputTag,
			inputType,
		);
		const readOnlyClassName = this._getReadonlyClassName(isReadonly);
		let classNames = [inputTagClassName, readOnlyClassName];
		classNames = classNames.filter(
			(className) => !isStringNullOrEmpty(className),
		);
		return classNames.join(" ");
	}

	_getInputTagClassName(inputTag, inputType) {
		const componentName = this._componentName;
		switch (inputTag) {
			case HTMLInputTagEnum.Input:
				return `${componentName}-${FIELD}-${inputType}-${INPUT}`;
			case HTMLInputTagEnum.Textarea:
				return `${componentName}-${FIELD}-${TEXT}-${TEXTAREA}`;
			default:
				return "";
		}
	}

	_getReadonlyClassName(isReadonly) {
		return isReadonly ? `${FIELD}-${READONLY}-${INPUT}` : "";
	}

	_getRequiredInput(isRequired) {
		return isRequired ? "required" : "";
	}

	_getReadonlyInput(isReadonly) {
		isReadonly = isReadonly ?? false;
		return isReadonly ? "readonly" : "";
	}
}
