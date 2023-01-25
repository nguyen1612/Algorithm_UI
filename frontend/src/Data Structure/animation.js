export default class Animation {
    constructor(state) {
        this.params = state.config.params;
        this.myGameArea = state.myGameArea;
        this.config = {...state.config.UI, node_init: {...state.config.node_init}};

        this.problem = this._getProblem();
    }

    render() {
        this.problem();
    }
}
