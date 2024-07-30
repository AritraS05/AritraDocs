'use client'
import { Editor } from '@/components/editor/Editor'
import React, { use, useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import ActiveCollaborators from '@/components/ActiveCollaborators'
import { Input }from './ui/input'
import Image from 'next/image'
const CollaborativeRoom = ({roomId,roomMetadata} : {roomId: string, roomMetadata: any}) => {
  const currentUserType = 'editor';
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const  inputRef = useRef<HTMLDivElement>(null);
  const updateTitleHandler = (e:  React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter'){
        setLoading(true);
        try {
          if(documentTitle !== roomMetadata.title){
            //to be done in the room actions
          }
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      } 
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditing(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[]);

  return (
    <RoomProvider id={ roomId }>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className='collaborative-room'>
            <Header className='flex'>
            <div ref= {containerRef} className="flex flex-col items-center justify-center gap-2">
                {(editing && !loading )? 
                  (<Input
                    type='text'
                    value={documentTitle}
                    ref={inputRef}
                    placeholder='enter title'
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    onKeyDown={updateTitleHandler} 
                    disable={!editing}
                    className='document-title-input'
                  />)
                  :
                  (
                    <>
                      <p className='document-title'>{documentTitle}</p>
                    </>
                  )
              }

              {currentUserType === 'editor' && !editing && (
                <Image 
                  src="/assets/icons/edit.svg"
                  width={24}
                  height={24}
                  alt="edit"
                  className='pointer'
                  onClick={() => setEditing(true)}
                />
              )}

              {currentUserType !== 'editor' && !editing && (
                <p className='view-only-tag'>View Only</p>
              )}

              {loading && <p className='text-sm text-gray-400 '>saving...</p> }
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