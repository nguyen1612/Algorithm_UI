import {useEffect} from 'react';
import Animation from './algo_animation/index.js';
import LinkedList from './algo_animation/linkedlist.js';

function Display(props) {
    let {config} = props;

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
        
        myGameArea.start();
        
        const nodeUI = new display(myGameArea);

        return () => {
            clearInterval(myGameArea.interval);
        }
    }, [config])
    
    function display(myGameArea) {
        // // Starting || Default Node config
        // const init = {
        //     x: 5, y: 75, width: 70, height: 40, thickness: 5,
        //     head: {
        //         x: 5, y: 25, width: 70, height: 40, thickness: 5,
        //     }
        // }
        // const global_config = {
        //     count: 0,
        //     i: 0,
        //     size: 6,
        //     speed: 50,

        //     display: false,
        //     firstTime: true,
        //     previous: false,
        //     stop: false,
        //     wait: true,

        //     node_init: init
        // }   

        // // Sample running animation
        // // const array = [1, 50, 100, 40, 20, 43];
        // const params = {index: 3, array};

        const algorithm = algorithm_factory("LinkedList", {myGameArea, config});

        // const animation = new Animation(algorithm);

        this.update = function() {
            algorithm.render();
            // animation.render();
        }
    }

    function algorithm_factory(type, state) {
        if (type === "LinkedList")
            return new LinkedList(state);
    }
}

export default Display