import Link from "next/link";
import { db } from "@/lib/db";
import Pubs from "@/lib/models/pubs";
import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import CommentsForm from "@/components/ComentsForm";
import Clipboard from "@/components/Clipboard";
import YtPlayer from "@/components/YtPlayer";


moment.locale("es");

async function getPub(id) {
  await db();
  let pub = null;
  try {
    pub = await Pubs.findById(id);
    return pub;
  } catch (error) {
    return "EMPTY";
  }
}

function Empty() {
  return (
    <main className="w-full h-[calc(100dvh-64px-1rem)] flex flex-col gap-5 justify-center items-center">
      <h1 className="text-4xl font-bold">No se ha encontrado</h1>
      <Link
        className="py-2 px-4 font-bold bg-orange-500 text-white rounded w-[200px] text-center animate-pulse"
        href="/home"
      >
        Volver
      </Link>
    </main>
  );
}

export default async function pub({ searchParams }) {
  const id = searchParams.id;
  if (!/^\w*$/.test(id)) return <Empty />;
  //INIT
  const pub = await getPub(id);
  if (pub === "EMPTY") return <Empty />;
  return (
    <main className="pb-5 md:pb-0 md:w-8/12 md:mx-auto w-full flex flex-col md:flex-row justify-center items-stretch gap-5 h-[calc(100dvh - 100px)]">
      {/* CONTENT SECTION */}
      <section className="w-full" style={{ flex: 1.5, height: "100%" }}>
        <article className="md:min-h-[85dvh] shadow-lg w-full h-full p-4 backdrop-blur-lg rounded-lg bg-[rgba(255,255,255,0.1)] flex flex-col">
          {/* HEADER OF CARD */}
          <div className="flex justify-between items-center pb-2 mb-2">
            <div className="flex gap-3 items-center">
              <Image
                src={pub.avatar}
                alt="author avatar"
                width={40}
                height={40}
                className="rounded-full shadow"
              />
              <div>
                <h2 className="text-lg font-bold">{pub.author}</h2>
                <p>{moment(pub.date).fromNow()}</p>
              </div>
            </div>
            {/* ACTIONS */}
            <ul>
              <li>
                <Clipboard pubId={pub._id.toString()}/>
              </li>
            </ul>
          </div>
          {/* BODY OF CARD */}
          <div className="flex-grow flex flex-col gap-2">
            <h1 className="p-4 text-center bg-orange-400 text-xl font-bold rounded border-l-8 border-cyan-400 border-solid">
              {pub.title}
            </h1>
            <div className="flex justify-center items-center flex-grow">
              {pub.audio && (
                <audio
                  className="w-9/12 m-auto my-5"
                  src={pub.audio}
                  controls
                ></audio>
              )}
              {pub.yt && (
                <div className="w-full">
                  <YtPlayer link={pub.yt} />
                </div>
              )}
              {pub.image && (
                <div className="w-full h-full">
                  <Image
                    src={pub.image}
                    width={700}
                    height={700}
                    alt="Image of pub"
                    className="w-full h-full rounded-lg shadow-md mt-1"
                  />
                </div>
              )}
            </div>
          </div>
          {pub.description && (
            <p className="mt-3 w-full p-4 rounded-lg bg-pink-400">
              {pub.description}
            </p>
          )}
        </article>
      </section>
      {/* SOCIAL SECTION */}
      <section className="w-full" style={{ flex: 1 }}>
        <article className="shadow-lg w-full h-full p-4 backdrop-blur-lg rounded-lg bg-[rgba(255,255,255,0.1)] flex-shrink flex flex-col items-center justify-between">
          <h1 className="pb-4 md:pb-2 mb-2 text-2xl font-bold text-center border-b-4 border-cyan-500 border-solid">
            Comentarios
          </h1>
          {/* COMENTARY BOX */}
          <div className="overflow-x-hidden overflow-y-auto md:max-h-[67dvh] w-full">
            {pub.comments.length == 0 ? (
              <p className="w-full text-center font-bold text-xl">
                No hay comentarios
              </p>
            ) : (
              pub.comments.reverse().map((elem, key) => (
                <article
                  style={{
                    background:
                      "linear-gradient(-45deg, transparent 70% ,#f0f7 )",
                  }}
                  key={key}
                  className="my-4 py-2 px-4 rounded-lg shadow-md"
                >
                  {/* HEADER */}
                  <div className="mb-2 flex items-center gap-3">
                    <Image
                      src={elem.avatar}
                      width={35}
                      height={35}
                      alt="author avatar"
                      className="rounded-full shadow m-h-[90dvh]"
                    />
                    <div>
                      <h2 className="text-md font-bold">{elem.author}</h2>
                      <p className="text-sm">{moment(elem.date).fromNow()}</p>
                    </div>
                  </div>
                  {/* BODY */}
                  <div>
                    <p className="break-words border-l-8 border-solid border-cyan-300 py-2 px-4 rounded-lg">
                      {elem.msg}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
          <div className="px-2 w-full">
            <CommentsForm pubId={pub._id.toString()} />
          </div>
        </article>
      </section>
    </main>
  );
}
