"use client";
import Image from "next/image";
import Link from "next/link";

export default function Extras({ extras }) {
  const extrasParsed = JSON.parse(extras);
  return (
    <>
      <h2 className="text-2xl font-bold text-center tracking-widest">Los mas visitados</h2>
      <section className="flex gap-4 overflow-x-auto md:h-[500px] h-[300px] w-full p-5 rounded-xl shadow-lg" style={{background: "linear-gradient(45deg, #f0f4, #0ff4)"}}>
        {extrasParsed?.map((elem, key) => {
          if (elem.image) {
            return (
              <article
                key={key}
                className="h-full rounded-xl hover:scale-[1.04] transition-all"
                style={{ flex: "0 0 300px", border: "2px solid white" }}
              >
                <Link href={`/pub?id=${elem._id}`}>
                  <Image
                    className="h-full w-full rounded-xl"
                    src={elem.image}
                    width={200}
                    height={400}
                    alt={elem.title}
                  />
                </Link>
              </article>
            );
          }
        })}
      </section>
    </>
  );
}
