import { Auto } from "../auto_draw";
import * as d from "../../draw";
import Controller from '../../controller'

export default class RemoveMiddle extends Controller {
    constructor(myGameArea, config) {
        super(myGameArea, config);

        this.auto_draw = new Auto(myGameArea, config);

        // Custom
        this.noShift = {from: 0, n: 0};
        this.shiftRight = this.noShift;
        this.firstTime = true;

        this.last_int = 0;
        this.pointers = []
        this.noNodes = [];
        this.links = [true, true];
        this.under_1 = true;

        // UI render
        this.fixedUI = 3;
        this.log = this.getLog();
    }

    render() {
        const array = this.params.array;
        const c = this.config;
        const auto_draw = this.auto_draw;
        const init = c.node_init;
        const tail = array.length - 1;

        // Normal UI flow, may change later
        auto_draw.nodes(array, this.shiftRight, this.pointers, this.noNodes);
        auto_draw.control_node(c.i - 1, this.noShift, "Previous", true);
        auto_draw.control_node(0, this.noShift, "Head");
        auto_draw.control_node(tail, this.shiftRight, "Tail");
        
        if (this.under_1)
            auto_draw.control_node(c.i, this.noShift, "Current", true);

        // For NULL pointer
        let pointer = init.width * 0.5 ;
        let block = init.x + init.width;
        let i = array.length;
        let x = block * i + pointer * i + init.thickness;
        d.drawText(x + 30, init.y + init.height * 0.725, "NULL", "20px Arial", "#F4468E", this.myGameArea);

        this._controller();
        this.effects();
    }

    effects() {
        if (!Number.isInteger(this.path[this.i])) {
            this.once(this.config, "firstTime", () => this.last_int = this.i - 1);
            
            for (let i = 0; i < this.fixedUI; i++)
                if (this.i - 1 >= i + this.last_int)
                    this.log[i](this);
        }

        if(!this.config.display)
            return;

        this._animation_mode(this.config);
    }

    getLog() {
        const log = [];
        const init = this.config.node_init;

        log[0] = (thiss) => {
            // Clear several default UI
            thiss.under_1 = false;
            thiss.noNodes.push(this.last_int);
            thiss.pointers[0] = this.last_int - 1;
            thiss.pointers[1] = this.last_int;
            
            // Draw the current node below the main stream
            const value = thiss.params.array[this.last_int];
            let {x, y} = thiss.getXY(this.last_int, init);
            y += init.height + 10;
            d.draw_control_rectangle(x, y, init.width, init.height, value, this.myGameArea, "white", init.thickness, true);
            
            // Draw the control node ("Current" rectangle UI) below the current node
            const diff = init.height - 15;
            thiss.auto_draw.control_node(thiss.last_int, thiss.noShift, "Current", true, {x: 0, y: diff});

            // Draw the pointer of the prev.next 
            if (thiss.links[0]) {
                const {x, y} = thiss.getXY(thiss.last_int - 1, init);
                const {x: fromx, y: fromy} = this.getPointerXY(x, y, init);

                const tox = x + init.width + init.width * 0.5;
                const toy = y + init.height + init.height / 2 + 10;

                d.drawArrow(fromx, fromy, tox, toy, "white", thiss.myGameArea);
            }

            // Draw the pointer of current.next
            if (thiss.links[1]) {
                let {x: fromx, y: fromy} = thiss.getXY(thiss.last_int, init);
                fromx += init.width * 0.85;
                fromy += init.height / 2 + init.height + 10;

                let {x: tox, y: toy} = thiss.getXY(thiss.last_int + 1, init);
                tox -= init.thickness;
                toy += init.height / 2;
    
                d.drawArrow(fromx, fromy, tox, toy, "white", thiss.myGameArea);
            }
        }

        log[1] = (thiss) => {
            // Draw the prev.next to current.next
            const {x, y} = thiss.getXY(thiss.last_int - 1, init);
            const {x: fromx, y: fromy} = this.getPointerXY(x, y, init);
            let tox = x + init.width * 3 + init.thickness;
            let toy = y + init.height * .5;
            d.drawArrow(fromx, fromy, tox, toy, "white", this.myGameArea);
            thiss.links = [false, true];
        }

        log[2]= (thiss) => {
            thiss.links[1] = false;
        }

        return log;
    }
}