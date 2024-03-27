import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import Pub from '@/components/Pub';

export const metadata = {
  title: "frens - home",
};

async function getData() {
  await db();
  const pubs = await Pubs.find({});
  if(pubs.length == 0) return [];

  return pubs;
}

export default async function Home() { 
  const pubs = await getData();
  return (
        <main className='md:px-10 p-5'>
            <h1 className='md:text-5xl text-3xl font-bold text-center'>Publicaciones</h1>
            <section 
              className="lg:w-8/12 w-full mx-auto h-full mt-10 flex flex-col gap-5"
            >
              {
                pubs.map(elem => (
                  <Pub data={elem} key={elem.id} />
                ))
              }
            </section>
        </main>
  );
}
