import Search from "./search";
import Animation from "../../animation";
import { Auto } from "../auto_draw";
import * as type from './TYPE';
import * as api from './API';
import Insert from "./insert";


// This class is only use for error checking and directing algorithm
export default class LinkedList extends Animation {
    constructor(state) {
        super(state);
    }

    // This function is called from the constructor of the parent class
    // for directing animation for specific problem and init value;
    _getProblem() {
        this.searchAlgo = new Search(this.myGameArea, this.config);
        this.insertAlgo = new Insert(this.myGameArea, this.config);

        if (this.params?.type === type.SEARCH_INDEX) {
            this.searchAlgo.result = api.searchIndex();
            return this.search_index;
        }

        if (this.params?.type === type.SEARCH_VALUE) {
            this.searchAlgo.result = api.searchValue();
            return this.search_value;
        }

        if (this.params?.type === type.INSERT_VALUE) {
            this.insertAlgo.path = api.insertValue({array: this.params.array});
            return this.insert;
        }

        return () => {};
    }

    search_index() {
        let index;

        if (this.params?.index)
            index = this.params.index;
        
        if (index !== undefined)
            return this.searchAlgo.search(index, this.params.array, "index");
    }

    search_value() {
        let value;

        if (this.params?.value)
            value = this.params.value;
        
        if (value !== undefined)
            return this.searchAlgo.search(value, this.params.array, "value");
    }

    insert() {
        const p = this.params;
        if (!p.value || !p.index)
            throw Error("Must provide (value, index) data");

        return this.insertAlgo.insert(this.params.array);
    }

    delete() {

    }
}