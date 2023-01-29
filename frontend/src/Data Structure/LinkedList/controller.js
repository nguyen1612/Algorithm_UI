import {useRef, useState} from 'react';
import * as type from "./algo_animation/TYPE";

function Controller(props) {
    const {handleStart} = props

    return <section className="setting">
    <div className="setting-wrapper">
        <h3>Controller</h3>
        <div className="small_nav">
            <ul className="tabs" role="tablist">
                <li>
                    <input type="radio" name="tabs" id="tab1" className='tab-input' defaultChecked />
                    <label htmlFor="tab1" className="tab-label" role="tab" aria-selected="true" aria-controls="panel1" tabIndex="0">
                        Setting
                    </label>
                    <div id="tab-content1" className="tab-content" role="tabpanel" aria-labelledby="description" aria-hidden="false">
                        <Setting handleStart={handleStart}/>
                    </div>
                </li>
            
                <li>
                    <input type="radio" name="tabs" id="tab2" className="tab-input" />
                    <label htmlFor="tab2" className="tab-label" role="tab" aria-selected="false" aria-controls="panel2" tabIndex="0">
                        Code
                    </label>
                    <div id="tab-content2" className="tab-content" role="tabpanel" aria-labelledby="specification" aria-hidden="true">
                        <Code/>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    </section>
}


const init = {
    reset: false,
    params: {type: type.INSERT_AFTER, value: 40, array: [30, 33, 20, 15, 10]},
    node_init: {
        x: 5, y: 75, width: 70, height: 40, thickness: 5,
        head: {
            x: 5, y: 25, width: 70, height: 40, thickness: 5,
        }
    },
    UI: {
        count: 0,
        i: 0,
        speed: 30,

        display: true,
        firstTime: true,
        previous: false,
        stop: false,
        wait: true,
    }
}
const setting = {
    input: "",
    type: "search",
    current_value: 0,
    new_value: 0,
}
function Setting(props) {
    const {handleStart} = props;

    const [param, setParam] = useState(setting);

    function startAnimation() {
        const obj = getResult();
        console.log(obj);

        if (!obj)
            return;

        const config = {
            ...init,
            params: {...obj},
            reset: false
        }

        handleStart(config);
    }

    function getResult() {
        let {array, status} = getArray();
        if (!status)
            return false;
        
        const requirement = getOperation(array);
        if (!requirement.status) {
            return false;
        }
        
        return {array, ...requirement, };
    }

    function getArray() {
        let status = true;
        const array = param.input.split(",");

        if (array.length > 7) {
            alert("Your array must less than 7");
            return {array: [], status: false};
        }

        for (let i = 0; i < array.length; i++) {
            const data = array[i].trim()
            if (data >= '0' && data <= '9') {
                array[i] = Number(data);
            } else {
                alert("Your input must be an array of numbers")
                return {array: [], status: false};
            }
        }

        return {array, status};
    }

    function getOperation(array) {
        const input_type = param.type;
        let operation = false;
        const value = param.current_value;
        const new_val = param.new_value;

        if (input_type === "search") {
            if (value < '0' || value > '9') {
                alert("Your value must be number");
                return {status: false};
            }
            return {type: type.SEARCH_PIVOT, value: Number(value), status: true};
        }

        if (input_type === "insert") {
            if (value < '0' || value > '9' && new_val < '0' || new_val > '9') {
                alert("Your value/new value must be a number");
                return {status: false};
            }
            if (array[array.length - 1] === Number(value)) {
                return {type: type.INSERT_AFTER_TAIL, value: Number(value), new_value: Number(new_val), status: true};
            } else {
                return {type: type.INSERT_AFTER, value: Number(value), new_value: Number(new_val), status: true};
            }
        }

        if (input_type === "remove") {
            if (value < '0' || value > '9') {
                alert("Your value must be a number");
                return {status: false};
            }
            if (array[0] === Number(value))
                return {type: type.REMOVE_HEAD, value: Number(value), status: true};
            if (array[array.length - 1] === Number(value))
                return {type: type.REMOVE_TAIL, value: Number(value), status: true};
            else
                return {type: type.REMOVE_MIDDLE, value: Number(value), status: true};
        }

        return operation;
    }

    function handleValue(e) {
        setParam(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleReset(e) {
        handleStart({...init, reset: true});
        setParam(setting);
    }

    return <div className='setting-wrapper'>
        <div className="flex-col">
            <h4>Data Input</h4>
            <textarea rows={3} value={param.input} name="input" onChange={handleValue} placeholder='Ex: 1, 2, 3, 4'></textarea>
        </div>
        
        <div>
            <label htmlFor="max_len">Max Length Array: </label>
            <input type="number" className="input-not-allow" id="max_len" value={7} readOnly disabled max="6"/>
        </div>

        <div>
            <h4>Operation</h4>
            <div className="operations">
                <div>
                    <input type="radio" id="html" defaultChecked name="type" value="search" onChange={handleValue}/>
                    <label htmlFor="html">Search</label><br/>
                </div>
                <div>
                    <input type="radio" id="css" name="type" value="insert" onChange={handleValue}/>
                    <label htmlFor="css">Insert</label><br/>
                </div>
                <div>
                    <input type="radio" id="javascript" name="type" value="remove" onChange={handleValue}/>
                    <label htmlFor="javascript">Delete</label>
                </div>
            </div>
        </div>

        <div>
            <h4>Value</h4>
            <div className="flex-col">
                <div>
                    <label>Value: </label>
                    <input type="number" className="input-1" placeholder='Ex: 1' maxLength={2} max={9} min="0" name="current_value"
                            onChange={handleValue} value={param.current_value}/>
                </div>
                <div>
                    <label>New Value: </label>
                    <input type="text" className="input-1 success" placeholder='Ex: A10' maxLength={4} name="new_value"
                            onChange={handleValue}/>
                </div>
            </div>
        </div>
        
        <div className="execute">
            <button className="btn-1" onClick={handleReset}>Reset</button>
            <button className="btn-1" onClick={startAnimation}>Start</button>
        </div>
    </div>
}

function Code() {
    return 
}

export default Controller