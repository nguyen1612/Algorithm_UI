export default class Controller {
    constructor(myGameArea, config) {
        this.config = config; 
        this.myGameArea = myGameArea;

        // Useful data
        this.params = null;
        this.path = null;
        this.i = 0;

        this.auto_mode = true;
        this.userMove = true;
    }

    _controller() {
        const myGameArea = this.myGameArea;

        const key = myGameArea.key;
        if (key === "ArrowRight") {
            myGameArea.setKey(false, key);
            this.config.display = true;
            this.auto_mode = false;
            this.userMove = true;
        }
        
        if (key === "ArrowDown") {
            myGameArea.setKey(false, key);
            this.config.display = false;
            this.auto_mode = false;
        }
    }

    _animation_mode() {
        this.config.count++;

        // Control animation mode
        if (!this.auto_mode) {
            if (this.userMove) {
                this.userMove = false;
                this.config.count = 0;

                if (this.i === 0)
                    if (this.myGameArea.prevKey !== "ArrowRight")
                        return

                this._update(this.i + 1);
            }
            return true;
        }

        // Auto animation mode
        if (this.config.count % this.config.speed === 0) {
            this.config.count = 0;
            this._update(this.i + 1);
        }
    }

    _update(index) {
        this.i = index;
        if (Number.isInteger(this.path[index]))  
            this.config.i = this.path[index]; 
    }
}