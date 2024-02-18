
export class TooltipBehvaior {
    constructor() {
        if (this.constructor === TooltipBehvaior) {
            throw new Error("The abstract class cannot invoke constructor.");
        }
    }

    /**
     * Converts the absolute position to the relative position and returns it.
     * 
     * @param {DOMRect} parent - constraint DOM-rect.
     * @param {DOMRect} ract
     */
    applyConstraint(parent, ract) {
        return new DOMRect(
            ract.x - parent.left,
            ract.y - parent.top,
            ract.width,
            ract.height,
        );
    }

    /**
     * Returns the relative position that must be finally layouted.
     * 
     * @param {DOMRect} constraint
     * @param {DOMRect} target
     * @param {DOMRect} rect
     * @returns {{x: number, y: number}}
     */
    align(constraint, target, rect) {
        throw new Error("align() is not implemented.");
    }

    handleOverflow() {
        throw new Error("handleOverflow() is not implemented.");
    }
}

export class CenterTooltipBehvaior extends TooltipBehvaior {
    /**
     * @param {DOMRect} constraint 
     * @param {DOMRect} target 
     * @param {DOMRect} rect
     */
    align(constraint, target, rect) {
        target = this.applyConstraint(constraint, target);
        rect   = this.applyConstraint(constraint, rect);

        const left  = target.left - rect.left;
        const right = target.right - rect.right;
        const x     = left - ((left - right) / 2); // start + center to delta
        
        return {x: x, y: target.bottom};
    }
}