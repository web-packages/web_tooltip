import { CenterTooltipBehavior, TooltipBehavior } from "./behvaior.js";

/// The relative position of tooltips in target.
export const TooltipAlignment = {
    AUTO:          "auto",
    TOP:           "top",           // only vertical
    TOP_LEFT:      "top_left",
    TOP_RIGHT:     "top_right",
    TOP_CENTER:    "top_center",
    BOTTOM:        "bottom",
    BOTTOM_LEFT:   "bottom_left",
    BOTTOM_RIGHT:  "bottom_right",
    BOTTOM_CENTER: "bottom_center",
    LEFT:          "left",          // only horizontal
    RIGHT:         "right",         // only horizontal
    CENTER:        "center",        // only horizontal
}

/**
 * @param {string} value
 * @returns {boolean}
 */
export function isTooltipAlignment(value) {
    if (value != TooltipAlignment.AUTO
     && value != TooltipAlignment.TOP
     && value != TooltipAlignment.TOP_LEFT
     && value != TooltipAlignment.TOP_RIGHT
     && value != TooltipAlignment.TOP_CENTER
     && value != TooltipAlignment.BOTTOM
     && value != TooltipAlignment.BOTTOM_LEFT
     && value != TooltipAlignment.BOTTOM_RIGHT
     && value != TooltipAlignment.BOTTOM_CENTER
     && value != TooltipAlignment.LEFT
     && value != TooltipAlignment.RIGHT
     && value != TooltipAlignment.CENTER) {
        return false;
    } else {
        return true;
    }
}

/**
 * @param {string} alignment - refer to [TooltipAlignment].
 * @returns {TooltipBehavior}
*/
export function CreateTooltipBehvaior(alignment) {
    return new CenterTooltipBehavior();
}

export class TooltipController {
    /** @param {HTMLElement} element */
    set current(element) {
        this._current = element;
    }

    /** @returns {HTMLElement} */
    get current() { return this._current};

    /**
     * @param {HTMLElement} element - tooltip element.
     * @param {HTMLElement} target
     * @param {HTMLElement} parent - parent element of tooltip element.
     * @param {string} alignment - refer to [TooltipAlignment].
     */
    static layout(
        element = this.current,
        target,
        parent,
        alignment,
    ) {
        const constraint = parent.getBoundingClientRect();

        const behvaior = CreateTooltipBehvaior(alignment);
        const position = behvaior.align(
            constraint,
            target.getBoundingClientRect(),
            element.getBoundingClientRect(),
        );
        const consumed = behvaior.overflowed(constraint, position);

        element.style.left = `${position.left + consumed.x}px`;
        element.style.top  = `${position.top + consumed.y}px`;

        console.log(consumed);
    }

    /**
     * @param {HTMLElement} element
     * @param {string} alignment
     * @param {HTMLElement} target
     * @param {HTMLElement} parent
    */
    static show(
        element,
        alignment = "auto",
        target,
        parent = document.getElementsByTagName("body")[0]
    ) {
        if (element == null) {
            throw new Error("the required parameter [element] is undefined.");
        } 
        if (!isTooltipAlignment(alignment)) {
            throw new Error("the required parameter [alignment] is not correctly defined. (refer to [TooltipAlignment] for details)");
        }
        if (target == null) throw new Error("The required parameter [target] is undefined.");
        if (parent == null) throw new Error("The required parameter [parent] is undefined.");

        /** @type {HTMLElement} */
        let tooltip;

        // The position property may overlap, therefore must be wrap to <div> once.
        {
            tooltip = document.createElement("div");
            tooltip.appendChild(element);
        }

        // The position property of the parent element is must be define to 'relative',
        // because the tooltip element is positioned as 'absolute'.
        {
            parent.style.position  = "relative";
            tooltip.style.position = "absolute";
            tooltip.style.minWidth = "max-content";
        }

        target.onpointerleave = () => this.unshow(element);

        // layout the tooltip element.
        {
            parent.appendChild(this.current = tooltip);
            
            // The tooltip element are attached to the parent tree and then reposition.
            this.layout(tooltip, target, parent, alignment);
        }

        tooltip.style.animation = "tooltip-fadein var(--tooltip-fadein-duration)";
    }

    /** @param {HTMLElement} element  */
    static unshow(element = this.current) {
        element.style.animation = "tooltip-fadeout var(--tooltip-fadeout-duration)";
        element.onanimationend = () => element.remove();
    }
}