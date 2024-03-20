'use client'

import { Lobster } from 'next/font/google';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const lobster = Lobster({ subsets: ['latin'], weight: ['400'] });

export default () => {
    const {data: session, status} = useSession();
    return(
        <nav className="h-[80px] flex items-center md:px-10 px-7 justify-between">
            <Link href="/" className={lobster.className}>
                <h1 className="text-2xl font-bold">frens</h1>
            </Link>
            {status === 'authenticated' ? (
                <ul className='flex justify-center items-center gap-5'>
                    <li><button onClick={()=>signOut()} className="font-bold">Log Out</button></li>
                    <li><Image 
                            className='rounded-full cursor-pointer shadow'
                            src={session?.user.image} width={45} height={45} alt="avatar"
                    /></li>
                </ul>
            ) : (
                <button onClick={()=>signIn('google')} className="font-bold">Log In</button>
            )}
        </nav>
    );
}