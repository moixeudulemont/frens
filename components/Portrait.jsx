'use client';


import Image from 'next/image';
import { changeAvatar, changePortrait } from '@/app/actions/serverActions';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import Toast from '@/components/Toast';
import { useState } from 'react';

export default function Portrait({portrait, avatar, author}) {

  console.log(avatar)

  const [loader, setLoader] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  function filters(e) {
    if(status !== 'authenticated') return false;
    if(!e.target.files) return false;
    const file = e.target.files[0];
    if(!file) return false;
    if(file.size > 4000000) {
      alert('El archivo es muy pesado, máximo 4 MB');
      return false;
    }
    if(!/^image/.test(file.type)) {
      alert('Archivo inválido, suba una imágen');
      return false;
    }
    return file;
  }

  async function switcher(type, file) {
    if((status !== 'authenticated') || (!type) || (!file) || (!session.user.email) || (!session.user.name)) return false;
    setLoader(true);
    const form = new FormData();
    form.append('file', file);
    form.append('email', session.user.email);
    form.append('author', session.user.name);
    switch(type) {
      case 'A':
        const x = await changeAvatar(form);
        if(x != 'BAD') {
          localStorage.setItem('avatar', x);
          toaster('La foto de perfil se ha cambiado bien');
          router.refresh();
        }
        setLoader(false);
        break;
      case 'P':
        const z = await changePortrait(form);
        if(z === 'OK') {
          toaster('Tu portada se cambió bien, hay que esperar unos minutos para ver los cambios');
          router.refresh();
        }
        setLoader(false);
        break;
      default:
        return;
    }
  }

  async function change(e, type) {
    //VERIFICATIONS
    if(!filters(e)) return;
    //MAIN
    switcher(type, filters(e));
  }

  //SET TOAST
  function toaster(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  }

  return (
    <header className='w-full lg:h-[600px] h-[350px] relative lg:mb-10 mb-5 rounded-md'>
      {loader && <Loader />}
      {toastMsg && <Toast msg={toastMsg}/>}
     {session?.user && (
      <>
       {(status === 'authenticated' && session.user.name === author) ? (
        <>
        <input type="file" id="portrait" hidden accept='image/*' onChange={e => change(e,'P')}/>
        <label htmlFor="portrait">
          <Image 
            src={portrait ? portrait : '/portrait.jpg'}
            width={1280}
            height={720}
            className='w-full h-[85%] rounded-sm cursor-pointer hover:hue-rotate-180 z-10'
            alt={`Portada de ${author}`}
          />
        </label>
        <input type="file" id="avatar" hidden accept='image/*' onChange={e => change(e,'A')}/>
        <label htmlFor="avatar">
          <Image 
            src={avatar}
            width={520}
            height={520}
            className='absolute rounded-full shadow-md animate-bounce lg:right-10 right-5 bottom-5 lg:w-40 lg:h-40 w-20 h-20 ring-white ring-offset-2 ring-2 cursor-pointer hover:hue-rotate-180 z-10'
            alt={`Foto de perfil de ${author}`}
          />
        </label>
        </>
      ) : (
        <>
          <Image 
            src={portrait ? portrait : '/portrait.jpg'}
            width={1280}
            height={720}
              className='w-full h-[85%] rounded-sm'
              alt={`Portada de ${author}`}
          />
          <Image 
            src={avatar}
            width={520}
            height={520}
            className='absolute rounded-full shadow-md lg:right-10 right-5 bottom-5 lg:w-40 lg:h-40 w-20 h-20 ring-white ring-offset-2 ring-2'
            alt={`Foto de perfil de ${author}`}
          />
        </>
      )}
      </>
     )}
     {!session?.user && (
      <>
      <Image 
          src={portrait ? portrait : '/portrait.jpg'}
          width={1280}
          height={720}
          className='w-full h-[85%] rounded-sm'
          alt={`Portada de ${author}`}
      />
        <Image 
          src={avatar}
          width={520}
          height={520}
          className='absolute rounded-full shadow-md lg:right-10 right-5 bottom-5 lg:w-40 lg:h-40 w-20 h-20 ring-white ring-offset-2 ring-2'
          alt={`Foto de perfil de ${author}`}
        />
      </>
     )}
    </header>
  )
}
