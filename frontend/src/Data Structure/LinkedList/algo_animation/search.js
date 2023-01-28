import { Auto } from "../auto_draw";
import * as d from "../../draw";
import Controller from "../../controller";

export default class Search extends Controller {
    constructor(myGameArea, config) {
        super(myGameArea, config)
        this.auto_draw = new Auto(myGameArea, config);

        this.noShift = {from: 0, n: 0};
        this.shiftRight = this.noShift;
    }

    render() {
        const config = this.config;
        const init = config.node_init;
        const auto_draw = this.auto_draw;
        const array = this.params.array;

        auto_draw.nodes(array);
        auto_draw.control_node(0, this.noShift, "Head");
        auto_draw.control_node(array.length - 1, this.noShift, "Tail");

        // For NULL pointer
        let pointer = init.width * 0.5 ;
        let block = init.x + init.width;
        let i = array.length;
        let x = block * i + pointer * i + init.thickness;
        d.drawText(x + 30, init.y + init.height * 0.725, "NULL", "20px Arial", "#F4468E", this.myGameArea)

        // For current running node
        auto_draw.control_node(config.i, this.noShift, "Current", true);
    
        // Handle user's key press
        this._controller();
    
        // Change UI according to the problem
        this.effects();
    }
    
    effects() {
        const c = this.config;

        if(!c.display)
            return;
        
        this._animation_mode(c);
    }
}