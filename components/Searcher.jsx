"use client";

import { FaSearch } from "react-icons/fa";

export default function Searcher() {
  return (
    <div className="relative flex items-center justify-center">
      <input
        className="py-2 px-4 rounded-full md:w-[35vw] w-[50vw] bg-[rgba(200,150,0,0.24)] placeholder-white border-4 border-solid border-white focus:outline-none"
        type="search"
        placeholder="Buscar..."
      />
      <FaSearch color="#fff" size={15} className="absolute right-5 cursor-pointer"/>
    </div>
  );
}
