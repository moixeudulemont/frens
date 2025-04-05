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
      animate={{backgroundColor: ['#93E6', '#F506', '#FF06', '#D246', '#0FF6']}}
      transition={{ repeat: Infinity, duration: 10, repeatType: 'mirror'}}
      className="w-full mx-auto py-2 px-5 flex items-center justify-between shadow-md backdrop-blur-lg"
    >
      <div className="btns">
        {isPlaying ? (
          <FaStopCircle size={30} className="animate-pulse cursor-pointer drop-shadow-md" onClick={() => playStopToggle('stop')}/>
        ) : (
          <FaPlayCircle size={30} className="animate-pulse cursor-pointer drop-shadow-md" onClick={() => playStopToggle('play')}/>
        )}
      </div>
      <div className="descrip flex items-center w-full overflow-hidden">
        <h3 className="w-full font-bold text-center text-xl tracking-widest animate-ping text-slate-200">Radio Dj NaKo</h3>
      </div>
      <audio src="https://stream.zeno.fm/gkvdqocej4rtv" ref={audioRef}></audio>
    </motion.div>
  )
}
