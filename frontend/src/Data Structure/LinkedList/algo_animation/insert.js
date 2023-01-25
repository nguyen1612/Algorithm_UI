import { Auto } from "../auto_draw";
import * as d from "../../draw";

export default class Insert {
    constructor(myGameArea, config) {
        this.myGameArea = myGameArea;
        this.config = config;
        this.auto_draw = new Auto(myGameArea, config);

        // test
        this.path = null;
        this.i = 0;
        this.repeat_i_0 = 0;
        this.repeat_i_1 = 0;
        this.repeat_i_2 = 0;
        this.repeat_i_3 = 0;

        this.last_int = 0;
        this.pointer = -1;

        this.auto_mode = true;
        this.userMove = true;
    }

    insert(array) {
        const c = this.config;
        const auto_draw = this.auto_draw;
        const init = c.node_init;

        auto_draw.nodes(array.length, [], [this.pointer]);

        auto_draw.control_node(0, "Head");

        auto_draw.control_node(array.length - 1, "Tail");

        auto_draw.control_node(c.i, "Current", true);

        // For NULL pointer
        let pointer_len = init.width * 0.5 * array.length + init.thickness;
        let x = init.x + init.width * array.length + pointer_len;
        d.drawText(x + 30, init.y + init.height * 0.725, "NULL", "20px Arial", "#F4468E", this.myGameArea)

        this.controller();
        
        this.changeUI(c);
    }

    controller() {
        const config = this.config;
        const myGameArea = this.myGameArea;

        const key = myGameArea.key;
        if (key === "ArrowRight") {
            myGameArea.setKey(false, key);
            config.display = true;
            this.auto_mode = false;
            this.userMove = true;
            this.forward = true;
        }
        
        if (key === "ArrowDown") {
            myGameArea.setKey(false, key);
            config.display = false;
            this.auto_mode = false;
        }
    }

    changeUI(c) {
        c.count++;
        const init = c.node_init;

        // Change UI effect of 1 operation.
        if (!Number.isInteger(this.path[this.i])) {
            if (c.firstTime) {
                c.firstTime = false;
                this.last_int = this.i - 1;
            }

            if (this.path[this.i] === "new")
                this.repeat_i_0 = this.i;
            if (this.path[this.repeat_i_0] === "new")
                this.auto_draw.node(this.repeat_i_0 - 1, true);

            if (this.path[this.i] === "new to prev.next")
                this.repeat_i_1 = this.i;
            if (this.path[this.repeat_i_1] === "new to prev.next")
                this.auto_draw.node(this.repeat_i_1 - 2, false);

            if (this.path[this.i] === "prev to nothing")
                this.repeat_i_2 = this.i;
            if (this.path[this.repeat_i_2] === "prev to nothing")
                this.pointer = this.last_int - 1;

            if (this.path[this.i] === "prev to new")
                this.repeat_i_3 = this.i;
            if (this.path[this.repeat_i_3] === "prev to new") {
                let x = init.x + init.width * (this.last_int - 1) + init.width * 0.5 * (this.last_int - 1) + init.thickness;
                let y = init.y;
                let fromx = x + init.width * 0.85;
                let fromy = y + init.height * 0.5
                let tox = x + init.width + init.width * 0.5
                let toy = y - 20 - init.height * 0.5;

                d.drawArrow(fromx, fromy, tox, toy, "white", this.myGameArea);
            }
        }

        // if(!c.display)
        //     return;

        this._animation_mode(c);
    }

    _animation_mode(c) {
        // Control animation mode
        if (!this.auto_mode) {
            if (this.userMove) {
                this.userMove = false;
                c.count = 0;

                if (this.i === 0) {
                    if (this.myGameArea.prevKey !== "ArrowRight")
                        return
                }
    
                this._update(this.i + 1);
            }
            return true;
        }

        // Auto animation mode
        if (c.count % 40 === 0) {
            c.count = 0;
            this._update(this.i + 1);
        }
    }

    _update(index) {
        this.i = index;
        if (Number.isInteger(this.path[index]))  
            this.config.i = this.path[index]; 
    }
}