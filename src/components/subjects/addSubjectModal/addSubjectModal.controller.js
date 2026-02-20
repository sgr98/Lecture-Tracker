import {
	HTMLSubjectAttributesConstants,
	ElementModuleName,
	DisplayText,
} from "../../../constants/HTMLConstants.js";
import { DBSubjectConstants } from "../../../constants/DBConstants.js";
import { HTMLInputTagEnum, HTMLInputTypeEnum } from "../../../utils/enum.js";
import { Controller } from "../../controller.js";
import { handler } from "../../../utils/handler.js";
import { ModalController } from "../../common/modal/modal.controller.js";

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

export class AddSubjectModalController extends Controller {
	constructor(moduleName, addSubjectCallback) {
		super(moduleName);
		this._addSubjectCallback = addSubjectCallback;
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Components
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addComponent() {
		try {
			const addSubjectModalFields = [
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Input,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: true,
					mapTo: DBSubjectConstants.SUBJECT_NAME,
				},
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Input,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: true,
					mapTo: DBSubjectConstants.SUBJECT_CODE,
				},
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Textarea,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: false,
					mapTo: DBSubjectConstants.SUBJECT_DESCRIPTION,
				},
			];
			const modalController = new ModalController(
				ADD_SUBJECT_MODULE,
				ADD_SUBJECT_MODAL_TITLE,
				ADD_SUBJECT_MODAL_DESCRIPTION,
				addSubjectModalFields,
				(fields) => {
					this._addSubjectModalCallback(fields);
				},
			);
			modalController.addComponent();
			this.addEventListeners();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_addSubjectModalCallback(formFields) {
		try {
			let newSubject = {};
			formFields.forEach((field) => {
				const { value, mapTo } = field;
				newSubject[mapTo] = value;
			});
			newSubject[DBSubjectConstants.COURSE_LIST] = [];
			this._addSubjectCallback(newSubject);
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Event Listeners
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addEventListeners() {
		try {
			// ...
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}
}
