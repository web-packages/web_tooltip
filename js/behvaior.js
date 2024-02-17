
export class TooltipBehvaior {
    constructor() {
        if (this.constructor === TooltipBehvaior) {
            throw new Error("The abstract class cannot invoke constructor.");
        }
    }

    /**
     * Returns the relative position that must be finally layouted.
     * 
     * @param {DOMRect} constraint
     * @param {DOMRect} target
     * @param {DOMRect} ract
     * @returns {{left: number, top: number}}
     */
    align(constraint, target, ract) {
        throw new Error("align() is not implemented.");
    }

    handleOverflow() {
        throw new Error("handleOverflow() is not implemented.");
    }
}

export class CenterTooltipBehvaior extends TooltipBehvaior {
    align() {
        return {left: 500, top: 0};
    }
}