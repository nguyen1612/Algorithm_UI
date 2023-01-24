import { Auto } from "../auto_draw";
import * as d from "../draw";

export default class Search {
    constructor(myGameArea, config) {
        this.myGameArea = myGameArea;
        this.config = config;
        this.auto_draw = new Auto(myGameArea, config);
    }

    search(pivot, array, type) {
        const config = this.config;
        const init = config.node_init;
        const myGameArea = this.myGameArea;
        const auto_draw = this.auto_draw;
        
        // For all nodes
        auto_draw.nodes(config.size);
    
        // For NULL pointer
        let x = init.x + init.width * config.size + init.width * 0.5 * config.size + init.thickness;
        d.drawText(x + 30, init.y + init.height * 0.725, "NULL", "20px Arial", "#F4468E", myGameArea)
    
        // For Head pointer
        auto_draw.control_node(0, "Head");
    
        // For Tail pointer
        auto_draw.control_node(config.size - 1, "Tail");
    
        // For current running node
        auto_draw.control_node(config.i, "Current", true);
    
        // Handle Key press
        this.search_index_controller(config, myGameArea);
    
        // Change UI according to the problem
        this.changeUI(pivot, array, type);
    }
    
    search_index_controller(config, myGameArea) {
        const key = myGameArea.key;
        if (key === "ArrowRight") {
            myGameArea.setKey(false, key);
            config.display = true;
        }
        
        if (key === "ArrowDown") {
            myGameArea.setKey(false, key);
            config.display = false;
        }
    
        if (key === "ArrowLeft") {
            myGameArea.setKey(false, key);
            config.display = true;
        }
    }
    
    changeUI(pivot, array, type) {
        const c = this.config;
        
        // If the user allow the animation to continue
        if (c.display) {
            c.count++;
            // Run without waiting the break between items for the first time
            if (c.firstTime) {
                c.firstTime = false;
                c.i++;
            } else {
                // Control the wait time between items
                if (c.count % 70 === 0) {
                    c.count = 0;
                    this.move(pivot, array, type)
                }
            }
        }
    }
    
    move(pivot, array, type) {
        const c = this.config;
        const myGameArea = this.myGameArea;

        // Terminate State
        if (type === "value" && array[c.i] === pivot) return;
        if (type === "index" && c.i === pivot) return;
        
        // Boundary check
        if(c.i === 0 && myGameArea.prevKey === "ArrowLeft" 
        || c.i === c.size - 1 && myGameArea.prevKey === "ArrowRight")
            return;
        
        // Move by 1 index (Left or Right)
        if (myGameArea.prevKey === "ArrowRight")
            c.i++;
        if (myGameArea.prevKey === "ArrowLeft")
            c.i--;
    }
}