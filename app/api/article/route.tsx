import { prisma } from "@/auth"
import { zAirticle } from "@/type";
import { NextRequest, NextResponse } from "next/server"
export const GET = async(req:NextRequest) => {
    try{
        const article = await prisma.article.findMany({
            include:{
                users:true
            }
        });
        return new NextResponse(JSON.stringify(article),{status:200});
    } catch(e){
        return new NextResponse("error:",{status:500});
    }
}
export const POST = async(req:NextRequest) => {
    const data = await req.json();
    const parsedData = zAirticle.parse(data);
    try{
        const article = await prisma.article.create({
            data:{
                title:parsedData.title,
                content:parsedData.content,
                users:{
                    connect:[
                        {id:parsedData.user_id}
                    ]
                }
            }
        })
        return new NextResponse(JSON.stringify(article),{status:201});
    } catch(e){
        return new NextResponse("error:",{status:500});
    }
}