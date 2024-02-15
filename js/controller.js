
export const TooltipAlignment = {
    AUTO:        "auto",
    CENTER:      "center",
    TOP:         "top",
    TOPLEFT:     "top_left",
    TOPRIGHT:    "top_right",
    BOTTOM:      "bottom",
    BOTTOMLEFT:  "bottom_left",
    BOTTOMRIGHT: "bottom_right",
    LEFT:        "left",
    RIGHT:       "right",
}

/**
 * @param {string} value
 * @returns {boolean}
 */
export function isTooltipAlignment(value) {
    if (value != TooltipAlignment.AUTO
     && value != TooltipAlignment.CENTER
     && value != TooltipAlignment.TOP
     && value != TooltipAlignment.TOPLEFT
     && value != TooltipAlignment.TOPRIGHT
     && value != TooltipAlignment.BOTTOM
     && value != TooltipAlignment.BOTTOMLEFT
     && value != TooltipAlignment.BOTTOMRIGHT
     && value != TooltipAlignment.LEFT
     && value != TooltipAlignment.RIGHT) {
        return false;
    } else {
        return true;
    }
}

export class TooltipController {
    /** @param {HTMLElement} element  */
    set current(element) {
        this._current = element;
    }

    /** @returns {HTMLElement} */
    get current() { return this._current};

    /**
     * @param {HTMLElement} element 
     * @param {string} alignment
     * @param {HTMLElement} parent
    */
    static show(
        element,
        alignment = "auto",
        parent = document.getElementsByTagName("body")[0]
    ) {
        if (element == null) {
            throw new Error("the required parameter [element] is undefined.");
        }
        if (!isTooltipAlignment(alignment)) {
            throw new Error("the required parameter [alignment] is not correctly defined. (refer to [TooltipAlignment] for details)");
        }
        if (parent == null) {
            throw new Error("The required parameter [parent] is undefined.");
        }

        this.current = element;
    }
}