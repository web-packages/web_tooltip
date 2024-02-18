
export class TooltipBehavior {
    constructor() {
        if (this.constructor === TooltipBehavior) {
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
     * @returns {DOMRect}
     */
    align(constraint, target, rect) {
        throw new Error("align() is not implemented.");
    }

    /**
     * @param {DOMRect} constraint 
     * @param {DOMRect} rect
     * @returns {{x: number, y: number, resize: {x: number, y: number}}}
     */
    overflowed(constraint, rect) {
        throw new Error("handleOverflow() is not implemented.");
    }
}

export class NonOverflowTooltipBehavior extends TooltipBehavior {
    /**
     * @param {DOMRect} constraint 
     * @param {DOMRect} rect
     */
    overflowed(constraint, rect) {
        const right = constraint.right - rect.right;
        const left  = constraint.left  - rect.left;
        
        if (right < 0) {
            return {x: right - constraint.left, y: 0};
        }
        if (left > 0) {
            return {x: left - constraint.left, y: 0};
        }

        return {x: 0, y: 0};
    }
}

export class CenterTooltipBehavior extends NonOverflowTooltipBehavior {
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

        rect.x = left - ((left - right) / 2); // start + center to delta
        rect.y = target.bottom;
        
        return rect;
    }
}