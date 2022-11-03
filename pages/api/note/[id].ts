import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp:NextApiResponse ) {
    const noteId = req.query.id

    if(req.method === 'DELETE'){
        const note = await prisma.note.delete({
            where: {id: Number(noteId)}
        })
        resp.json(note)
    }else{
        console.log("Note could not be created")
    }
}