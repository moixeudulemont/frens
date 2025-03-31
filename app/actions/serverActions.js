'use server';

import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import Users from '@/lib/models/users';
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import blockeds from '@/lib/blocked';

//CLOUDYNARI CREDENTIALS
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

function filterFiles(x) {
    if (x.size > 4000000) return false;
    if(!/^image/.test(x.type)) return false;
    return true;
}

export async function like(status, liker, id) {
    if(status !== 'authenticated') return;

    await db ();
    //VERIFY LIKER
    const { likes } = await Pubs.findById(id, {likes: 1, _id: 0});

    //SET LIKE
    if(likes.length == 0){
        await Pubs.findByIdAndUpdate(id, { $push: {likes: {author: liker}} });
        return 'BAD';
    } 
    
    const check = likes.filter(x => x.author == liker);

    if(check.length !== 0) {
        return 'EXISTS';
    } else {
        await Pubs.findByIdAndUpdate(id, { $push: {likes: {author: liker}} });
        return 'OK';
    }
    
}

export async function changePortrait(data) {
    //SECURE AUTH
    const { user } = await getServerSession();
    if(blockeds.includes(user.email)) return 'BLOCKED USER';
    if(user.email !== data.get('email')) return 'BAD';
    
    const file = data.get('file');
    const email = data.get('email');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    //FILTER FILES
    if(!filterFiles(file)) return 'BAD';

    const url = await new Promise((resolve, reject) => {
              cloudinary.uploader
                .upload_stream({}, (err, res) => {
                  if (err) return reject(err);
                  if (res) return resolve(res.secure_url);
                })
                .end(buffer);
    });

    await Users.findOneAndUpdate({email: email}, {portrait: url});

    return 'OK';
    
}

export async function changeAvatar(data) {
    //SECURE AUTH
    const { user } = await getServerSession();
    if(blockeds.includes(user.email)) return 'BLOCKED USER';
    if(user.email !== data.get('email')) return 'BAD';

    const file = data.get('file');
    const email = data.get('email');
    const author = data.get('author');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    //FILTER FILES
    if(!filterFiles(file)) return 'BAD';

    const url = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({}, (err, res) => {
              if (err) return reject(err);
              if (res) return resolve(res.secure_url);
            })
            .end(buffer);
    });

    await Users.findOneAndUpdate({email: email}, {image: url});

    //UPDATE AVATAR FROM ALL PUBS
    await Pubs.updateMany({author: author}, {avatar: url});
    
    return url;
}