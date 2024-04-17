import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import Pub from '@/components/Pub';
import Pagination from '@/components/Pagination';

export const metadata = {
  title: "frens - home",
};

export const dynamic = 'force-dynamic';

const docsPerPage = 20;
async function getData(page, search) {
  const skip = (page - 1) * docsPerPage; 
  await db();
  if(search) {
    const pubs = await Pubs.find({title: { $regex: search, $options: 'i' }}).sort({date:-1}).skip(skip).limit(docsPerPage);
    const count = await Pubs.find({title: { $regex: search, $options: 'i' }}).count();
    return {pubs, count}
  }
  const pubs = await Pubs.find({}).sort({date:-1}).skip(skip).limit(docsPerPage);
  const count = await Pubs.find({}).count();
  return {pubs, count}
}

export default async function Home({searchParams}) {
  //FILTER PARAMS
  function filtroPage() {
    if(!searchParams.page || isNaN(parseInt(searchParams.page)) || /^\W*$/.test(searchParams.page)) return 1;
    return searchParams.page;
  } 
  function filtroSearch() {
    if(!searchParams.search || /^\W*$/.test(searchParams.search)) return '';
    return searchParams.search;
  } 
  //INITIALIZE
  const page = filtroPage();
  const search = filtroSearch();
  const { pubs, count } = await getData(page, search);

  return (
        <main className='md:px-10 flex flex-col items-center justify-center'>
          
            <section className="mx-auto mb-5 flex flex-col gap-5 w-full lg:w-5/12 justify-center items-center">
              {search && (
                <h1 className='text-center text-xl lg:text-2xl font-bold'>{count} resultados encontrados para <span className='text-2xl lg:text-3xl font-bold text-yellow-300'>{search}</span></h1>
              )}
              {
                pubs.map((elem, key) => (
                  <Pub data={JSON.stringify(elem)} key={key}/>
                ))
              }
            </section>
            <Pagination total={count} docs={docsPerPage}/>
        </main>
  );
}
