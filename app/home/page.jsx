import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import Pub from '@/components/Pub';

export const metadata = {
  title: "frens - home",
};

export const dynamic = 'force-dynamic';

async function getData() {
  await db();
  return await Pubs.find({});
}

export default async function Home() { 
  const pubs = await getData();

  return (
        <main className='md:px-10 p-5'>
            <h1 className='md:text-5xl text-3xl font-bold text-center'>Publicaciones</h1>
            <section className="mx-auto my-5 flex flex-col gap-5 w-full md:w-7/12 justify-center items-center">
              {
                pubs.map(elem => (
                  <Pub data={elem} key={elem.id} />
                ))
              }
            </section>
        </main>
  );
}
