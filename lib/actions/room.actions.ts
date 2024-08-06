'use server';

import { nanoid } from 'nanoid';
import { title } from 'process';
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { getAccessType, parseStringify } from '../utils';

export const createDocumnet = async ({ userId, email} : CreateDocumentParams) => {
    const roomId = nanoid();

    try {
        const metadata = {
            creatorId: userId,
            email,
            title: 'Untitled',
        }

        const usersAccesses : RoomAccesses ={
            [email]: ['room:write'],
        }

        const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses,
            defaultAccesses: []
          });
          
          revalidatePath('/');

          return parseStringify(room);
    } catch (error) {
        console.log(`Error happened while creating the room: ${error}`);
    }
};

export const getDocument = async ({roomId, userId} : {roomId: string, userId: string}) => {
    try {
        const room = await liveblocks.getRoom(roomId);
        const hasAccess = Object.keys(room.usersAccesses).includes(userId);
        if(!hasAccess) {
            throw new Error('You do not have access to the Document');
        }

        return parseStringify(room);
    } catch (error) {
        console.log(`Error happened while getting the room: ${error}`);
    }
}

export const updateDocument = async (roomId: string, title: string) => {
    try {
        const updatedRoom = await liveblocks.updateRoom(roomId, {
            metadata: {
                title,
            }
          });
          
          revalidatePath(`/documents/${roomId}`);

          return parseStringify(updatedRoom);
    } catch (error) {
        console.log(`Error happened while updating the room: ${error}`);
    }   
    
}

export const getDocuments = async (email:string) => {
    try {
        const rooms = await liveblocks.getRooms({userId: email});
        return parseStringify(rooms);
    } catch (error) {
        console.log(`Error happened while getting rooms: ${error}`);
    }
}

export const updatedDocummentAccess = async({roomId, email, userType, updatedBy} : ShareDocumentParams) => {
    try {
        const usersAccesses:RoomAccesses  = {
            [email] : getAccessType(userType) as AccessType
        }

        const room = await liveblocks.updateRoom(roomId,{
            usersAccesses
        })

        if(room){
            //need to send a notification to the user that he has been added to the room
        }

        revalidatePath(`/documents/${roomId}`);
        return parseStringify(room);
    } catch (error) {
        console.log(`Error happened while updating the room: ${error}`);
    }
}

export const removeCollaborator = async({roomId, email} : {roomId: string, email: string}) => {
    try {
       const room = await liveblocks.getRoom(roomId);

       if(room.metadata.creatorId === email){
        throw new Error('You cannot remove the creator of the room');
       }

       const updatedRoom = await liveblocks.updateRoom(roomId,{
            [email]:null
       })

       revalidatePath(`/documents/${roomId}`);
       return parseStringify(updatedRoom);
    } catch (error) {
        console.log(`Error happened while rempoving the collaborator: ${error}`);
    }
}