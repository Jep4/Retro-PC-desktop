import React, { useEffect, useState } from 'react';
import sound from "../resources/bg_music.mp3"
import "./MainWindow.css"

function MusicWindow() {
    var [isPlaying, setPlaying] = useState(false);
    const playStatus = isPlaying ? "||" : "⩥";
    var audioRef =React.useRef(new Audio(sound));

    
  useEffect(() => {
    const audio = audioRef.current;
    isPlaying ? audio.play() : audio.pause()
    
  },
  [isPlaying]
)

    const musicPlay = () => {
        setPlaying(!isPlaying);
    }

    return (
        <div className='mussic-wrapper'>
            <div className="wave"></div>
            <div className='music-bar'></div>
            <div className='music-btn-wrapper'>
                <button className='music-back-btn btn'> ⩤⩤</button>
                <button className='music-play-btn btn' onClick={musicPlay}>{playStatus}</button>
                <button className='music-next-btn btn'>⩥⩥</button>
            </div>

        </div>
    );
}

export default MusicWindow;