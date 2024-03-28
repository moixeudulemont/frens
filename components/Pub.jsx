import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import {
  FaEllipsis,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaRegStar,
  FaRegComment,
} from "react-icons/fa6";

moment.locale("es");

export default function Pub({ data }) {
  return (
    <article className="flex justify-center flex-col w-full bg-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg rounded-lg">
      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex gap-3">
          <Image
            src={data.avatar}
            width={50}
            height={50}
            className="rounded-full opacity-50"
            sizes="(max-width: 768px) 25px, 25px"
            alt="avatar user"
          />
          <div className="flex flex-col">
            <p className="text-xl font-bold drop-shadow">{data.author}</p>
            <p className="">{moment(data.date).fromNow()}</p>
          </div>
        </div>
        <FaEllipsis color="white" size={30} className="cursor-pointer hover:animate-pulse" />
      </div>
      <Image
        alt="imagen linda"
        src={data.image}
        width={500}
        height={500}
        className="w-full h-auto"
      />

      <div className="flex items-center justify-around py-3">
        <div className="flex gap-3">
          <FaRegThumbsUp color="white" size={25} className="cursor-pointer hover:animate-pulse" />
          <p className="font-bold">0</p>
        </div>
        <div className="flex gap-3">
          <FaRegThumbsDown color="white" size={25} className="cursor-pointer hover:animate-pulse" />
          <p className="font-bold">0</p>
        </div>
        <div className="flex gap-3">
          <FaRegStar color="white" size={25} className="cursor-pointer hover:animate-pulse" />
          <p className="font-bold">0</p>
        </div>
        <div className="flex gap-3">
          <FaRegComment color="white" size={25} className="cursor-pointer hover:animate-pulse" />
          <p className="font-bold">0</p>
        </div>
      </div>
    </article>
  );
}
