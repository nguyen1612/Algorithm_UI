import Search from "./search";
import Animation from "../../animation";
import { Auto } from "../auto_draw";
import * as type from './TYPE';
import * as api from './API';

import InsertAfter from "./insertAfter";
import InsertBefore from "./insertBefore";
import Remove from "./remove";
import Test from "./test";


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
        this.removeItem = new Remove(this.myGameArea, this.config);

        this.testObj = new Test(this.myGameArea, this.config);


        // Search index
        if (this.params?.type === type.SEARCH_INDEX) {
            this.searchAlgo.path = api.searchIndex();
            this.searchAlgo.params = this.params;
            return this.search_index;
        }

        // Search value
        if (this.params?.type === type.SEARCH_VALUE) {
            this.searchAlgo.path = api.searchValue();
            this.searchAlgo.params = this.params;
            return this.search_value;
        }

        // Insert After
        if (this.params?.type === type.INSERT_AFTER) {
            this.insertAfter.path = api.insertAfter({array: this.params.array});
            this.insertAfter.params = this.params;
            return this.insert_after;
        }

        // Insert before
        if (this.params?.type === type.INSERT_BEFORE) {
            this.insertBefore.path = api.insertBefore({array: this.params.array});
            this.insertBefore.params = this.params;
            return this.insert_before;
        }

        // Delete Item
        if (this.params?.type === type.REMOVE_ITEM) {
            this.removeItem.path = api.deleteItem({array: this.params.array});
            this.removeItem.params = this.params;
            return this.remove;
        }

        // Test Class
        if (this.params?.type === type.TEST) {
            this.testObj.path = api.test({array: this.params.array});
            this.testObj.params = this.params;
            return this.test;
        }

        return () => {};
    }

    test() {
        return this.testObj.test();
    }

    search_index() {
        return this.searchAlgo.render();
    }

    search_value() {
        return this.searchAlgo.render();
    }

    insert_after() {
        return this.insertAfter.render();
    }

    insert_before() {
        return this.insertBefore.render();
    }

    remove() {
        return this.removeItem.render();
    }
}