import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

const memeAPI = "https://api.imgflip.com/get_memes"

function App() {
  return (
    <div className="container">
      <nav>
        <span>Meme Generator</span>
        <span>A React Project</span>
      </nav>

      <form className='row'>
        <label className='col'>Line one: </label>
        <input className='form-control col' id='' type="text"/>
        <div></div>
        <label className='col'>Line two:</label>
        <input className='form-control col' id='' type="text"/>
      </form>

      <img className='meme-image' src='https://i.imgflip.com/1g8my4.jpg'></img>
    </div>
  );
}

export default App;
