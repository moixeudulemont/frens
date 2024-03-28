"use client";

import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import {
  FaEllipsis,
  FaRegThumbsUp,
  FaRegStar,
  FaRegComment,
  FaPaperPlane
} from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useState } from 'react';

moment.locale("es");

export default function Pub({ data }) {
  const { status } = useSession();
  const [comment, setComment] = useState(false);
  return (
    <article className="flex justify-center flex-col w-full bg-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg rounded-lg">
      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex gap-3 items-center">
          <div className="md:w-[50px] md:h-[50px] w-[35px] h-[35px]">
            <Image
              src={data.avatar}
              width={50}
              height={50}
              className="rounded-full opacity-50"
              alt="avatar user"
            />
          </div>
          <div className="flex flex-col">
            <p className="md:text-xl text-md font-bold drop-shadow">
              {data.author}
            </p>
            <p className="text-sm md:text-md">{moment(data.date).fromNow()}</p>
          </div>
        </div>
        <FaEllipsis
          color="white"
          size={25}
          className="cursor-pointer hover:animate-pulse"
        />
      </div>
      <Image
        alt="imagen linda"
        src={data.image}
        width={500}
        height={500}
        className="w-full h-auto"
      />

      <div className="flex items-center justify-around py-3">
        <div className="flex gap-3">
          <FaRegThumbsUp
            color="white"
            size={20}
            className="cursor-pointer hover:animate-pulse"
          />
          <p className="font-bold">0</p>
        </div>
        <div className="flex gap-3">
          <FaRegStar
            color="white"
            size={20}
            className="cursor-pointer hover:animate-pulse"
          />
          <p className="font-bold">0</p>
        </div>
        <div className="flex gap-3">
          <FaRegComment
            onClick={() => setComment(!comment)}
            color="white"
            size={20}
            className="cursor-pointer hover:animate-pulse"
          />
          <p className="font-bold">0</p>
        </div>
      </div>
      {
        comment && (
          <form className="pb-4 px-6 flex items-center justify-center gap-5">
        <input 
          className="px-4 py-2 w-full rounded-lg"
          type="text" placeholder="Escribi un comentario..."
          maxLength="200"
          minLength="1"
        />
        <FaPaperPlane
          color="white"
          size={20}
          className="cursor-pointer hover:animate-pulse"
        />
      </form>
        )
      }
    </article>
  );
}
