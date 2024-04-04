import Link from 'next/link';

import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import { NextResponse } from 'next/server';

async function getPub(id) {
    await db();
    let pub = null;
    try {
      pub = await Pubs.findById(id);
      return pub;
    } catch (error) {
      return 'EMPTY';
    }
}

function Empty() {
  return (
    <main className="w-full h-[calc(100dvh-64px-1rem)] flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl font-bold">No se ha encontrado</h1>
        <Link className='py-2 px-4 font-bold bg-orange-500 text-white rounded w-[200px] text-center animate-pulse' href="/home">Volver</Link>
      </main>
  )
}

export default async function pub({ searchParams }) {
  const id = searchParams.id;
  if (!/^\w*$/.test(id))
    return <Empty />
    //INIT
    const pub = await getPub(id);
    console.log(pub);
    if(pub === 'EMPTY') return <Empty />
  return (
    <main>
      {/* CONTENT SECTION */} 
      <section>
        
      </section>
      {/* SOCIAL SECTION */}
      <section></section>
    </main>
  );
}
