import {
	HTMLAttributesConstants,
	HTMLPopupAttributesConstants,
	DisplayText,
} from "../../../constants/HTMLConstants.js";
import { View } from "../../view.js";

const { BUTTON } = HTMLAttributesConstants;
const {
	POPUP,
	POPUP_CONTAINER,
	POPUP_TITLEBAR,
	POPUP_TITLE,
	POPUP_DESCRIPTION,
	CLOSE,
	POPUP_CLOSE_BUTTON,
} = HTMLPopupAttributesConstants;
const { CLOSE_TEXT } = DisplayText.popup;

export class PopupView extends View {
	constructor(moduleName, title, description, index) {
		super(moduleName);
		this._title = title;
		this._description = description;
		this._index = index;
	}

	generateHTML() {
		const moduleName = this._moduleName;
		const index = this._index;
		const title = this._title;
		const description = this._description;
		const popupHTML = `
            <section
				id="${moduleName}-${POPUP}-${index}"
				class="${moduleName}-${POPUP} ${POPUP}"
			>
                <div
                    id="${moduleName}-${index}-${POPUP_CONTAINER}"
                    class="${moduleName}-${POPUP_CONTAINER} ${POPUP_CONTAINER}"
                >
                    <div
                        id="${moduleName}-${index}-${POPUP_TITLEBAR}"
                        class="${moduleName}-${POPUP_TITLEBAR} ${POPUP_TITLEBAR}"
                    >
                        <h2
                            id="${moduleName}-${index}-${POPUP_TITLE}"
                            class="${moduleName}-${POPUP_TITLE} ${POPUP_TITLE}"
                        >
                            ${title}
                        </h2>
                    </div>

                    <div
                        id="${moduleName}-${index}-${POPUP_DESCRIPTION}"
                        class="${moduleName}-${POPUP_DESCRIPTION} ${POPUP_DESCRIPTION}"
                    >
                        ${description}
                    </div>

                    <div
                        id="${CLOSE}-${moduleName}-${index}-${POPUP}"
                        class="${POPUP_CLOSE_BUTTON} ${BUTTON}"
                    >
                        ${CLOSE_TEXT}
                    </div>
                </div>
            </section>
        `;
		return popupHTML;
	}
}
