import {useState} from 'react';

import Display from "../display"
import Controller from './controller'


function Index() {
    const [data, setData] = useState({});
    const [render, setRender] = useState(true);

    function handleStart(settings) {
        setData({...settings, render: true})
    }

    function handleStop() {
        setRender(prev => !prev);
    }

    return <div className='home-section'>
        <main className="display">
            <div className="txt-center">
                <h2>Linked-List</h2>
            </div>

            <div className="controller_speed">
                {/* <button className="btn-1">{"<"}</button> */}
                <button className="btn-1" onClick={handleStop}>
                    {render ? "||" : ">"}
                </button>
                <button className="btn-1">{">"}</button>
            </div>

            <canvas id="myCanvas" width="800" height="500">
                <Display config={data} render={render}/>
            </canvas>
        </main>
        <Controller handleStart={handleStart}/>
    </div>
}

export default Index