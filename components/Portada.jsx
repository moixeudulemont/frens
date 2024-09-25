import { db } from "@/lib/db";
import Daily from "@/lib/models/daily";
import Pubs from "@/lib/models/pubs";
import Pub from "@/components/Pub";

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
      className="max-h-[85dvh] overflow-y-auto h-[85dvh] w-full sticky z-[60] top-[90px] rounded-tl-lg rounded-bl-lg backdrop-blur-md shadow-lg p-3 flex flex-col justify-center items-center gap-5"
    >
      <h2
        className="font-bold text-xl text-center rounded-md">Portada del día</h2>
      <div className="m-h-[80dvh] overflow-y-auto">
        <Pub data={JSON.stringify(daily)} type="portada"/>
      </div>
    </section>
  );
}
