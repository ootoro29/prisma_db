import { prisma } from "@/app/auth"
import { NextRequest, NextResponse } from "next/server"
export const GET = async(req:NextRequest,{params}:{params:{user_id:string}}) => {
    const user_id = parseInt(params.user_id);
    try{
        const article = await prisma.article.findMany({
            where:{
                users:{
                    some:{
                        id:{
                            equals:user_id
                        }
                    }
                }
            },
            select:{
                id:true,
                title:true,
                content:true,
                users:{
                    select:{
                        id:true,
                        name:true,
                        image:true,
                    }
                }
            }
        });
        return new NextResponse(JSON.stringify(article),{status:200});
    } catch(e){
        return new NextResponse("error:",{status:500});
    }
}