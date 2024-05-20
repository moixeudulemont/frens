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
        transition: "0.3s"
      }}
      className="ring-2 ring-white max-h-[85dvh] overflow-y-auto h-[85dvh] w-full sticky z-[60] top-[90px] rounded-tl-lg rounded-bl-lg backdrop-blur-md shadow-md p-3 flex flex-col justify-center items-center gap-5"
    >
      <h2 className="font-bold text-xl text-center">Portada del día</h2>
      <div className="m-h-[80dvh] overflow-y-auto">
        <Pub data={JSON.stringify(daily)} type="portada"/>
      </div>
    </section>
  );
}
