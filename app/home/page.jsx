import Navbar from '@/components/Navbar';
import PubsBX from '@/components/PubsBX';

export default function Home() {
  return (
    <>
        <header>
            <Navbar/>
        </header>
        <main className='md:px-10 py-5'>
            <h1 className='md:text-5xl text-3xl font-bold text-center'>Publicaciones</h1>
            <PubsBX/>
        </main>
    </>
  );
}
