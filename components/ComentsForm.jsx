"use client";
import { FaPaperPlane, FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

{
  /* PRINCIPAL COMPONENT FUNCTION */
}
export default function ComentsForm({pubId}) {
  //HOOKS
  const { status } = useSession();
  const router = useRouter();
  const [commentTxt, setCommentTxt] = useState("");
  const [loaderComment, setLoaderComment] = useState(false);

  async function upComment(e) {
    e.preventDefault();
    if ((status == 'unauthenticated') || !commentTxt) return;
    setLoaderComment(true);
    const form = new FormData();
    form.append("comment", commentTxt.trim());
    form.append("id", pubId);
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
    <form onSubmit={upComment} className="w-full flex gap-4 items-center pt-2">
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
