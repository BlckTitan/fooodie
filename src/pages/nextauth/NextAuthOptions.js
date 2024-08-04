import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt'
import { User } from "../../app/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from '../../lib/mongooseConnect'
import '../../lib/db'
import mongoose from "mongoose";

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

        async jwt({ token, user, session }) {

            if(user){
                return{
                    ...token,
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,

                }
            }
            
            return token
        },

        async session({ session, user, token }) {

            session.user.id = token && token.id
            session.user.firstname = token && token.firstName
            session.user.lastname = token && token.lastName
            session.user.username = token && token.username

            return session
        }

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