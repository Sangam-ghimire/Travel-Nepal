'use client' //for client side rendering

import { Session } from 'next-auth'; //importing session from next-auth
import './globals.css'
import { SessionProvider } from 'next-auth/react' //importing session provider from next-auth
import { ReactNode} from 'react';//importing react node from react



interface IProps {
  children: ReactNode;
  session: Session
}//interface for props that are passed to the component

//here we are defing RootLayout Component 
//that uses session provider from NextAuth.js to provide session information to functional component
export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={ session }>
          { children } 
        </SessionProvider>
      </body>
    </html>
  )
}
//it generally wraps the entire app with session provider 
// the children includes the pages or components that makeup the app
