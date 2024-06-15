import { prisma } from "@/app/auth"
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest,{params}:{params:{email:string}}) => {
    try{
        const email = params.email;
        const user = await prisma.user.findUnique({
            where:{email}
        });
        return NextResponse.json(user,{status:200});
    }catch(e){
        return NextResponse.json("error:",{status:500});
    }
}