
// function changeUI(config, index, myGameArea) {
//     const c = config;

//     function set(stop, wait) {
//         c.stop = stop;
//         c.wait = wait;
//     }

//     if (c.display) {
//         if (c.stop) {
//             if (c.wait) {
//                 if (c.firstTime) {
//                     c.firstTime = false;
//                     return set(false, true);
//                 }
//                 setTimeout(() => set(false, true), 1000)
//             }
//             c.wait = false;
//         } else {
//             const to_index = c.count / c.speed;
//             if (to_index < c.size && to_index >= -0.02) {
//                 // Logic UI display
//                 search_display(config, to_index, index, myGameArea);
//             }
//         }
//     }
// }
// function search_display(c, to_index, index, myGameArea) {
//     if (c.curr_i === index) return;
//     if (myGameArea.prevKey === "ArrowRight") {
//         moveOne(to_index, c);
//     }
//     if (myGameArea.prevKey === "ArrowLeft") {
//         backOne(to_index, c);
//     }
// }
// function moveOne(index, c) {
//     c.count++;
//     c.i = index;
//     if (Number.isInteger(c.i)) {
//         c.stop = true;
//         c.curr_i = c.i;
//     }
// }
// function backOne(index, c) {
//     c.count--;
//     c.i = index;
//     if (Number.isInteger(c.i)) {
//         c.stop = true;
//         c.curr_i = c.i;
//     }
// }



function tmp() {
    // const config = state.config;
    // const init = state.config.node_init;
    // const myGameArea = state.myGameArea;
    // const auto_draw = state.auto_draw;

    // // For all nodes
    // auto_draw.nodes(config.size);

    // // For NULL pointer
    // let x = init.x + init.width * config.size + init.width * 0.5 * config.size + init.thickness;
    // d.drawText(x + 30, init.y + init.height * 0.725, "NULL", "20px Arial", "#F4468E", myGameArea)

    // // For Head pointer
    // auto_draw.control_node(0, "Head");

    // // For Tail pointer
    // auto_draw.control_node(config.size - 1, "Tail");

    // // For current running node
    // auto_draw.control_node(config.i, "Current", true);

    // // For new node
    // auto_draw.node(3);

    // // Control the speed of the current node UI - Continuos animation
    // auto_draw.continuos_animation(config)
}