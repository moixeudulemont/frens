import { db } from "@/lib/db";
import Daily from "@/lib/models/daily";
import Pubs from "@/lib/models/pubs";
import Pub from "@/components/Pub";
import { Lobster } from "next/font/google";

await db();

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

const { dailyPub } = await Daily.findOne({});
const daily = await Pubs.findById(dailyPub);

export default function Portada() {
  
  return (
    <section
      style={{
        transition: "0.3s",
        background: '#f007'
      }}
      className="max-h-[85dvh] overflow-y-auto lg:h-[85dvh] h-auto w-full sticky z-[60] top-[135px] rounded-tl-lg rounded-bl-lg backdrop-blur-md shadow-lg p-3 flex flex-col justify-center items-center gap-5"
    >
      <h1
        className={`font-bold text-5xl text-center rounded-md ${lobster.className} drop-shadow-md bg-gradient-to-r from-yellow-200 via-purple-300 to-pink-300 text-transparent bg-clip-text`}>Portada del día</h1>
      <div className="m-h-[80dvh] overflow-y-auto">
        <Pub data={JSON.stringify(daily)} type="portada"/>
      </div>
    </section>
  );
}
