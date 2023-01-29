import Search from "./search";
import Animation from "../../animation";
import * as type from './TYPE';
import * as api from './API';

import InsertAfter from "./insertAfter";
import RemoveMiddle from "./removeMiddle";
import RemoveHead from "./removeHead";
import Test from "./test";
import RemoveTail from "./removeTail";
import InsertAfterTail from "./insertAfter_Tail";


// This class is only use for error checking and directing algorithm
export default class LinkedList extends Animation {
    constructor(state) {
        super(state);
    }

    // This function is called from the constructor of the parent class
    // for directing animation for specific problem and init value;
    _getProblem() {
        this.searchPivot = new Search(this.myGameArea, this.config);

        this.insertAfter = new InsertAfter(this.myGameArea, this.config);
        this.insertAfter_Tail = new InsertAfterTail(this.myGameArea, this.config);

        this.removeMiddle = new RemoveMiddle(this.myGameArea, this.config);
        this.removeHead = new RemoveHead(this.myGameArea, this.config);
        this.removeTail = new RemoveTail(this.myGameArea, this.config);

        this.testObj = new Test(this.myGameArea, this.config);


        // Search Pivot
        if (this.params?.type === type.SEARCH_PIVOT) {
            this.searchPivot.path = api.searchPivot();
            this.searchPivot.params = this.params;
            return this.search_pivot;
        }

        // Insert After
        if (this.params?.type === type.INSERT_AFTER) {
            this.insertAfter.path = api.insertAfter({array: this.params.array});
            this.insertAfter.params = this.params;
            return this.insert_after;
        }

        // Insert After Tail
        if (this.params?.type === type.INSERT_AFTER_TAIL) {
            this.insertAfter_Tail.path = api.insertAfter_Tail({array: this.params.array});
            this.insertAfter_Tail.params = this.params;
            return this.insert_after_tail;
        }

        // Remove Head
        if (this.params?.type === type.REMOVE_HEAD) {
            this.removeHead.path = api.removeHead({array: this.params.array});
            this.removeHead.params = this.params;
            return this.remove_head;
        }

        // Remove Middle
        if (this.params?.type === type.REMOVE_MIDDLE) {
            this.removeMiddle.path = api.removeMiddle({array: this.params.array});
            this.removeMiddle.params = this.params;
            return this.remove_middle;
        }

        // Remove Tail
        if (this.params?.type === type.REMOVE_TAIL) {
            this.removeTail.path = api.removeTail({array: this.params.array});
            this.removeTail.params = this.params;
            return this.remove_tail;
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
        return this.testObj.render();
    }

    search_pivot() {
        return this.searchPivot.render();
    }

    insert_after() {
        return this.insertAfter.render();
    }
    insert_after_tail() {
        return this.insertAfter_Tail.render();
    }

    remove_head() {
        return this.removeHead.render();
    }
    remove_middle() {
        return this.removeMiddle.render();
    }
    remove_tail() {
        return this.removeTail.render();
    }
}