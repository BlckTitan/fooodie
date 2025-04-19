import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs'
import { User } from "../../app/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from '../../lib/mongooseConnect'
import '../../lib/db'
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

const  authOptions = {

    secret: process.env.NEXTAUTH_SECRET,
    
    session: {
        strategy: 'jwt',
        maxAge: 2 * 24 * 60 * 60, //2 days

    },

    adapter: MongoDBAdapter(clientPromise),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),

        Credentials({
            id: 'Credentials',
            type: 'credentials',
            name: 'credentials',
            
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Kindly enter your email' },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials, req, res){
                
                // check for email and password
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Please enter email and password")
                }
                 
                const email = credentials?.email;
                const password = credentials?.password
                
                await mongoose.connect(process.env.MONGODB_URI)

                const user = await User.findOne({email})
                    
                const existingPassword = await user && bcrypt.compareSync(password, user.password)

                if(!existingPassword){
                    throw new Error("Please enter a correct password")
                }
                
                return user;
            },
        })
    ],
    
    callbacks: {

        async jwt({ token, user, session, trigger}) {
            
            if(user){
                // on signin
                return{
                    ...token,
                    id: user.id,
                    username: user.username,
                    isAdmin: user.isAdmin,
                }
            }

            if (trigger === 'update' && session) {
                // When session is updated explicitly
                return {
                    ...token,
                    id: session.id ?? token.id,
                    username: session.username ?? token.username,
                    isAdmin: session.isAdmin ?? token.isAdmin,
                };
            }
            
            return token
        },

        async session({ session, token }) {

            session.user.id = token?.id ??  null
            session.user.username = token?.username ?? null
            session.user.isAdmin = token?.isAdmin ?? null

            return session
        },

    },

    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }

}

export default authOptions