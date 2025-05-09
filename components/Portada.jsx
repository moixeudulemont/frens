import { db } from "@/lib/db";
import Daily from "@/lib/models/daily";
import Pubs from "@/lib/models/pubs";
import Pub from "@/components/Pub";
import { Lobster } from "next/font/google";

//config lobster font
const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

await db();

const { dailyPub } = await Daily.findOne({});
const daily = await Pubs.findById(dailyPub);

export default function Portada() {
  return (
    <section
      style={{
        transition: "0.3s",
        background: 'linear-gradient(45deg, rgba(255, 0, 255, 0.6), rgba(255, 255, 0, 0.6))'
      }}
      className="w-full rounded-lg backdrop-blur-md shadow-lg p-3 flex flex-col justify-center items-center gap-5"
    >
      <h2
        className={`${lobster.className} font-bold text-5xl text-center rounded-md bg-gradient-to-r from-orange-200 via-blue-300 to-pink-600 bg-clip-text text-transparent inline-block`}>Portada del día</h2>
      <div className="m-h-[80dvh] overflow-y-auto">
        <Pub data={JSON.stringify(daily)} type="portada"/>
      </div>
    </section>
  );
}
