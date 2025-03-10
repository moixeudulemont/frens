import Users from '@/lib/models/users';
import { db } from '@/lib/db';


export async function GET(req) {

    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    if(!name) return new Response('BAD');

    await db();
    const { image } = await Users.findOne({name: name}, {image: 1, _id: 0});

    return new Response(image);

}