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
    params: {type: type.SEARCH_PIVOT, index: 4, value: 40, array: [30, 33, 20, 15, 10]},
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
function Setting(props) {
    const {handleStart} = props;

    const [data, setData] = useState(init);

    function startAnimation() {
        handleStart(data);
    }

    return <div className='setting-wrapper'>
        <div className="flex-col">
            <h4>Array Input</h4>
            <textarea rows={3}></textarea>
        </div>
        
        <div>
            <label htmlFor="max_len">Max Length Array: </label>
            <input type="number" className="input-not-allow" id="max_len" value={7} readOnly disabled max="6"/>
        </div>

        <div>
            <h4>Operation</h4>
            <div className="operations">
                <div>
                    <input type="radio" id="html" defaultChecked name="operations" value="HTML" />
                    <label htmlFor="html">Search</label><br/>
                </div>
                <div>
                    <input type="radio" id="css" name="operations" value="CSS" />
                    <label htmlFor="css">Insert</label><br/>
                </div>
                <div>
                    <input type="radio" id="javascript" name="operations" value="JavaScript" />
                    <label htmlFor="javascript">Delete</label>
                </div>
            </div>
        </div>

        <div>
            <h4>Value</h4>
            <div className="flex-col">
                <div>
                    <label>Index: </label>
                    <input type="number" className="input-1" placeholder='Ex: 1' maxLength={2} max={9} min="0"/>
                </div>
                <div className="block-ipt">
                    <div>
                        <label>Value: </label>
                        <input type="text" className="input-1 success" placeholder='Ex: A10' maxLength={4}/>
                    </div>
                    <div>
                        <label>New Value: </label>
                        <input type="text" className="input-1" placeholder='Ex: D10' disabled maxLength={4}/>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="execute">
            <button className="btn-1">Reset</button>
            <button className="btn-1" onClick={startAnimation}>Start</button>
        </div>
    </div>
}

function Code() {
    return 
}

export default Controller