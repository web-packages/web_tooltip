
class TooltipBehvaior {
    constructor() {
        if (this.constructor === TooltipBehvaior) {
            throw new Error("The abstract class cannot invoke constructor.");
        }
    }

    /**
     * @param {DOMRect} constraint 
     * @param {DOMRect} ract 
     */
    align(constraint, ract) {
        throw new Error("align() is not implemented.");
    }

    handleOverflow() {
        throw new Error("handleOverflow() is not implemented.");
    }
}

class CenterTooltipBehvaior extends TooltipBehvaior {
    align() {
        
    }
}