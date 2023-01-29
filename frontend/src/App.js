import {useRef, useState, useEffect} from 'react'
import Controller from './Data Structure/LinkedList/controller.js';
import LinkedList from './Data Structure/LinkedList/index.js';

import algo_img from "./icon/algorithm.png"


function App() {

    const [popup, setPopup] = useState(false);

    function handlePopUp() {
        setPopup(prev => !prev);
    }

    return <>
        <main className="container">
            <Nav handlePopUp={handlePopUp}/>
            <LinkedList/>
            {/* <Controller/> */}
        </main>

        {popup && <Popup handlePopUp={handlePopUp}/>}
    </>
}


function Popup(props) {
    const {handlePopUp} = props;
    const wrapperRef = useRef(null);
    useOutside(wrapperRef, handlePopUp);

    return <>
    <div className="search-popup">
    </div>

    <div className="search-wrapper" ref={wrapperRef}>
        <div className="search">
            <div className="title">
                <h4>Find Something</h4>
                <span className="close thick" onClick={handlePopUp}></span>
            </div>

            <div className="block-ipt">
                <input className="input-1" placeholder=' ' />
                <button className="btn-1">Search</button>
            </div>

            <div className="data">
                <div className="item">
                    <div className="title-head" style={{"fontWeight": 600}}>
                        <span>Name</span>
                    </div>
                    <div className="tags-head" style={{"fontWeight": 600}}>
                        <span>Category</span>
                    </div>
                </div>
                <div className="line"></div>

                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
            </div>
        </div>
    </div>
    </>
}

function Item() {
    return <>
        <div className="item">
            <div className="title">
                <a href="#">Result 1 Result 1 </a>
            </div>
            <div className="tags-head">
                <span>AI</span>
            </div>
        </div>
        <div className="line"></div>
    </>
}

function Nav(props) {
    const {handlePopUp} = props

    const sidebar = useRef(null);

    return <nav className="sidebar" ref={sidebar}>
        <div className="logo_wrapper">
            <img src={algo_img} id="btn" className="icon logo_icon"/>
        </div>

        <div>
            <ul className="nav-list">
                <li>
                    <div className='input-wrap' onClick={handlePopUp}>
                        <i className='bx bx-search'></i>
                        <span className="tooltip">Search</span>
                    </div>
                </li>
                <li onClick={handlePopUp}>
                    <a href="#">
                        <i className='bx bx-data'></i>
                    </a>
                    <span className="tooltip">Data Structure</span>
                </li>
                <li onClick={handlePopUp}>
                    <a href="#">
                        <i className='bx bx-brain'></i>
                    </a>
                    <span className="tooltip">Algorithm</span>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bx-info-circle'></i>
                    </a>
                    <span className="tooltip">Info</span>
                </li>
                <li>
                    <a href="#">
                        <i className='bx bx-history'></i>
                    </a>
                    <span className="tooltip">Activity</span>
                </li>
            </ul>
        </div>
    </nav>
}


function useOutside(ref, handlePopUp) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            handlePopUp();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () =>  document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);
  }

export default App