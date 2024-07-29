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