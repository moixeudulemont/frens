"use client";
import { useState } from "react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa6";

export default function YtPlayer({ link }) {
  const [state, setState] = useState(false);

  return (
    <>
      {state ? (
        <iframe
          className="w-full h-[500px]"
          src={`https://youtube.com/embed/${link}?autoplay=1&mute=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      ) : (
        <div className="relative flex justify-center items-center">
          <Image
            src={`https://i3.ytimg.com/vi/${link}/hqdefault.jpg`}
            width={200}
            height={200}
            className="w-full h-auto"
            alt="youtube player"
          />
          <FaYoutube 
            onClick={() => setState(true)}
          className="absolute cursor-pointer" color={'white'} size={90}/>
        </div>
      )}
    </>
  );
}
