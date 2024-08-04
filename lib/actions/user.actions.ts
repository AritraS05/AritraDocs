'use server';

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { RoomContext } from "@liveblocks/react/suspense";
import { liveblocks } from "../liveblocks";

export const getClerkUser = async ({userIds} : {userIds: string[]}) => {
  try {
    const { data } = await clerkClient.users.getUserList({
        emailAddress: userIds,
    });

    const users = data.map((user) => ({
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) => users.find((user) => user.email === email));

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`error fetching user: ${error}`);
  }
};

export const getDocumentUsers = async ({roomId, currentUser, text}:{roomId: string, currentUser: string, text: string}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

    if(text.length){
      const lowerCaseText = text.toLowerCase();
      const filteredUsers = users.filter((email : string) => email.toLowerCase().includes(lowerCaseText));
    }
  } catch (error) {
    console.log(`error fetching user: ${error}`);
  }
}