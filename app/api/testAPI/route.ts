import { NextResponse } from "next/server";
import pool from "@/db";
type User = {
  id: number;
  name: string;
};

export async function GET() {
  try {
     const { rows } = await pool.query<User>('SELECT * FROM users');
     return NextResponse.json(rows);
   } catch (error) {
     throw error
   }
 }