import { Editor } from '@/components/editor/Editor'
import React from 'react'
import Header from '@/components/Header'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import CollaborativeRoom from '@/components/CollaborativeRoom'
const Document = () => {
  return (
    <main className='flex flex-col items-center w-full'>
      <CollaborativeRoom 

      />
    </main>
  )
}

export default Document