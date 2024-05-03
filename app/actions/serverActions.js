'use server';

import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import { GSP_NO_RETURNED_VALUE } from 'next/dist/lib/constants';


export async function like(status, liker, id) {
    if(status !== 'authenticated') return;

    await db ();
    //VERIFY LIKER
    const { likes } = await Pubs.findById(id, {likes: 1, _id: 0});

    //SET LIKE
    if(likes.length == 0){
        await Pubs.findByIdAndUpdate(id, { $push: {likes: {author: liker}} });
        return 'OK';
    } 
    
    const check = likes.filter(x => x.author == liker);

    if(check.length !== 0) {
        return;
    } else {
        await Pubs.findByIdAndUpdate(id, { $push: {likes: {author: liker}} });
        return 'OK';
    }
    
}