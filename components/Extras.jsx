"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Extras({ extras }) {
  //HOOKS
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if(window.innerWidth < 700) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [])
  //INIT
  const extrasParsed = JSON.parse(extras);
  return (
    <>
      <h2 className="text-2xl font-bold text-center tracking-widest p-5 bg-lime-500 w-full rounded-lg shadow-md">
        Los mas visitados
      </h2>
      <section className="overflow-x-scroll md:overflow-x-hidden md:h-[550px] h-[400px] w-full md:w-[90vw] p-5 rounded-xl shadow-lg bg-orange-400">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{
            x: [mobile ? "-1000%" : "-200%", "0%"],
            transition: {
              ease: "linear",
              duration: mobile ? 25 : 50,
              repeat: Infinity,
            },
          }}
          className="flex gap-4 w-full h-full"
        >
          {[...extrasParsed, ...extrasParsed].map((elem, key) => {
            if (elem.image) {
              return (
                <article
                  key={key}
                  className="h-full rounded-xl hover:scale-[1.04] transition-all shadow-xl"
                  style={{ flex: "0 0 300px" }}
                >
                  <Link href={`/pub?id=${elem._id}`}>
                    <Image
                      className="h-full w-full rounded-xl object-cover"
                      src={elem.image}
                      width={720}
                      height={400}
                      alt={elem.title}
                    />
                  </Link>
                </article>
              );
            }
          })}
        </motion.div>
      </section>
    </>
  );
}
