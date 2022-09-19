import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

const memeAPI = "https://api.imgflip.com/get_memes"

function getInput(id){
  return document.querySelector(`#${id}`).value
}

function App() {
  const [lineOne, setLineOne] = useState('')
  const [lineTwo, setLineTwo] = useState('')
  const [textColor, setTextColor] = useState('')

  const textColorStyling = {
    color: textColor,
  }


  return (
    <div className="container">
      <nav>
        <span>Meme Generator</span>
        <span>A React Project</span>
      </nav>

      <form className='row'>
        <label className='col'>Line one: </label>
        <input className='form-control col' id='lineOne' type="text" 
          onChange={
            ()=>{
              setLineOne(getInput('lineOne'))
            }
          }
        />
        <div></div>
        <label className='col'>Line two:</label>
        <input className='form-control col' id='lineTwo' type="text" 
          onChange={
            ()=>{
              setLineTwo(getInput('lineTwo'))
            }
          }
        />
        <input type="color" id='colorInput' onChange={
          ()=>{
            console.log(getInput('colorInput'))
            setTextColor(getInput('colorInput'))
          }
        }></input>
      </form>

      <div className='meme-image-container'>
        {/* <span>{lineOne}</span> */}
        <span
          style={textColorStyling}
        >{1}</span>
        <img className='meme-image' src='https://i.imgflip.com/1g8my4.jpg'></img>
        {/* <span>{lineTwo}</span> */}
        <span>{1}</span>
      </div>
    </div>
  );
}

export default App;
