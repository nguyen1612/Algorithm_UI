import { Auto } from "../auto_draw";
import * as d from "../../draw";
import Controller from '../../controller'

export default class InsertAfter extends Controller {
    constructor(myGameArea, config) {
        super(myGameArea, config);

        this.auto_draw = new Auto(myGameArea, config);

        // Custom
        this.noShift = {from: 0, n: 0};
        this.shiftRight = this.noShift;
        this.tail = -1;
        this.firstTime = true;

        // Special case for switching UI;
        this.repeat_i_0 = 0;
        this.repeat_i_1 = 0;
        this.repeat_i_2 = 0;
        this.repeat_i_3 = 0;
        this.repeat_i_4 = 0;

        this.last_int = 0;
        this.pointer = -1;
    }

    insert() {
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

        this._controller();
        this.changeUI(c);
    }

    changeUI(c) {
        const init = c.node_init;

        // Change UI effect of special cases.
        if (!Number.isInteger(this.path[this.i])) {
            this.once(c, () => this.last_int = this.i - 1);

            if (this.path[this.i] === "new top")
                this.repeat_i_0 = this.i;
            if (this.path[this.repeat_i_0] === "new top") {
                this.auto_draw.node(this.repeat_i_0, this.params.value, true);
                this.shiftRight = {from: this.repeat_i_0, n: 1};
            }

            if (this.path[this.i] === "new to prev.next")
                this.repeat_i_1 = this.i;
            if (this.path[this.repeat_i_1] === "new to prev.next") {
                let i = this.repeat_i_1;
                const head = init.head;

                let {x: fromx, y: fromy} = this.getXY(this.last_int + 1, head);
                fromx = fromx + init.width * .85
                fromy = fromy - 10 + init.height / 2;

                let {x: tox, y: toy} = this.getXY(i, head);
                tox -= init.thickness
                toy = toy - 10 + 60 + toy - init.thickness;

                d.drawArrow(fromx, fromy, tox, toy, "white", this.myGameArea);
            }

            if (this.path[this.i] === "prev to nothing")
                this.repeat_i_2 = this.i;
            if (this.path[this.repeat_i_2] === "prev to nothing")
                this.pointer = this.last_int;

            if (this.path[this.i] === "prev to new")
                this.repeat_i_3 = this.i;
            if (this.path[this.repeat_i_3] === "prev to new") {
                let x = init.x + init.width * (this.last_int) + init.width * 0.5 * (this.last_int   ) + init.thickness;
                let y = init.y;
                let fromx = x + init.width * 0.85 + init.thickness;
                let fromy = y + init.height * 0.5
                let tox = x + init.width + init.width * 0.5 + init.thickness;
                let toy = y - 20 - init.height * 0.5;

                d.drawArrow(fromx, fromy, tox, toy, "white", this.myGameArea);
            }

            if (this.path[this.i] === "new normal")
                this.repeat_i_4 = this.i;
            if (this.path[this.repeat_i_4] === "new normal") {
                this.clear();
                this.once(this, ()=> this.params.array.splice(this.last_int, 0, this.params.value))
            }
        }

        if(!c.display)
            return;

        this._animation_mode(c);
    }

    once(obj, fnc) {
        if (obj.firstTime) {
            obj.firstTime = false;
            return fnc();
        }
    }

    clear() {
        this.pointer = -1;
        this.repeat_i_0 = 0;
        this.repeat_i_1 = 0;
        this.repeat_i_2 = 0;
        this.repeat_i_3 = 0;
        this.shiftRight = this.noShift;
    }

    getXY(i, start) {
        let block = start.x + start.width;
        let pointer = start.width * 0.5;

        let x = block * i + pointer * i + start.thickness;
        let y = start.y;
        return {x, y};
    }
}