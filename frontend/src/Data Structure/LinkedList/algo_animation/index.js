import Search from "./search";
import { Auto } from "../auto_draw";

export default class Animation {
    constructor(myGameArea, config) {
        this.myGameArea = myGameArea;
        this.config = config;
        this.auto_draw = new Auto(myGameArea, config);
        this.array = null;
    }

    setArray(array) {
        // Need to detect array size
        //
        this.array = array;
        this.config.size = array.length;
    }

    setHistory(history) {
        this.history = history;
    }

    // Check Error & Flow for any related search algorithm
    search(params) {
        const {index, value} = params;
        
        if (index && value)
            throw Error("Cannot display animation for both finding index and value");
        
        const search = new Search(this.myGameArea, this.config);
        if (value !== undefined)
            return search.search(value, this.array, "value");
        if (index !== undefined)
            return search.search(index, this.array, "index");
    }
}
