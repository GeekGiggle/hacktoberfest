"use client"; 

import { SessionProvider } from 'next-auth/react'

const Provider = ({children, session}) => {
  return (
   <SessionProvider session={session}>
    {children}
   </SessionProvider>
  )
}

export default Provider


// usually the providers go in the layout component so that way we can use them throughout t
// throughout the application 