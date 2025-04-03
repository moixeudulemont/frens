'use client';

import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Radio() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  //HANDLERS
  function playStopToggle(state) {
    if(state == 'play') {
      audioRef.current.play();
      setIsPlaying(true);
    }
    if(state == 'stop') {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  return (
    <motion.div
      initial={{backgroundColor: '#223'}}
      animate={{backgroundColor: ['#8A2BE2', '#FF4500', '#FF1493', '#DC143C']}}
      transition={{ repeat: Infinity, duration: 10, repeatType: 'mirror'}}
      className="w-full mx-auto py-2 px-5 flex items-center justify-between shadow-md"
    >
      <div className="btns">
        {isPlaying ? (
          <FaStopCircle size={30} className="animate-pulse cursor-pointer drop-shadow-md" onClick={() => playStopToggle('stop')}/>
        ) : (
          <FaPlayCircle size={30} className="animate-pulse cursor-pointer drop-shadow-md" onClick={() => playStopToggle('play')}/>
        )}
      </div>
      <div className="descrip flex items-center w-full overflow-hidden">
        <motion.h3
          initial={{translateX: '-100vw'}}
          animate={{translateX: '100vw'}}
          transition={{repeat: Infinity, duration: 30 ,repeatType: 'mirror'}}
          className="text-lg font-bold drop-shadow-md animate-ping">Radio Dj NaKo
        </motion.h3>
      </div>
      <audio src="https://stream.zeno.fm/gkvdqocej4rtv" ref={audioRef}></audio>
    </motion.div>
  )
}
