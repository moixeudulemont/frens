import { NextResponse } from 'next/server';
import {v2 as cloudinary} from 'cloudinary';
import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import { getServerSession } from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';



export const POST = async (req) => {
    //GET SESSION
    const { user } = await getServerSession(authOptions);
    if(!user) NextResponse.status(401);
    cloudinary.config({ 
        cloud_name: 'andy-company', 
        api_key: process.env.CLOUDINARY_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET 
    });
    
    //IMG FILTER
    function filter(file) {
        if(file.size > 15000000) {
            return NextResponse.json({err: 'BIG'});
        }
        if(file.type != 'image/png' || file.type != 'image/jpeg' || file.type != 'image/jpg' || file.type != 'image/gif') {
            return NextResponse.json({err: 'BADTYPE'});
        }
        return true;
    }
    const data = await req.formData();
    const file = data.get('file');
    if(filter(file)) {
        //START PROCESS
        const binary = await file.arrayBuffer();
        const buffer = Buffer.from(binary);
        
        const url = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (err, res) => {
                if(err) return reject(err);
                if(res) return resolve(res.secure_url);
            }).end(buffer);
        });

        //SAVE PUB TO DB
        await db();
        const status = await Pubs.create({
            author: user.email,
            avatar: user.image,
            title: data.get('title').trim(),
            description: data.get('description').trim(),
            image: url,
        });
        
        return NextResponse.json({msg: 'OK'});
    }
    
    //BAD
    return NextResponse.status(403);
}