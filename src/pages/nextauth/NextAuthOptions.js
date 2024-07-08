'use client'
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { User } from "../../app/models/User";

const  authOptions = {

    secret: process.env.NEXTAUTH_SECRET,
     
    session: {
        strategy: 'jwt',
        maxAge: 2 * 24 * 60 * 60, //2 days

    },

    providers: [
        Credentials({
            // id: 'Credentials',
            type: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Kindly enter your email'},
                password: { label: 'Password', type: 'password'}
            },

            async authorize(credentials, req){
                
                const email = credentials?.email;
                const password = credentials?.password


                const existingUser = await User.findOne({email})

                console.log(existingUser)
                
                const existingPassword = existingUser && bcrypt.compareSync(password, existingUser.password)
                
                if(existingPassword){
                    return {
                        existingUser
                    }
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      }

}

export default authOptions