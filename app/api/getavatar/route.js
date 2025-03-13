import Users from '@/lib/models/users';
import { db } from '@/lib/db';


export async function GET(req) {
    return new Response(401);
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if(!email) return new Response('BAD');

    await db();
    const { image } = await Users.findOne({email: email}, {image: 1, _id: 0});

    return new Response(image);

}