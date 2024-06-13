import { NextRequest, NextResponse } from "next/server";
import pool from "@/db";
type User = {
  id: number;
  name: string;
};

export const GET = async(req:NextRequest) => {
  try {
    const rows = await pool.query<User>('SELECT * FROM users'); 
    return NextResponse.json(rows.rows,{status:200});
  } catch (error) {
    throw error
  }
}
