import React, {useState,useEffect} from 'react';
// import ReactSlider from 'react-slider'
import logo from './logo.svg';
import './App.css';
import './Popup.css';
import exp from "constants";
import axios from 'axios'

function Popup() {

    const [isWindowVisible, setWindowVisible] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [expVal, setExpVal] = useState(2.5)
    const [waitVal, setWaitVal] = useState(30)
    const [diningHall, setDiningHall] = useState("")


    const toggleWindow = () => {
        setWindowVisible(prev => !prev);
        setExpVal(2.5)
        setWaitVal(30)
    }

    const submitting = () => {
        if(!submit){
            setSubmit(true)
        }
    }

    if (isWindowVisible) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const sendData = () => {
        console.log("data sent; the food rating is " + expVal + " at " + diningHall + " while the wait is " + waitVal)
    }

    useEffect(() => {
        //use axios to send survey information to backend 
        //use axios to get survey information from backend 
        localStorage.setItem('dining hall', diningHall)
        localStorage.setItem('food score', JSON.stringify(expVal))
        localStorage.setItem('wait time', JSON.stringify(waitVal))
    },[submit])

    // @ts-ignore
    const handleExpSlider = (event) => {
        setExpVal(event.target.value);
    }

    // @ts-ignore
    const handleWaitSlider = (event) => {
        setWaitVal(event.target.value)
    }

    // @ts-ignore
    const handleDiningHall = (event) => {
        setDiningHall(event.target.value)
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <div>
                <button onClick={toggleWindow} className="button-modal">Click Here for Popup</button>
            </div>

            {isWindowVisible && (
            <div className="modal">
                <div onClick={toggleWindow} className="overlay">

                </div>
                <div className="content">
                    <h2 className="survey-header">Send a Review</h2>

                    <label className="survey-question">
                        Choose Dining Hall:
                        <select value = {diningHall} onChange={handleDiningHall}>
                            <option>Sharpe Refectory</option>
                            <option>Andrews Commons</option>
                            <option>Josiah's</option>
                            <option>Verney-Wooley</option>
                            <option>Ivy-Room</option>
                        </select>
                    </label>


                    <p className="survey-question">How was the experience?</p>
                    <div>
                        <input type="range" min="0" max="5" value={expVal} onChange={handleExpSlider} step={.5}/>
                        <br></br>
                        <p className="survey-question">{expVal}</p>
                    </div>
                    <p className="survey-question">What long was the wait?</p>
                    <div>
                        <input type="range" min="0" max="60" value={waitVal} onChange={handleWaitSlider} className="slider" step={1} id="waitSlider"/>
                        <br></br>
                        <p className="survey-question">{waitVal}</p>
                    </div>
                    <button onClick={sendData}>Submit</button>
                    <button onClick={toggleWindow} className="close-modal">Close</button>
                </div>
            </div>
            )}
        </div>
    );
}

export default Popup;
