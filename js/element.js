import { TooltipController, isTooltipAlignment } from "./controller.js";

class TooltipElement extends HTMLElement {
    /**
     * @param {string} key
     * @param {HTMLElement} scope
     */
    getPropertyValue(key, scope = this) {
        return getComputedStyle(scope).getPropertyValue(key);
    }

    /**
     * @param {string} text
     * @param {string} alignment
     * @param {number} delay - time
     */
    handlePointerEvent(text, alignment, delay) {
        this.onpointerleave = () => clearTimeout(this.delayTimer);

        this.delayTimer = setTimeout(() => {
            TooltipController.show(this.createTooltipElement(text), alignment);
        }, delay);
    }

    /** @param {string} text  */
    createTooltipElement(text) {
        const element = document.createElement("p");
        element.textContent = text;
        element.className = "tooltip";

        return element;
    }

    connectedCallback() {
        const text = this.getAttribute("text");
        if (text == null) {
            throw new Error("The required property [text] is undefined.");
        }
        
        const alignment = this.getAttribute("alignment") || "auto";
        if (!isTooltipAlignment(alignment)) {
            throw new Error("The automatic property [alignment] is not correctly defined. (refer to [TooltipAlignment] for details)");
        }

        const delay = this.getPropertyValue("--tooltip-delay") || "0.1s";
        const delayValue = delay.endsWith("ms")
            ? Number.parseFloat(delay)
            : Number.parseFloat(delay) * 1000;
        
        if (isNaN(delayValue)) {
            throw new Error("The property [--tooltip-delay] is must be time unit(ms, s)");
        }

        this.onpointerenter = () => this.handlePointerEvent(text, alignment, delayValue);
    }
}

customElements.define("tool-tip", TooltipElement);