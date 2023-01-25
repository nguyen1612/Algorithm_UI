import Search from "./search";
import Animation from "./index";

export default class LinkedList extends Animation {
    constructor(state) {
        super(state);
        this.searchAlgo = new Search(this.myGameArea, this.config);
    }

    getProblem() {
        return this.search;
    }

    // Check Error & Flow for any related search algorithm
    search() {
        let index, value;
        if (this.params?.index || this.params?.value) {
            index = this.params.index;
            value = this.params.value;
        }
        
        if (index && value)
            throw Error("Cannot display animation for both finding index and value");
        
        if (value !== undefined)
            return this.searchAlgo.search(value, this.params.array, "value");
        if (index !== undefined)
            return this.searchAlgo.search(index, this.params.array, "index");
    }

    insert() {

    }

    delete() {

    }
}