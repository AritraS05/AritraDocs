'use client'
import { Editor } from '@/components/editor/Editor'
import React from 'react'
import Header from '@/components/Header'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className='collaborative-room'>
            <Header>
            <div className="flex items-center justify-center gap-2">
                <p className='document-title'>Share</p>
            </div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </Header>
            <Editor />
          </div>
        </ClientSideSuspense>
      </RoomProvider>
  )
}

export default CollaborativeRoom