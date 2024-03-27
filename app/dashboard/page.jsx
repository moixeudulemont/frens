import { FaCirclePlus, FaBookOpen, FaComment, FaThumbsUp } from "react-icons/fa6";
import Link from 'next/link';

export const metadata = {
  title: "frens - dashboard",
};

export default function dashboard() {
  return (
    <main className="md:px-10 px-5 py-5 h-[calc(100dvh-64px-1.25rem)]">
      <div className="grid grid-cols-2 gap-4 h-full">
        <Link href="/publicate" className="addPub w-full bg-violet-600 rounded flex justify-center items-center cursor-pointer hover:bg-violet-700">
          <FaCirclePlus size={70} color={"white"} />
        </Link>
        <div className="flex flex-col justify-center items-center bg-cyan-500 backdrop-blur-2 gap-4">
          <FaBookOpen size={70} color={"white"} />
          <h2 className="font-bold text-2xl">publicaciones</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-orange-500 backdrop-blur-2 gap-4">
          <FaThumbsUp size={70} color={"white"} />
          <h2 className="font-bold text-2xl">Me gusta</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-pink-500 backdrop-blur-2 gap-4">
          <FaComment size={70} color={"white"} />
          <h2 className="font-bold text-2xl">Comentarios</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </main>
  );
}
