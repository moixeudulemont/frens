import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import Users from '@/lib/models/users';
import { getServerSession } from 'next-auth';


export async function POST(req) {
    const { user } = await getServerSession();
    if(!user) return NextResponse.json({status: 403});
    const data = await req.formData();
    const comment = data.get('comment').trim();
    const id = data.get('id');
    if(!comment) return NextResponse.json({err: 'BAD'});
     
    await db();
    const { image: imgDB } = await Users.findOne({email: user.email}, {image: 1, _id: 0});
    await Pubs.updateOne({_id:id}, { $push: {comments: {
        author: user.name,
        avatar: imgDB,
        msg: comment
    }} });

    return NextResponse.json({msg: 'OK'});
}