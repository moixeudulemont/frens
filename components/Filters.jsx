import { db } from "@/lib/db";
import Users from "@/lib/models/users.js";

await db();
const users = await Users.find({});

export default function Filters() {
  return (
    <section
      style={{ background: "linear-gradient(45deg, #f0f9, #ff09)" }}
      className="h-[85dvh] w-full rounded-tr-lg rounded-br-lg sticky top-[90px] backdrop-blur-md shadow-md flex flex-col items-center gap-5 p-3"
    >
      <h1 className="font-bold text-xl">Páginas</h1>
      <article className="w-full">
        <fieldset className="w-full flex flex-col gap-5 justify-center items-center">
          <div className="flex flex-col gap-5 items-center overflow-auto h-[72dvh] w-full px-2">
            {users.map((item, key) => (
              <div
                style={{background: "linear-gradient(-45deg, #f0f9, #ff09)", transition: '0.4s'}}
                key={key}
                className="flex items-center justify-between p-5 rounded-lg bg-slate-300 shadow-md w-full cursor-pointer hover:scale-105"
              >
                <img src={item.image} alt={item.name} className="rounded-full w-[50px] h-[50px]"/>
                <p className="font-bold text-md text-end">{item.name}</p>
              </div>
            ))}
          </div>
        </fieldset>
      </article>
    </section>
  );
}
