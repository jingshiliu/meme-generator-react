import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

const memeAPI = "https://api.imgflip.com/get_memes"
const axios = require('axios')

function Inputs({ setLineOne, setLineTwo, setTextColor }) {

    function getInput(id) {
        return document.querySelector(`#${id}`).value
    }

    return (
        <form className='row'>
            <label className='col'>Line one: </label>
            <input className='form-control col' id='lineOne' type="text"
                onChange={
                    () => {
                        setLineOne(getInput('lineOne'))
                    }
                }
            />
            <div></div>
            <label className='col'>Line two:</label>
            <input className='form-control col' id='lineTwo' type="text"
                onChange={
                    () => {
                        setLineTwo(getInput('lineTwo'))
                    }
                }
            />
            <input type="color" id='colorInput' onChange={
                () => {
                    setTextColor(getInput('colorInput'))
                }
            }></input>
        </form>
    )
}


function Meme(props) {
    console.log(props)
    const {textColor, memeImage, lineOne, lineTwo} = props
    return (
        <div className='meme-image-container'>
            {/* <span>{lineOne}</span> */}
            <span
                style={{color: textColor}}
            >{lineOne}</span>
            <img className='meme-image' src={memeImage}></img>
            {/* <span>{lineTwo}</span> */}
            <span style={{color: textColor}}>{lineTwo}</span>
        </div>
    )
}

function App() {
    const [lineOne, setLineOne] = useState('')
    const [lineTwo, setLineTwo] = useState('')
    const [memeImage, setMemeImage] = useState('https://i.imgflip.com/1g8my4.jpg')
    const [textColor, setTextColor] = useState('')
    const [memesArray, setMemesArray] = useState([])

    const textColorStyling = {
        color: textColor,
    }

    const inputComponentProps = {
        setLineOne, setLineTwo, setTextColor
    }

    const memeProps = {
        memeImage, textColor, lineOne, lineTwo
    }

    useEffect(() => {
        requestMemes()
    }, [])




    async function requestMemes() {
        const res = await axios.get(memeAPI)
        const data = res.data.data.memes
        setMemesArray(data)
    }

    function getRandomMemeUrl() {
        return memesArray[Math.floor(Math.random() * 100)].url
    }

    return (
        <div className="container">
            <nav>
                <span>Meme Generator</span>
                <span>A React Project</span>
            </nav>

            <Inputs {...inputComponentProps} />

            <button className='btn btn-primary'
                onClick={()=>{
                    setMemeImage(getRandomMemeUrl())
                }}
            >Next meme</button>

            <Meme {...memeProps} />
        </div>
    );
}

export default App;
