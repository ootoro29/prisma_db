import { NextRequest, NextResponse } from "next/server";
import {pool} from "@/db";
type User = {
  id: number;
  name: string;
};

export const GET = async(req:NextRequest) => {
  try {
    //await pool.connect();
    const rows = await pool.query<User>('SELECT * FROM users'); 
    return new NextResponse(JSON.stringify(rows.rows),{status:200});
  } catch (error) {
    return new NextResponse(JSON.stringify({"message":"error"}),{status:500});
  }
}
 