import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import { getServerSession } from 'next-auth';


export async function POST(req) {
    const { user } = await getServerSession();
    if(!user) return;
    const data = await req.formData();
    const comment = data.get('comment').trim();
    const id = data.get('id');
    if(!comment) return NextResponse.json({err: 'BAD'});
     
    await db();
    await Pubs.updateOne({_id:id}, { $push: {comments: {
        author: user.name,
        avatar: user.image,
        msg: comment
    }} });

    return NextResponse.json({msg: 'OK'});
}