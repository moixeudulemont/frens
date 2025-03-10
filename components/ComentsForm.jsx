"use client";
import { FaPaperPlane, FaSpinner, FaImage } from "react-icons/fa6";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ComentsForm({pubId}) {
  //HOOKS
  const { status } = useSession();
  const router = useRouter();
  const [commentTxt, setCommentTxt] = useState("");
  const [loaderComment, setLoaderComment] = useState(false);

  async function upComment(e, type) {
    e.preventDefault();
    if ((status == 'unauthenticated')) return;
    setLoaderComment(true);
    const form = new FormData();
    form.append("id", pubId);
    switch(type) {
      case 'TEXT':
        if(!commentTxt) return;
        form.append("comment", commentTxt.trim());
        break;
      case 'IMG':
        const file = e.target.files[0];
        if(!file || file.length == 0) return;
        if(!/^image/.test(file.type)) {
          alert('Suba una imágen porfavor');
          return;
        }
        if(file.size > 4000000) {
          alert('El archivo es muy grande, max 4MB');
          return;
        }
        form.append('file', file);
        break;
      default: return;
    }
    const res = await fetch("/api/upComment", {
      method: "POST",
      body: form,
    });
    setCommentTxt("");
    if (!res.ok) throw "error";
    const response = await res.json();
    setLoaderComment(false);
    if (response.msg == "OK") router.refresh();
  }

  return (
    <form onSubmit={e => upComment(e, 'TEXT')} className="w-full flex gap-4 items-center pt-2">
      <div className="commentBX w-full flex justify-between relative items-center">
        <input
          type="text"
          placeholder="Escribe un comentario"
          maxLength="250"
          minLength="1"
          required
          className="w-full py-2 px-4 rounded-lg focus:outline-none text-slate-950"
          value={commentTxt}
          onChange={(e) => setCommentTxt(e.target.value)}
          disabled={status == 'unauthenticated' ? true : false}
        />
        <input type="file" id={pubId} hidden accept="image/*" onChange={e => upComment(e, 'IMG')}/>
        <label htmlFor={pubId} className="absolute right-3">
          <FaImage className="text-slate-700 cursor-pointer"/>
        </label>
      </div>
      {loaderComment ? (
        <FaSpinner className="animate-spin" color="white" size={20} />
      ) : (
        <button className={`${status == 'unauthenticated' && 'pointer-events-none'}`}>
          <FaPaperPlane
            color="white"
            size={20}
            className='cursor-pointer hover:animate-pulse'
          />
        </button>
      )}
    </form>
  );
}
