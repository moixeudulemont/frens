import { db } from '@/lib/db';
import Pubs from '@/lib/models/pubs';
import { NextResponse } from 'next/server';
export const fetchCache = 'force-no-store';

export async function GET() {
    await db();
    const pubs = await Pubs.find({});
    if(pubs.length == 0) return NextResponse.json({msg: 'EMPTY'});
    return NextResponse.json(pubs);
}