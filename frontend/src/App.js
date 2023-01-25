import {useRef} from 'react'
import Controller from './Data Structure/LinkedList/controller.js';
import LinkedList from './Data Structure/LinkedList/index.js';

import algo_img from "./icon/algorithm.png"

function App() {
    return <main className="container">
        <Nav/>
        <LinkedList/>
        {/* <Controller/> */}
    </main>
}

function Nav() {
    const sidebar = useRef(null);
    const btn = useRef(null);
    const bx_search = useRef(null);
    const dataStructure = useRef(null);
    const algorithm = useRef(null);

    function toggleSideBar() {
        sidebar.current.classList.toggle("open");
        menuBtnChange();
    }

    function menuBtnChange() {
        if (sidebar.current.classList.contains("open")) {
            btn.current.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            btn.current.classList.replace("bx-menu-alt-right","bx-menu");
        }
    }

    function toggleDropDown(item) {
        if (item.current.classList.contains("bx-chevron-up")) {
            item.current.classList.replace("bx-chevron-up", "bx-chevron-down");
        } else {
            item.current.classList.replace("bx-chevron-down", "bx-chevron-up");
        }
    }


    return <nav className="sidebar" ref={sidebar}>
        <div className="logo_wrapper">
            <img src={algo_img} className="icon logo_icon"/>
            <div className="logo_name">Algorithm UI</div>
            <i className='bx bx-menu' id="btn" ref={btn} onClick={toggleSideBar}></i>
        </div>

        <div>
            <ul className="nav-list">
                <li>
                    <div className='input-wrap'>
                        <input type="text" placeholder="Search..." />
                        <i className='bx bx-search' ref={bx_search} onClick={toggleSideBar}></i>
                        <span className="tooltip">Search</span>
                    </div>
                </li>
                <li>
                    <a href="#" onClick={() => toggleDropDown(dataStructure)}>
                        <i className='bx bx-data'></i>
                        <div className='end_icon'>
                            <span className="links_name">Data Structure</span>
                            <i className='bx bx-chevron-up' ref={dataStructure}></i>
                        </div>
                    </a>
                    <span className="tooltip">Data Structure</span>

                    <ul className="nav-list">
                        <li>
                            <a href="#">
                                <span className="nest_index">1</span>
                                <span className="links_name">Algorithm Algorithm</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="nest_index">2</span>
                                <span className="links_name">Algorithm</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#" onClick={() => toggleDropDown(algorithm)}>
                        <i className='bx bx-brain'></i>
                        <div className='end_icon'>
                            <span className="links_name">Algorithm</span>
                            <i className='bx bx-chevron-up' ref={algorithm}></i>
                        </div>
                    </a>
                    <span className="tooltip">Algorithm</span>
                    <ul className="nav-list">
                        <li>
                            <a href="#">
                                <span className="nest_index">1</span>
                                <span className="links_name">Algorithm</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="nest_index">2</span>
                                <span className="links_name">Algorithm</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bx-info-circle'></i>
                        <span className="links_name">Info</span>
                    </a>
                    <span className="tooltip">Info</span>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bx-history'></i>
                        <span className="links_name">Activity</span>
                    </a>
                    <span className="tooltip">Activity</span>
                </li>
            </ul>
        </div>
    </nav>
}

export default App