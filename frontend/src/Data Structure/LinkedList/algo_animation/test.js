import { Auto } from "../auto_draw";
import * as d from "../../draw";
import Controller from '../../controller'

export default class Test extends Controller {
    constructor(myGameArea, config) {
        super(myGameArea, config);

        this.auto_draw = new Auto(myGameArea, config);

        // Custom
        this.noShift = {from: 0, n: 0};
        this.shiftRight = this.noShift;
        this.firstTime = true;

        this.last_int = 0;
        this.pointer = -1;

        // UI render
        this.fixedUI = 1;
        this.log = this.getLog();
        this.move = true;
        this.wait = false;
    }

    test() {
        const array = this.params.array;
        const c = this.config;
        const auto_draw = this.auto_draw;
        const init = c.node_init;
        const tail = array.length - 1;

        // Normal UI flow, may change later
        auto_draw.nodes(array, this.shiftRight, [this.pointer]);
        auto_draw.control_node(c.i, this.noShift, "Current", true);
        auto_draw.control_node(0, this.noShift, "Tail");
        auto_draw.control_node(tail, this.shiftRight, "Tail");

        // For NULL pointer
        let pointer = init.width * 0.5 ;
        let block = init.x + init.width;
        let i = array.length;
        if (i >= this.shiftRight.from && this.shiftRight.from !== 0)
            i += this.shiftRight.n;
        let x = block * i + pointer * i + init.thickness;
        d.drawText(x + 30, init.y + init.height * 0.725, "NULL", "20px Arial", "#F4468E", this.myGameArea)

        // this._controller();
        // this.changeUI(c);

        this.render();
    }

    getLog() {
        return []
    }
}