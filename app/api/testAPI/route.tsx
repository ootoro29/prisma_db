import { NextRequest, NextResponse } from "next/server";
import pool from "@/db";
type User = {
  id: number;
  name: string;
};

export const GET = async(req:NextRequest) => {
  try {
    const connect = await pool.connect();
    const rows = await connect.query<User>('SELECT * FROM users'); 
    return new NextResponse(JSON.stringify(rows.rows),{status:200});
  } catch (error) {
    throw error
  }
}
