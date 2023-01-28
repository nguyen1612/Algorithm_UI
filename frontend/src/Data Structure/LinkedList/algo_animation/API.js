import axios from 'axios'

export function searchIndex() {
    return [0, 1, 2];
}

export function searchValue() {
    return [0, 1, 2];
}

export function insertAfter(params) {
    const {array} = params;
    
    // [30, 40, 20, 10, 100, 22]
    return [0, 1, 2, 3, 'new top', 'new to prev.next', "prev to nothing", 'prev to new', "new normal"];
}

export function insertBefore(params) {
    const {array} = params;
    
    // [30, 40, 20, 10, 100, 22]
    return [0, 1, 'new top', 'new to prev.next', "prev to nothing", 'prev to new', "new normal"];
}

export function deleteItem(params) {
    const {array} = params;
    
    // [30, 40, 20, 10, 100, 22]
    return [0, 1, 2, 'move top', 'prev to current.next', 'unlink current'];
}

export function test(params) {
    const {array} = params;
    
    // [30, 40, 20, 10, 100, 22]
    return [0, 1, 2, 'move top', 'prev to current.next', 'unlink current'];
}