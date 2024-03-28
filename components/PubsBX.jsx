'use client';
import { useState, useEffect } from 'react';
import Pub from '@/components/Pub';

async function getPubs() {
    const res = await fetch('/api/getPubs', {next: {revalidate: 60}});
    if(!res.ok) return [];
    const response = await res.json();
    
    return response;
}


export default function PubsBX() {
    const [pubs, setPubs] = useState([]);
    
    useEffect(() => {
        getPubs().then(x => setPubs(x)).catch(err => console.log(err));    
    }, []);

    return (
        <section 
              className="lg:w-8/12 w-full mx-auto h-full mt-10 flex flex-col gap-5"
            >
            {
                pubs.map((elem, key) => (
                    <Pub data={elem} key={key} />
                ))
            }
        </section>
    )
}