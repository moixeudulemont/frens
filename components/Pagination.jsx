'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function pages(total, docs) {
    const pre = Math.floor(total / docs);
    const pre2 = total % docs;
    const number = pre + (pre2 > 0 ? 1 : 0);
    const final = number < 0 ? 1 : number;
    let arr =  [...Array(final).keys()];
    return arr;
}


export default function Pagination({total, docs}) {
    const page = useSearchParams();
    const current = page.get('page') || 1;
    const search = page.get('search') || '';
    const author = page.get('author') || 'all';
    //RETORN URL PATH
    function urlPath(elem) {
        if(search) return `/home?page=${elem+1}&search=${search}`;
        if(author !== 'all') return `/home?page=${elem+1}&author=${author}`
        return '/home?page=1&author=all';
    }
    
  return (
    <div className="flex gap-2 mb-5 flex-wrap px-2 justify-center items-center">
        {
            pages(total, docs).map((elem) => (
                <Link 
                href={urlPath(elem)}
                key={elem} className={`w-[40px] h-[40px] bg-pink-500 cursor-pointer hover:bg-pink-700 flex justify-center items-center rounded ${current == (elem+1) ? 'bg-slate-400 cursor-default hover:bg-slate-400 pointer-events-none' : ''}`}>
                    <p className="text-white font-bold text-xl">{elem+1}</p>
                </Link>
            ))
        }
    </div>
  )
}
