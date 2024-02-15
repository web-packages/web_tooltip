import { Alignment } from "./controller.js";

class TooltipElement extends HTMLElement {
    /**
     * @param {string} key
     * @param {HTMLElement} scope
     */
    getPropertyValue(key, scope = this) {
        return getComputedStyle(scope).getPropertyValue(key);
    }

    /**
     * @param {number} delay - time
     */
    handlePointerEvent(delay) {
        this.onpointerleave = () => clearTimeout(this.delayTimer);

        this.delayTimer = setTimeout(() => {
            console.log("hello world");
        }, delay);
    }

    connectedCallback() {
        const text = this.getAttribute("text");
        if (text == null) {
            throw new Error("The required property [text] is undefined.");
        }
        
        const align = this.getAttribute("alignment") || "auto";
        if (align != Alignment.AUTO
         && align != Alignment.CENTER
         && align != Alignment.TOP
         && align != Alignment.TOPLEFT
         && align != Alignment.TOPRIGHT
         && align != Alignment.BOTTOM
         && align != Alignment.BOTTOMLEFT
         && align != Alignment.BOTTOMRIGHT
         && align != Alignment.LEFT
         && align != Alignment.RIGHT) {
            throw new Error("The automatic property [alignment] is not correctly defined. [auto, top, bottom, left, right]");
        }

        const delay = this.getPropertyValue("--tooltip-delay") || "0.1s";
        const delayValue = delay.endsWith("ms")
            ? Number.parseFloat(delay)
            : Number.parseFloat(delay) * 1000;

        if (isNaN(delayValue)) {
            throw new Error("The property [--tooltip-delay] is must be time unit(ms, s)");
        }

        this.onpointerenter = () => this.handlePointerEvent(delayValue);
    }
}

customElements.define("tool-tip", TooltipElement);