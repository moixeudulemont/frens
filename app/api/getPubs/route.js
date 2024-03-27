import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';


export async function GET() {
    await db();
    const pubs = await Pubs.find({});
    if(pubs.length == 0) Response.status(404);

    return Response.json(pubs);
}