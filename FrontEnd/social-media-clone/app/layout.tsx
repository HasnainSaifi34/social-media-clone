"use client"
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import {ApolloWrapper} from './lib/apollo-wrapper'





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <title>Social-Media-Clone</title>
      <body className={inter.className}>
        <ApolloWrapper>{children} </ApolloWrapper>
        </body>
    </html>
    

  )
}
