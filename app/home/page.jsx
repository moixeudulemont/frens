import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import Pub from '@/components/Pub';
import Pagination from '@/components/Pagination';

export const metadata = {
  title: "frens - home",
};

export const dynamic = 'force-dynamic';

const docsPerPage = 15;
async function getData(page) {
  const skip = (page - 1) * docsPerPage; 
  await db();
  const pubs = await Pubs.find({}).sort({date:-1}).skip(skip).limit(docsPerPage);
  const count = await Pubs.find({}).count();
  return {pubs, count}
}

export default async function Home({searchParams}) {

  const page = searchParams.page || 1;
  const { pubs, count } = await getData(page);

  return (
        <main className='md:px-10 flex flex-col items-center justify-center'>
          
            <section className="mx-auto my-5 flex flex-col gap-5 w-full lg:w-5/12 justify-center items-center">
              {
                pubs.map((elem, key) => (
                  <Pub data={JSON.stringify(elem)} key={key} />
                ))
              }
            </section>
            <Pagination total={count} docs={docsPerPage}/>
        </main>
  );
}
