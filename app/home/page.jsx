import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import Pub from '@/components/Pub';

export const metadata = {
  title: "frens - home",
};

export const dynamic = 'force-dynamic';

async function getData() {
  await db();
  return await Pubs.find({}).sort({date:-1});
}

export default async function Home() { 
  const pubs = await getData();

  return (
        <main className='md:px-10 pt-5'>
            <h1 className='lg:text-5xl text-3xl font-bold text-center'>Publicaciones</h1>
            <section className="mx-auto my-5 flex flex-col gap-5 w-full lg:w-6/12 justify-center items-center">
              {
                pubs.map((elem, key) => (
                  <Pub data={JSON.stringify(elem)} key={key} />
                ))
              }
            </section>
        </main>
  );
}
