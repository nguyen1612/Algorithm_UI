export function draw_control_rectangle(x, y, width, height, value, myGameArea, color="black", thickness = 1, isCustomLine) {
    draw_node_rectangle(x, y, width, height, value, myGameArea, color, thickness, true);
    
    if (isCustomLine)
        return;
    let fromx = x + width * 0.85;
    let fromy = y + height * 0.5;
    let tox = x + width + width * 0.5;
    let toy = y + height * 0.5;

    // Draw Vertical Line
    tox = fromx;
    toy = y + height + height * 0.2;
    draw_dashed_line(fromx, fromy, tox, toy, "white", myGameArea);

    // Draw horizontal line 
    fromx = x + width * 0.85 + 0.5;
    fromy = y + height + height * 0.2 + 1;
    tox = fromx - width * 0.5 - 0.5;
    toy = y + height + height * 0.2 + 1;
    draw_dashed_line(fromx, fromy, tox, toy, "white", myGameArea);

    // Draw Vertical Line
    fromx = tox - .5;
    fromy = toy - .5;
    tox = tox - .5;
    toy = toy + height * 0.30;
    drawArrow(fromx, fromy, tox, toy, "white", myGameArea);
}

export function draw_rectangle(x, y, width, height, myGameArea) {
    let ctx = myGameArea.context;
    ctx.fillStyle = '#F4468E'
    ctx.fillRect(x, y, width, height);
}

export function draw_node_rectangle(x, y, width, height, value, myGameArea, color="black", thickness = 1, isCustomLine) {
    let ctx = myGameArea.context;
    ctx.save();

    ctx.fillStyle = '#C2E1F9';
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle='#88CEF8';
    ctx.fillRect(x + (thickness), y + (thickness), width - (thickness * 2), height - (thickness * 2));

    // Vertical Line split rectangle in half ( | )
    ctx.beginPath();
    ctx.moveTo(x + width * 0.7, y);
    ctx.lineTo(x + width * 0.7, y + height);
    ctx.strokeStyle = '#C2E1F9';
    ctx.stroke();

    if (!isCustomLine) {
        // Pointer to new rectangle ( -> )
        let fromx = x + width * 0.85;
        let fromy = y + height * 0.5
        let tox = x + width + width * 0.5
        let toy = y + height * 0.5;
        drawArrow(fromx, fromy, tox, toy, color, myGameArea);
    }

    // Draw text
    ctx.font = "14px Arial";
    ctx.fillStyle='black';
    ctx.textAlign = 'center';
    ctx.fillText(value, x + width * 0.35, y + height * 0.65);

    ctx.restore();
}

export function drawText(x, y, value, font, color, myGameArea) {
    let ctx = myGameArea.context;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(value, x, y);
}

export function drawLine(fromX, fromY, toX, toY, color, myGameArea) {
    let ctx = myGameArea.context;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.stroke();
}

export function draw_dashed_line(fromX, fromY, toX, toY, color, myGameArea) {
    let ctx = myGameArea.context;
    ctx.save();    
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.setLineDash([3]);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.restore(); 
}

export function drawArrow(fromx, fromy, tox, toy, color, myGameArea) {
    var headlen = 8;   // length of head in pixels
    var angle = Math.atan2(toy-fromy, tox-fromx);

    let ctx = myGameArea.context;
    ctx.save();    
    ctx.strokeStyle = color; // defaults to black
    ctx.lineWidth = 2;

    // dashed part
    ctx.beginPath();
    ctx.setLineDash([3]);
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();

    // second part -non dashed-
    ctx.beginPath();
    ctx.setLineDash([0]);
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6), toy-headlen*Math.sin(angle-Math.PI/6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6), toy-headlen*Math.sin(angle+Math.PI/6));
    ctx.stroke();

    ctx.restore();          // this will, in fact, restore strokeStyle
}