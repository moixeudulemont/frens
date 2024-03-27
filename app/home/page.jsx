import Pub from '@/components/Pub';

export const metadata = {
  title: "frens - home",
};

async function getPubs() {
  const res = await fetch(`${process.env.MY_URL}/api/getPubs`);
  const response = await res.json();
  
  return response;
}
const pubs = await getPubs();

export default async function Home() { 

  return (
        <main className='md:px-10 p-5'>
            <h1 className='md:text-5xl text-3xl font-bold text-center'>Publicaciones</h1>
            <section 
              className="lg:w-8/12 w-full mx-auto h-full mt-10 flex flex-col gap-5"
            >
              {
                pubs?.map((i, key) => (
                  <Pub data={i} key={key}/>
                ))
              }
            </section>
        </main>
  );
}
