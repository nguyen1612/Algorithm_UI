import Search from "./search";
import Animation from "../../animation";
import { Auto } from "../auto_draw";
import * as type from './TYPE';
import * as api from './API';
import InsertAfter from "./insertAfter";
import { InsertBefore } from "./insertBefore";


// This class is only use for error checking and directing algorithm
export default class LinkedList extends Animation {
    constructor(state) {
        super(state);
    }

    // This function is called from the constructor of the parent class
    // for directing animation for specific problem and init value;
    _getProblem() {
        this.searchAlgo = new Search(this.myGameArea, this.config);
        this.insertAfter = new InsertAfter(this.myGameArea, this.config);
        this.insertBefore = new InsertBefore(this.myGameArea, this.config);

        if (this.params?.type === type.SEARCH_INDEX) {
            this.searchAlgo.path = api.searchIndex();
            this.searchAlgo.params = this.params;
            return this.search_index;
        }

        if (this.params?.type === type.SEARCH_VALUE) {
            this.searchAlgo.path = api.searchValue();
            this.searchAlgo.params = this.params;
            return this.search_value;
        }

        if (this.params?.type === type.INSERT_AFTER) {
            this.insertAfter.path = api.insertAfter({array: this.params.array});
            this.insertAfter.params = this.params;
            return this.insert_after;
        }

        if (this.params?.type === type.INSERT_BEFORE) {
            this.insertBefore.path = api.insertBefore({array: this.params.array});
            this.insertBefore.params = this.params;
            return this.insert_before;
        }

        return () => {};
    }

    search_index() {
        let index;

        if (this.params?.index)
            index = this.params.index;
        
        if (index !== undefined)
            return this.searchAlgo.search("index");
    }

    search_value() {
        let value;

        if (this.params?.value)
            value = this.params.value;
        
        if (value !== undefined)
            return this.searchAlgo.search("value");
    }

    insert_after() {
        const p = this.params;
        if (!p.value || !p.index)
            throw Error("Must provide (value, index) data");

        return this.insertAfter.insert();
    }

    insert_before() {
        const p = this.params;
        if (!p.value || !p.index)
            throw Error("Must provide (value, index) data");

        return this.insertBefore.insert();
    }

    delete() {

    }
}