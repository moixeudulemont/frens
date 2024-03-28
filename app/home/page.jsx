import PubsBX from '@/components/PubsBX';

export const metadata = {
  title: "frens - home",
};


export default async function Home() { 
  return (
        <main className='md:px-10 p-5'>
            <h1 className='md:text-5xl text-3xl font-bold text-center'>Publicaciones</h1>
            <PubsBX />
        </main>
  );
}
