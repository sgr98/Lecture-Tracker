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
import { isValueNull } from "../../../utils/common.js";

const {
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
	SUBJECT_MODAL_SUBJECT_ID_FIELD,
} = HTMLSubjectAttributesConstants;
const { EDIT_SUBJECT_MODULE } = ElementModuleName;
const {
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_PLACEHOLDER,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD_PLACEHOLDER,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_LABEL,
	ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_PLACEHOLDER,
	SUBJECT_MODAL_SUBJECT_ID_FIELD_LABEL,
	EDIT_SUBJECT_MODAL_SUBMIT_BUTTON_TEXT,
	ADD_SUBJECT_MODAL_DESCRIPTION,
} = DisplayText.subject;

export class EditSubjectModalController extends Controller {
	constructor(moduleName, subject, editSubjectCallback) {
		super(moduleName);
		this._subject = subject;
		this._editSubjectCallback = editSubjectCallback;
		this._modalController = null;
	}

	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////
	// Components
	// ////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////

	addComponent() {
		try {
			const modalModule = `${EDIT_SUBJECT_MODULE}-${this._subject.order}`;
			const modalTitle = `Edit '${this._subject.subjectName}' subject`;
			const editSubjectModalFields = [
				{
					name: SUBJECT_MODAL_SUBJECT_ID_FIELD,
					label: SUBJECT_MODAL_SUBJECT_ID_FIELD_LABEL,
					placeholder: null,
					inputTag: HTMLInputTagEnum.Input,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: false,
					isReadonly: true,
					mapTo: DBSubjectConstants.SUBJECT_ID,
				},
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Input,
					inputType: HTMLInputTypeEnum.Text,
					isRequired: true,
					isReadonly: false,
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
					isReadonly: false,
					mapTo: DBSubjectConstants.SUBJECT_CODE,
				},
				{
					name: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
					label: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_LABEL,
					placeholder:
						ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD_PLACEHOLDER,
					inputTag: HTMLInputTagEnum.Textarea,
					inputType: HTMLInputTypeEnum.Textarea,
					isRequired: false,
					isReadonly: false,
					mapTo: DBSubjectConstants.SUBJECT_DESCRIPTION,
				},
			];
			const modalContent = {
				title: modalTitle,
				// FIX: SMALL WIDTH FIELDS IN MODAL WITHOUT DESCRIPTION
				// description: ADD_SUBJECT_MODAL_DESCRIPTION,
				description: null,
				submitButtonText: EDIT_SUBJECT_MODAL_SUBMIT_BUTTON_TEXT,
				fields: editSubjectModalFields,
			};
			const options = {
				removeOnClose: true,
			};
			this._modalController = new ModalController(
				modalModule,
				modalContent,
				(fields) => {
					this._editSubjectModalCallback(fields);
				},
				options,
			);
			this._modalController.addComponent();
			this._prefillForm();
			this.addEventListeners();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_prefillForm() {
		const { id, subjectName, subjectCode, subjectDescription } =
			this._subject.getEffectiveSubject();
		const formFieldValues = [
			{
				name: SUBJECT_MODAL_SUBJECT_ID_FIELD,
				value: id,
			},
			{
				name: ADD_SUBJECT_MODAL_SUBJECT_NAME_FIELD,
				value: subjectName,
			},
			{
				name: ADD_SUBJECT_MODAL_SUBJECT_CODE_FIELD,
				value: subjectCode,
			},
			{
				name: ADD_SUBJECT_MODAL_SUBJECT_DESCRIPTION_FIELD,
				value: subjectDescription,
			},
		];
		this._modalController.prefillForm(formFieldValues);
	}

	removeComponent() {
		try {
			if (isValueNull(this._modalController)) {
				return;
			}
			this._modalController.removeComponent();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	open() {
		try {
			if (isValueNull(this._modalController)) {
				return;
			}
			this._modalController.open();
		} catch (error) {
			handler.errorWithPopup(error);
		}
	}

	_editSubjectModalCallback(formFields) {
		try {
			let newSubject = {};
			formFields.forEach((field) => {
				const { value, mapTo } = field;
				newSubject[mapTo] = value;
			});
			this._editSubjectCallback(newSubject);
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
