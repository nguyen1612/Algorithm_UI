import axios from 'axios'

export function searchIndex() {
    return [0, 1, 2, 3];
}

export function searchValue() {
    return [0, 1, 2];
}

export function insertValue(params) {
    const {array} = params;
    
    // [30, 40, 20, 10, 100, 22]
    return [0, 1, 2, 3, 'new', 'new to prev.next', "prev to nothing", 'prev to new'];
}