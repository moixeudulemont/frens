"use client";

import { FaImage, FaSpinner } from "react-icons/fa6";
import { useState } from "react";

export default function Publicate() {
  function previewImg(e) {
    const img = e.target.files[0];
    if (!img) return;
    setFile(img);
    const reader = new FileReader();
    reader.onload = (e) => setImgSrc(e.target.result);
    reader.readAsDataURL(img);
  }

  //SUBMIT FORM
  async function sendForm(e) {
    e.preventDefault();
    if (!file) {
      alert("Suba una imagen");
      return;
    }
    if (!title || !description) {
      alert("Rellene todos los campos");
      return;
    }
    setLoader(true);
    const form = new FormData();
    form.append("title", title.trim());
    form.append("description", description.trim());
    form.append("file", file);
    const res = await fetch("/api/publicate", {
      method: "POST",
      body: form,
    });
    const response = await res.json();
    if (response.msg == "OK") location.href = "/home";
  }

  const [imgSrc, setImgSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);

  return (
    <main className="md:px-10 px-5 py-5 h-[calc(100dvh-64px-1.25rem)]">
      <section className="h-full flex justify-center items-center flex-col gap-5">
        <h1 className="text-3xl font-bold">Publicar</h1>
        <form
          onSubmit={sendForm}
          className="p-5 bg-[rgba(0,0,0,.1)] backdrop-blur-lg flex flex-col justify-center items-center gap-5 md:w-6/12 w-full rounded-lg shadow-lg"
        >
          <hr />
          <input
            type="file"
            id="upImg"
            className="hidden"
            onChange={(e) => previewImg(e)}
          />
          <label
            className="cursor-pointer flex flex-col justify-center items-center"
            htmlFor="upImg"
          >
            {imgSrc ? (
              <img
                src={imgSrc}
                className="max-w-[200px]"
                alt="preview selected image"
              />
            ) : (
              <FaImage color={"white"} size={100} className="animate-pulse" />
            )}
            <p className="mt-2 font-bold">Elegir imágen</p>
          </label>
          <input
            required
            maxLength="25"
            minLength="1"
            className="bg-[rgba(255,255,255,0.6)] rounded-lg shadow w-full px-4 py-2 text-slate-950 focus:outline-none"
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            required
            maxLength="200"
            minLength="1"
            className="bg-[rgba(255,255,255,0.6)] rounded-lg shadow w-full px-4 py-2 text-slate-950 resize-none focus:outline-none"
            rows="2"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="shadow rounded-lg px-4 py-2 font-bold w-full flex justify-center bg-amber-500">
            {loader ? (
              <FaSpinner className="animate-spin" color={"white"} size={35} />
            ) : (
              <span className="text-xl font-bold">Publicar</span>
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
