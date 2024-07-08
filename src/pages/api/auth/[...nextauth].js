
import NextAuth from "next-auth";
import authOptions from '../../nextauth/NextAuthOptions';

// const handler = NextAuth( authOptions )

// export { handler as GET, handler as POST }
export default  NextAuth( authOptions )


const handler = NextAuth
export { handler as GET, handler as POST}