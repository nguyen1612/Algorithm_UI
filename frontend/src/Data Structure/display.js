import {useEffect} from 'react';
import LinkedList from './LinkedList/algo_animation/index';

function Display(props) {
    let {config, render} = props;

    useEffect(() => {

        var myGameArea = {
            canvas : document.getElementById("myCanvas"),
            key: false,
            prevKey: false,
            
            setKey: function(key, prevKey) {
                this.key = key;
                this.prevKey = prevKey;
            },
            start : function() {
                console.log(this);
                this.context = this.canvas.getContext("2d");
                this.interval = setInterval(updateGameArea, 20);
                window.addEventListener('keydown', function (e) {
                    myGameArea.setKey(e.key, myGameArea.prevKey);
                })
                window.addEventListener('keyup', function (e) {
                    myGameArea.setKey(false, myGameArea.prevKey);
                })
            },
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
        }
    
        function updateGameArea() {
            myGameArea.clear();
            nodeUI.update();
        }

        if (!config.reset) {
            myGameArea.start();
            // if (!render) {
            //     myGameArea.setKey(false, "ArrowDown");
            // } else {
            //     myGameArea.setKey(false, "ArrowRight");
            // }
        }

        const nodeUI = new display(myGameArea);
        
        return () => {
            if (myGameArea.context)
                myGameArea.clear();
            clearInterval(myGameArea.interval);
        }
    }, [config, render])
    
    function display(myGameArea) {
        const algorithm = algorithm_factory("LinkedList", {myGameArea, config});

        this.update = function() {
            algorithm.render();
        }
    }

    function algorithm_factory(type, state) {
        if (type === "LinkedList")
            return new LinkedList(state);
    }
}

export default Display