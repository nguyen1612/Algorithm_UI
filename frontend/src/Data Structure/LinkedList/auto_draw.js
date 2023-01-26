import * as d from '../draw';

export class Auto {
    constructor(myGameArea, config) {
        this.myGameArea = myGameArea;
        this.config = config;
    }

    // Create Node UI
    nodes(array, shift={from: 0, n: 0}, noPointer=[]) {
        const init = this.config.node_init;

        array.forEach((value, i) => {
            let customPointer = false;
            let block = init.x + init.width;
            let pointer = init.width * 0.5;

            if (i >= shift.from && shift.from !== 0)
                i += shift.n;

            let x = block * i + pointer * i + init.thickness;
            let y = init.y;

            if (noPointer.includes(i))
                return d.draw_node_rectangle(x, y, init.width, init.height, value,  this.myGameArea, "white", init.thickness, true);
        
            if (i === shift.from - 1)
                customPointer = true;

            d.draw_node_rectangle(x, y, init.width, init.height, value,  this.myGameArea, "white", init.thickness, customPointer);
        
            if (i === shift.from - 1) {
                let fromx = x + init.width * .85;
                let fromy = y + init.height * .5
                let tox = x + init.width * 3 + init.thickness;
                let toy = y + init.height * .5;
                d.drawArrow(fromx, fromy, tox, toy, "white", this.myGameArea);
            }
        })
    }

    control_node(i=0, shift={from: 0, n: 0}, text="NULL", under = false) {
        const init = this.config.node_init;
        const head = init.head;
        let block = head.x + head.width;
        let pointer = head.width * 0.5;

        if (i >= shift.from && shift.from !== 0)
            i += shift.n;

        let x = block * i + pointer * i + init.thickness;
        let text_x = x + head.width * 0.55 - init.thickness;
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

    node(i, value, isCustomLine) {
        const init = this.config.node_init;
        const head = init.head;
        let x = (head.x + head.width) * i + head.width * 0.5 * i + init.thickness;

        d.draw_control_rectangle(x, head.y - 10, head.width, head.height, value, this.myGameArea, "white", init.thickness, isCustomLine);
    }
}