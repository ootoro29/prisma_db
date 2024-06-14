import { NextRequest, NextResponse } from "next/server";
import {client} from "@/db";
type User = {
  id: number;
  name: string;
};

export const GET = async(req:NextRequest) => {
  try {
    await client.connect((err) => {
      if(err) throw err;
    });
    const rows = await client.query<User>('SELECT * FROM users'); 
    return new NextResponse(JSON.stringify(rows),{status:200});
  } catch (error) {
    throw error
  }
}
 