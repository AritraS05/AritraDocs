'use client'
import { Editor } from '@/components/editor/Editor'
import React from 'react'
import Header from '@/components/Header'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import ActiveCollaborators from '@/components/ActiveCollaborators'
const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className='collaborative-room'>
            <Header>
            <div className="flex items-center justify-center gap-2">
                <p className='document-title'>Share</p>
            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
                <ActiveCollaborators />
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            </Header>
            <Editor />
          </div>
        </ClientSideSuspense>
      </RoomProvider>
  )
}

export default CollaborativeRoom