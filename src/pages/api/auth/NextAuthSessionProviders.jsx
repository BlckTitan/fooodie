'use client';

import { SessionProvider } from "next-auth/react";


export default function NextAuthSessionProviders({children}){
    
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}  