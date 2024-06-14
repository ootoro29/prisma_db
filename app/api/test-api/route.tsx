import { NextRequest, NextResponse } from "next/server";
import {client} from "@/db";
type User = {
  id: number;
  name: string;
};

export const GET = async(req:NextRequest) => {
  try {
    await client.connect();
    const rows = await client.query<User>('SELECT * FROM users'); 
    //const connect = await pool.connect();
    //const rows = await pool.query<User>('SELECT * FROM users'); 
    return new NextResponse("hello",{status:200});
  } catch (error) {
    throw error
  }
}
