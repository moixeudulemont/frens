"use client";

import { FaShareNodes } from "react-icons/fa6";
import Toast from "@/components/Toast";
import { useState } from 'react';

export default function Clipboard({ pubId }) {
    //HOOKS
    const [state, setState] = useState(false);
  const url = `https://frenss.pro/pub?id=${pubId}`;
  return (
    <>
        {state && (<Toast msg={'Link copiado, lo puede pegar donde quiera'}/>)}
      <FaShareNodes
        color="white"
        size={25}
        className="hover:animate-pulse cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(url);
          setState(true);
          setTimeout(() => setState(false), 3000);
        }}
      />
    </>
  );
}
