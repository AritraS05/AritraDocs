'use client';
import Loader from "@/components/Loader";
import { getClerkUser } from "@/lib/actions/user.actions";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";
const Provider = ({children} : {children: ReactNode}) => {
  return (
    <LiveblocksProvider 
    authEndpoint="/api/liveblocks-auth"
    resolveUsers={async({userIds}) =>{
      const users = await getClerkUser({userIds});
      return users;
    }}
    >
        <ClientSideSuspense fallback={<div><Loader /></div>}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider