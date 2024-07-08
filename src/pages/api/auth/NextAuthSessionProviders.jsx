'use client';

import { SessionProvider } from "next-auth/react";


export default function NextAuthSessionProviders({children, session}){
    
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
} 