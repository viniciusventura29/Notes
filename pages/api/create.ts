import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp:NextApiResponse ) {
    const {title, content} = req.body

    try{
        await prisma.note.create({
            data: {
                title,
                content
            }
        })
        resp.status(200).json({message: "Note Created"})
    }catch(error){
        console.log("Failure");
    }
}