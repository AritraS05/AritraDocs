'use server';

import { nanoid } from 'nanoid';
import { title } from 'process';
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';

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
            defaultAccesses: ['room:write']
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
        //TODO: assess the permissions of the user to acess the document
        // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

        // if(!hasAccess) {
        //     throw new Error('You do not have access to this room');
        // }

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