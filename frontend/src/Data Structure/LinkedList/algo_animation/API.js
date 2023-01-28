import axios from 'axios'

export function searchPivot() {
    return [0, 1, 2];
}

export function insertAfter(params) {
    const {array} = params;
    
    return [0, 1, 2, 3, 'new top', 'new to prev.next', "prev to nothing", 'prev to new', "new normal"];
}

export function insertBefore(params) {
    const {array} = params;
    
    return [0, 1, 'new top', 'new to prev.next', "prev to nothing", 'prev to new', "new normal"];
}

export function removeMiddle(params) {
    const {array} = params;
    
    return [0, 1, 2, 'move top', 'prev to current.next', 'unlink current'];
}

export function removeHead(params) {
    const {array} = params;
    
    return [0];
}

export function removeTail(params) {
    const {array} = params;

    return [0, 1, 2, 3];
}

export function test(params) {
    const {array} = params;
    
    return [0, 1, 2, 3];
}