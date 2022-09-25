import React, { useState, useEffect } from 'react'
import './App.css'

const memeAPI = "https://api.imgflip.com/get_memes"
const axios = require('axios')

function MemePopUpCard({ memeObject, setMemeImage, closePopUp }) {
    const onClick = () => {
        setMemeImage(memeObject.url)
        closePopUp()
    }
    return (
        <div className="col col-6  col-lg-3 col-md-4 meme-popup-card" onClick={onClick}>
            <img src={memeObject.url}></img>
            <br></br>
            <span>{memeObject.name}</span>
        </div>
    )
}

function MemePopUp({ memesArray, setMemeImage, setShowMemePopUp }) {
    const closePopUp = () => {
        setShowMemePopUp(false)
    }
    return (
        <div className='row meme-popup'>
            <button className='meme-popup-close-button' onClick={closePopUp}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
            </button>
            {memesArray.map(meme => <MemePopUpCard closePopUp={closePopUp} memeObject={meme} setMemeImage={setMemeImage} />)}
        </div>
    )
}

function Inputs({ setLineOne, setLineTwo, setTextColor}) {
    function getInput(id) {
        return document.querySelector(`#${id}`).value
    }

    return (
        <div className='Input'>
            <form className='row my-3'>
            <label className='col-6'>Line one:
                <input className='form-control' id='lineOne' type="text"
                    onChange={
                        () => {
                            setLineOne(getInput('lineOne'))
                        }
                    }
                />
            </label>
            <label className='col-6'>Line two:
                <input className='form-control' id='lineTwo' type="text"
                    onChange={
                        () => {
                            setLineTwo(getInput('lineTwo'))
                        }
                    }
                />
            </label>
        </form>
        <label className='color-input'>
                Color:
                <input type="color" id='colorInput' onChange={
                    () => {
                        setTextColor(getInput('colorInput'))
                    }
                }></input>
            </label>
        </div>
    )
}


function Meme(props) {
    console.log(props)
    const { textColor, memeImage, lineOne, lineTwo } = props
    return (
        <div className='meme-image-container'>
            {/* <span>{lineOne}</span> */}
            <span
                style={{ color: textColor }}
            >{lineOne}</span>
            <img className='meme-image' src={memeImage}></img>
            {/* <span>{lineTwo}</span> */}
            <span style={{ color: textColor }}>{lineTwo}</span>
        </div>
    )
}

function NavBar() {
    return (
        <nav>
            <span>Meme Generator</span>
            <span>A React Project</span>
        </nav>
    )
}

function Buttons({setShowMemePopUp, setMemeImage, getRandomMemeUrl}) {
    return (
        <div className='Buttons'>
            <button className='btn btn-primary'
                onClick={() => {
                    setMemeImage(getRandomMemeUrl())
                }}
            >Next meme</button>

            <button className='btn btn-success'
                onClick={() => {
                    setShowMemePopUp(true)
                }}
            >Choose a Meme</button>
        </div>
    )
}

function App() {
    const [lineOne, setLineOne] = useState('')
    const [lineTwo, setLineTwo] = useState('')
    const [memeImage, setMemeImage] = useState('https://i.imgflip.com/1g8my4.jpg')
    const [textColor, setTextColor] = useState('')
    const [memesArray, setMemesArray] = useState([])
    const [showMemePopUp, setShowMemePopUp] = useState(false)

    const inputComponentProps = {
        setLineOne, setLineTwo, setTextColor, setMemeImage, setShowMemePopUp, getRandomMemeUrl
    }
    const memeProps = {
        memeImage, textColor, lineOne, lineTwo
    }

    useEffect(() => {
        requestMemes()
    }, [])


    let memePopUpDisplayer;
    if (showMemePopUp) {
        memePopUpDisplayer = <MemePopUp memesArray={memesArray} setMemeImage={setMemeImage} setShowMemePopUp={setShowMemePopUp} />
    }



    async function requestMemes() {
        const res = await axios.get(memeAPI)
        const data = res.data.data.memes
        setMemesArray(data)
    }

    function getRandomMemeUrl() {
        return memesArray[Math.floor(Math.random() * 100)].url
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <Inputs {...inputComponentProps} />
                <Buttons setShowMemePopUp={setShowMemePopUp} getRandomMemeUrl={getRandomMemeUrl} setMemeImage={setMemeImage} />
                <Meme {...memeProps} />
            </div>

            {memePopUpDisplayer}
        </div>
    );
}

export default App;
