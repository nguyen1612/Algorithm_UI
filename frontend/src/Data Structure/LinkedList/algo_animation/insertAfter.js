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
        this.firstTime = true;

        this.last_int = 0;
        this.pointer = -1;

        // UI render
        this.fixedUI = 5;
        this.log = this.getLog();
    }

    render() {
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
        const init = this.config.node_init;
        const log = []

        log[0] = function (thiss) {
            thiss.auto_draw.node(thiss.last_int + 1, thiss.params.value, true);
            thiss.shiftRight = {from: thiss.last_int + 1, n: 1};
        }

        log[1] = function(thiss) {
            let i = thiss.last_int + 2;
            const head = init.head;

            let {x: fromx, y: fromy} = thiss.getXY(thiss.last_int + 1, head);
            fromx = fromx + init.width * .85
            fromy = fromy - 10 + init.height / 2;

            let {x: tox, y: toy} = thiss.getXY(i, head);
            tox -= init.thickness
            toy = toy - 10 + 60 + toy - init.thickness;

            d.drawArrow(fromx, fromy, tox, toy, "white", thiss.myGameArea);
        }
        
        log[2] = function(thiss) {
            thiss.pointer = thiss.last_int;
        }

        log[3] = function(thiss) {
            const {x, y} = thiss.getXY(thiss.last_int, init);
            let {x: fromx, y: fromy} = thiss.getPointerXY(x, y, init);
            
            fromy += init.thickness;
            let tox = x + init.width + init.width * 0.5 + init.thickness;
            let toy = y - 20 - init.height * 0.5;

            d.drawArrow(fromx, fromy, tox, toy, "white", thiss.myGameArea);
        }

        log[4] = function(thiss) {
            for (let i = 0; i < 4; i++)
                thiss.log[i] = ()=>{};
            thiss.pointer = -1;
            thiss.shiftRight = thiss.noShift;
            thiss.once(thiss, "firstTime", ()=> thiss.params.array.splice(thiss.last_int + 1, 0, thiss.params.value))
        }

        return log;
    }
}