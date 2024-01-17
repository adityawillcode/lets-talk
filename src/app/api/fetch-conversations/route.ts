import prisma from "@/app/lib/prismadb";
import { NextRequest, NextResponse as res } from "next/server";

export const GET = async (req: NextRequest) => {
    const myId = req.nextUrl.searchParams.get('myId')
    console.log('this is id from fetch-conversation route', myId)

    try {
        const myConversations = await prisma.conversation.findMany({
            where: {
                userIds: {
                    has: myId!
                }
            },
            select: {
                id: true,
                users: {
                    select: {
                        lastSeen:true,
                        name: true,
                        id: true,
                        image: true,
                    },
                }

            }

        })
        if (myConversations) {
            console.log('fetch Conversation route,',myConversations);
            return res.json({ conversations: myConversations })
        }
    } catch (error) {
        console.log('there is error in fetching the convesations');
        console.log(error)
        return res.json({ errorMessage: 'Unable to Load Conversations' })

    }


}