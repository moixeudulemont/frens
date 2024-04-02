'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function pages(num) {
    const number = num < 1 ? 1 : num;
    let arr =  [...Array(number).keys()];
    return arr;
}


export default function Pagination({total}) {
    const page = useSearchParams();
    const current = page.get('page');
  return (
    <div className="flex gap-5 mb-5">
        {
            pages(total).map((elem) => (
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
