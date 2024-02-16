
class TooltipBehvaior {
    constructor() {
        if (this.constructor === TooltipBehvaior) {
            throw new Error("The abstract class cannot invoke constructor.");
        }
    }

    align() {
        throw new Error("align() is not implemented.");
    }

    handleOverflow() {

    }
}