import { Auto } from "../auto_draw";
import * as d from "../../draw";
import Controller from '../../controller'

export default class InsertAfterTail extends Controller {
    constructor(myGameArea, config) {
        super(myGameArea, config);

        this.auto_draw = new Auto(myGameArea, config);

        // Custom
        this.noShift = {from: 0, n: 0};
        this.firstTime = true;
        this.moveTail = true;
        this.arrayAdd = true;

        this.last_int = 0;
        this.pointer = -1;
        this.tail = null;

        // UI render
        this.fixedUI = 2;
        this.log = this.getLog();
    }

    render() {
        const array = this.params.array;
        const c = this.config;
        const auto_draw = this.auto_draw;
        const init = c.node_init;

        this.once(this, "moveTail", () => this.tail = array.length - 1)

        // Normal UI flow, may change later
        auto_draw.nodes(array);
        auto_draw.control_node(c.i, this.noShift, "Current", true);
        auto_draw.control_node(0, this.noShift, "Head");
        auto_draw.control_node(this.tail, this.noShift, "Tail");

        // For NULL pointer
        let pointer = init.width * 0.5 ;
        let block = init.x + init.width;
        let i = array.length;
        let x = block * i + pointer * i + init.thickness;
        d.drawText(x + 30, init.y + init.height * 0.725, "NULL", "20px Arial", "#F4468E", this.myGameArea)

        this._controller();
        this.effects();
    }

    effects() {
        if (!Number.isInteger(this.path[this.i])) {
            this.once(this.config, "firstTime", () => this.last_int = this.i - 1);
            
            for (let i = 0; i < this.fixedUI; i++)
                if (this.i - 1 >= i + this.last_int) {
                    this.log[i]();
                }
        }

        if(!this.config.display)
            return;

        this._animation_mode(this.config);
    }

    getLog() {
        const log = []

        log[0] = () => {
            this.once(this, "arrayAdd", () => this.params.array.push(this.params.value))
        }

        log[1] = () => {
            this.tail = this.params.array.length - 1;
        }

        return log;
    }
}