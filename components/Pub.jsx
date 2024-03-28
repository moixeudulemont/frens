"use client";

import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import {
  FaEllipsis,
  FaRegThumbsUp,
  FaRegStar,
  FaRegComment,
  FaPaperPlane,
  FaSpinner
} from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/navigation';

moment.locale("es");


export default function Pub({ data }) {
  data = JSON.parse(data);
  console.log(data)
  const { status } = useSession();
  const router = useRouter();
  const [comment, setComment] = useState(false);
  const [commentTxt, setCommentTxt] = useState('');
  const [loader, setLoader] = useState(false);

  async function upComment(e) {
    e.preventDefault();
    if(!status || !commentTxt) return;
    setLoader(true);
    const form = new FormData()
    form.append('comment', commentTxt.trim());
    form.append('id', data._id);
    const res = await fetch('/api/upComment', {
      method: 'POST',
      body: form
    });
    setCommentTxt('');
    if(!res.ok) throw('error');
    const response = await res.json();
    setLoader(false);
    if(response.msg == 'OK') router.refresh();
  }

  return (
    <article className="flex justify-center flex-col w-full bg-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg rounded-lg">
      <div className="flex items-center justify-between py-2 pl-2 pr-4">
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
            onClick={() => {
              setComment(!comment);
            }}
            color="white"
            size={20}
            className="cursor-pointer hover:animate-pulse"
          />
          <p className="font-bold">{data?.comments.length}</p>
        </div>
      </div>
      {comment && (
        <>
          <div className="px-6">
            {data?.comments.length == 0 ? (
              <h4 className="font-bold text-xl text-center py-2">No hay comentarios</h4>
            ) : (
              data.comments.map((elem, key) => (
                <div key={key} className="py-2 my-2 flex flex-col gap-3">
                  <div className="flex gap-4 items-center">
                    <Image 
                      src={elem.avatar}
                      width={35}
                      height={35}
                      alt="avatar author"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-md font-bold">{elem.author}</p>
                      <p className="text-sm">{moment(elem.date).fromNow()}</p>
                    </div>
                  </div>
                  <p className="font-bold p-3 rounded-lg bg-[rgba(255,255,255,0.35)] break-all">{elem.msg}</p>
                </div>
              ))
            )}
          </div>
          <form
            onSubmit={upComment} 
            className="pb-4 px-6 flex items-center justify-center gap-5">
            <input
              className="px-4 py-2 w-full rounded-lg focus:outline-none text-slate-950"
              type="text"
              placeholder="Escribi un comentario..."
              maxLength="200"
              minLength="1"
              required={true}
              value={commentTxt}
              onChange={e => setCommentTxt(e.target.value)}
              disabled={status ? false : true}
            />
            {
              loader ? (
                <FaSpinner
                  color="white"
                  size={20}
                  className="animate-spin"
                />
              ) : (
                <button>
              <FaPaperPlane
                color="white"
                size={20}
                className="cursor-pointer hover:animate-pulse"
              />
            </button>
              )
            }
          </form>
        </>
      )}
    </article>
  );
}
