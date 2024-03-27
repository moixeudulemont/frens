import Image from "next/image";

export default function Pub({ data }) {
  return (
    <article className="flex justify-center items-center flex-col">
      <Image alt="imagen linda" src={data.image} width={500} height={500} className="w-full h-auto" />
      <p className="p-3 text-lg bg-slate-700 w-full">{data.description}</p>
    </article>
  );
}
