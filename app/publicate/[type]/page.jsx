"use client";

import { FaImage, FaSpinner, FaHeadphones, FaYoutube } from "react-icons/fa6";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Publicate() {
  function previewImg(e) {
    if (type !== "image") return;
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
    const form = new FormData();
    if (!title) {
      alert("Escriba un titulo porfavor");
      return;
    }
    form.append("title", title.trim());

    //SWITCH TYPE
    switch (type) {
      //IMAGE
      case "image":
        if (!file) {
          alert("Suba una imagen");
          return;
        }
        form.append("description", description.trim() || "");
        form.append("file", file);
        break;
      //VIDEO
      case "video":
        if (!yt) {
          alert("Pegue un link de youtube porfavor");
          return;
        }
        form.append("yt", yt.trim());
        break;
      //AUDIO
      case "audio":
        if (!audio) {
          alert("Seleccione un archivo de audio porfavor");
          return;
        }
        form.append("audio", audio);
        form.append('description', description.trim() || '');
        break;
      //TEXTO
      case "text":
        if (!description) {
          alert("Escriba una descripcion porfavor");
          return;
        }
        form.append('description', description.trim());
        break;
    }

    setLoader(true);
    //SEND FORM
    const res = await fetch(`/api/publicate?type=${type}`, {
      method: "POST",
      body: form,
    });
    const response = await res.json();
    if (response.msg == "OK") location.href = "/home";
  }

  const { type } = useParams();

  const [imgSrc, setImgSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [yt, setYt] = useState("");
  const [audio, setAudio] = useState(null);
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
          {type === "image" && (
            <>
              <input
                type="file"
                id="upImg"
                className="hidden"
                onChange={(e) => previewImg(e)}
                accept="image/*"
              />
              <label
                className="cursor-pointer flex flex-col justify-center items-center"
                htmlFor="upImg"
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    className="max-w-[200px] rounded-lg"
                    alt="preview selected image"
                  />
                ) : (
                  <FaImage
                    color={"white"}
                    size={100}
                    className="animate-pulse"
                  />
                )}
                <p className="mt-2 font-bold">Elegir imágen</p>
              </label>
            </>
          )}
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
          {type === "video" && (
            <>
              <input
                className="bg-[rgba(255,255,255,0.6)] rounded-lg shadow w-full px-4 py-2 text-slate-950 focus:outline-none"
                type="url"
                required
                minLength="1"
                maxLength="250"
                placeholder="https://youtu.be/....."
                value={yt}
                onChange={(e) => setYt(e.target.value)}
              />
              <FaYoutube color={"white"} size={100} className="animate-pulse" />
            </>
          )}
          {type !== "video" && (
            <textarea
              required={type == 'text' ? true : false}
              maxLength="200"
              minLength="1"
              className="bg-[rgba(255,255,255,0.6)] rounded-lg shadow w-full px-4 py-2 text-slate-950 resize-none focus:outline-none"
              rows="2"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          )}
          {type === "audio" && (
            <>
              <input
                type="file"
                id="upAudio"
                className="hidden"
                accept="audio/*"
                onChange={(e) => setAudio(e.target.files[0])}
              />
              <label
                className="cursor-pointer flex flex-col justify-center items-center"
                htmlFor="upAudio"
              >
                <FaHeadphones
                  color={"white"}
                  size={100}
                  className="animate-pulse"
                />
                <p className="mt-2 font-bold">Elegir Audio (.mp3 .wav .ogg)</p>
              </label>
            </>
          )}
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
