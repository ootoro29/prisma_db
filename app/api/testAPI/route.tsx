import { NextRequest, NextResponse } from "next/server";
//import pool from "@/db";

export const GET = async(req:NextRequest) => {
  try {
    //const { rows } = await pool.query('SELECT * FROM users');
    return NextResponse.json({"message":"Hello"},{status:200});
  } catch (error) {
    throw error
  }
}