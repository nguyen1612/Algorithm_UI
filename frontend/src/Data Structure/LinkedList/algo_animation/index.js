import { Auto } from "../auto_draw";

export default class Animation {
    constructor(state) {
        this.params = state.config.params;
        this.myGameArea = state.myGameArea;
        this.config = {...state.config.UI, node_init: {...state.config.node_init}};
        this.auto_draw = new Auto(state.myGameArea, state.config);

        this.problem = this.getProblem();
    }

    // Child class must overwrite this method 
    // depending on the requirement for displaying a particular animation.
    // => Must return the drawing function with REFERENCE type.
    // Ex: this.search, this.delete, etc.
    _getProblem() {
        // At the time child class call this function, only this.params is available 
    }

    _setAnimationState(state) {
        this.state = state;
    }

    render() {
        this.problem();
    }
}
