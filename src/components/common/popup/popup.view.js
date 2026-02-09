import {
	HTMLAttributesConstants,
	HTMLPopupAttributesConstants,
} from "../../../constants/HTMLConstants.js";

const { BUTTON } = HTMLAttributesConstants;

const {
	POPUP,
	POPUP_CONTAINER,
	POPUP_TITLEBAR,
	POPUP_TITLE,
	POPUP_DESCRIPTION,
	CLOSE,
	POPUP_CLOSE_BUTTON,
	CLOSE_TEXT,
} = HTMLPopupAttributesConstants;

const generatePopupHTML = (moduleName, index, title, description) => {
	const popupHTML = `
            <section id="${moduleName}-${index}-${POPUP}" class="${moduleName}-${POPUP} ${POPUP}">
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
};

export const popupView = {
	generatePopupHTML: generatePopupHTML,
};
