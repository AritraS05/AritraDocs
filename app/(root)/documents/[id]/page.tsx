import { Editor } from '@/components/editor/Editor'
import React from 'react'
import Header from '@/components/Header'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import CollaborativeRoom from '@/components/CollaborativeRoom'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDocument } from '@/lib/actions/room.actions'
const Document = async ({params : {id}} : SearchParamProps )=> {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const room = await getDocument({
    userId: clerkUser.emailAddresses[0].emailAddress,
    roomId: id,
  });

  if(!room) redirect('/');
  //TODO: assess the permissions of the user to acess the document
  return (
    <main className='flex flex-col items-center w-full'>
      <CollaborativeRoom 
        roomId = {id}
        roomMetadata = {room.metadata}
      />
    </main>
  )
}

export default Document