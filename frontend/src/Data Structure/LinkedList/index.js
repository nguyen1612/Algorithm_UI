import Display from "./display"

function Index() {
    return <div className='home-section'>
        <main className="display">
            <div className="txt-center">
                <h2>Linked-List</h2>
            </div>

            <div className="controller_speed">
                <button className="btn-1">{"<"}</button>
                <button className="btn-1">||</button>
                <button className="btn-1">{">"}</button>
            </div>

            <canvas id="myCanvas" width="800" height="500">
                <Display/>
            </canvas>
        </main>
    </div>
}

export default Index