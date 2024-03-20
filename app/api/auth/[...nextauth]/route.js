import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/lib/db';
import User from '@/lib/models/users';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({profile}){
            if(!profile.email) return false;
            await db();
            //IF EXISTS
            const exists = await User.findOne({email: profile.email});
            if(exists) return true;
            //SAVE USER INTO DB
            await User.create({name: profile.name, image: profile.picture, email: profile.email});
            return true;
        }
    }
});

export { handler as GET, handler as POST }
