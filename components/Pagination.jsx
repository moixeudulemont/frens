'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Pagination({total, docs}) {
    //HOOKS
    const router = useRouter();
    const [prevState, setPrevState] = useState(false);
    const [nextState, setNextState] = useState(true);
    //PARAMS AND VARIABLES
    const page = useSearchParams();
    const current = page.get('page') || 1;
    const search = page.get('search') || '';
    const author = page.get('author') || 'all';
    //RETORN URL PATH
    function urlPath(num) {
        if(search) return `/home?page=${num}&search=${search}`;
        if(author !== 'all') return `/home?page=${num}&author=${author}`
        return `/home?page=${num}&author=all`;
    }
    function prev() {
        if(current <= 1) return;
        router.push(urlPath(parseInt(current)-1));
    }
    function next() {
        const totalPages = Math.ceil(total / docs);
        if(current >= totalPages) return;
        router.push(urlPath(parseInt(current)+1));
    }
  return (
    <div className="flex mb-5 flex-wrap px-2 justify-center items-center">
        <div style={{transition: '0.3s'}} className='shadow-md bg-pink-600 font-bold hover:bg-fuchsia-600 rounded-l-lg p-5 cursor-pointer' onClick={() => prev()}>Prev</div>
        <div className='bg-orange-600 font-bold  p-5 pointer-events-none border-x-2 border-solid border-white'>
            {current}
        </div>
        <div style={{transition: '0.3s'}} className='shadow-md bg-pink-600 font-bold hover:bg-fuchsia-600 rounded-r-lg p-5 cursor-pointer' onClick={() => next()}>Next</div>
    </div>
  )
}
