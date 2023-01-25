import * as d from '../draw';

export class Auto {
    constructor(myGameArea, config) {
        this.myGameArea = myGameArea;
        this.config = config;
    }

    // Create Node UI
    nodes(size, except=[], noPointer=[]) {
        const init = this.config.node_init;

        [... new Array(size)].forEach((_, i) => {
            let customPointer = false;
            let x = init.x + init.width * i + init.width * 0.5 * i + init.thickness;
            let y = init.y;

            if (except.includes(i))
                return;
            
            if (noPointer.includes(i)) {
                // let fromx = x + init.width * 0.85;
                // let fromy = y + init.height * 0.5
                // let tox = x + init.width + init.width * 0.5
                // let toy = y - 20 - init.height * 0.5;

                customPointer = true;
                // d.draw_node_rectangle(x, y, init.width, init.height, this.myGameArea, "white", init.thickness, true);
                // d.drawArrow(fromx, fromy, tox, toy, "white", this.myGameArea);
            }

            // if (i === 2) {
            //     let fromx = x + init.width * 0.85;
            //     let fromy = y + init.height * 0.5
            //     let tox = x + init.width + init.width * 0.5
            //     let toy = y - 20 - init.height * 0.5;

            //     d.draw_node_rectangle(x, y, init.width, init.height, this.myGameArea, "white", init.thickness, true);
            //     return d.drawArrow(fromx, fromy, tox, toy, "white", this.myGameArea);
            // } 

            // Display node UI
            return d.draw_node_rectangle(x, y, init.width, init.height, this.myGameArea, "white", init.thickness, customPointer);
        })
    }

    control_node(i, text, under = false) {
        const init = this.config.node_init;
        const head = init.head;

        let x = head.x + head.width * i + head.width * 0.5 * i + init.thickness;
        let text_x = x + head.width * 0.6 - init.thickness;
        let text_y = init.y;

        let arrow_x = text_x;
        let arrow_y = text_y;
        let arrow_toY = init.y;

        let rect_y = init.y;

        // Change position either under or upper node (like Head, Tail, Current node)
        if (under) {
            rect_y = rect_y * 2 - 20;
            text_y *= 2;
            arrow_y = text_y - 15;
            arrow_toY += init.height
        } else {
            rect_y = head.y;
            text_y -= 30;
            arrow_y = text_y + 5;
        }

        d.draw_rectangle(x, rect_y + 5, head.width, head.height / 2 ,this.myGameArea);
        d.drawText(text_x, text_y, text, "16px Arial", "white", this.myGameArea);
        d.drawArrow(arrow_x, arrow_y, arrow_x, arrow_toY, "white", this.myGameArea);
    }

    node(i, isCustomLine) {
        const init = this.config.node_init;
        const head = init.head;
        let x = head.x + head.width * i + head.width * 0.5 * i + init.thickness;

        // draw_node_rectangle(x, head.y, init.width, init.height, this.myGameArea, "white", init.thickness, init.thickness, true);
        d.draw_control_rectangle(x, head.y - 10, head.width, head.height, this.myGameArea, "white", init.thickness, isCustomLine);
    }
}