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
    const current = page.get('page');
  return (
    <div className="flex gap-5 mb-5">
        {
            pages(total, docs).map((elem) => (
                <Link 
                href={`/home?page=${elem+1}`}
                key={elem} className={`w-[40px] h-[40px] bg-pink-500 cursor-pointer hover:bg-pink-700 flex justify-center items-center rounded ${current == (elem+1) ? 'border-4 border-solid border-white' : ''}`}>
                    <p className="text-white font-bold text-xl">{elem+1}</p>
                </Link>
            ))
        }
    </div>
  )
}
