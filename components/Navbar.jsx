"use client";

import { Lobster } from "next/font/google";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPowerOff, FaAddressCard, FaHouse } from "react-icons/fa6";
import Searcher from "@/components/Searcher";
import { motion } from 'framer-motion';

//VARIANTS FOR DROPDOWN
const variants = {
  hidden: {scale: 0},
  visible: {scale: 1},
  transition: {duration: 1}
}

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  const { data: session, status } = useSession();
  const [dropdown, setDropdown] = useState(false);
  const params = usePathname();
  const router = useRouter();
  useEffect(() => {
    const bgVideo = document.querySelector("#bgVideo");
    bgVideo.addEventListener( 'canplay', function() {
      bgVideo.play();
      });
  }, [])
  return (
    <nav className="h-[70px] flex items-center md:px-10 px-7 justify-between backdrop-blur-sm shadow-md" style={{background: "linear-gradient(45deg, #f0f9, #ff09)"}}>
      <Link href="/home?page=1" className={lobster.className}>
        <h1 className="text-2xl font-bold">frenss</h1>
      </Link>
      {params === '/home' && (<Searcher />)}
      {status === "authenticated" ? (
        <ul className="flex justify-center items-center gap-5">
          <li className="relative flex items-center gap-4">
            <Image
              onClick={() => setDropdown(!dropdown)}
              className="rounded-full cursor-pointer shadow"
              src={session?.user.image}
              width={45}
              height={45}
              alt="avatar"
            />
            <motion.div
              initial={{scale: 0}}
              animate={dropdown ? 'visible' : 'hidden'}
              variants={variants}
              className="absolute top-[120%] right-0 p-3 bg-slate-100 w-[250px] rounded z-10 shadow-md"
            >
              <ul className="flex flex-col gap-2">
                <li className="px-4 text-slate-950 text-center border-b-2 border-solid border-slate-950">
                  <p className="font-bold text-xl hidden md:block pb-2">
                    {session?.user.name}
                  </p>
                </li>
                <li
                  onClick={() => {
                    router.push("/dashboard");
                    setDropdown(false);
                  }}
                  className="flex justify-between items-center rounded bg-slate-100 px-4 py-2 cursor-pointer hover:bg-slate-300"
                >
                  <p className="text-black font-bold text-lg">Dashboard</p>
                  <FaAddressCard color="black" size={20} />
                </li>
                <li
                  onClick={() => {
                    router.push("/home");
                    setDropdown(false);
                  }}
                  className="flex justify-between items-center rounded bg-slate-100 px-4 py-2 cursor-pointer hover:bg-slate-300"
                >
                  <p className="text-black font-bold text-lg">Home</p>
                  <FaHouse color="black" size={20} />
                </li>
                <li
                  onClick={() => signOut()}
                  className=" rounded flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-red-300"
                >
                  <p className="text-black font-bold text-lg">Log out</p>
                  <FaPowerOff color="black" size={20} />
                </li>
              </ul>
            </motion.div>
          </li>
        </ul>
      ) : (
        <button onClick={() => signIn("google")} className="font-bold">
          Log In
        </button>
      )}
    </nav>
  );
}
