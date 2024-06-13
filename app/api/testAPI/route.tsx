import { NextRequest, NextResponse } from "next/server";
import pool from "@/db";

export const GET = async(req:NextRequest) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    return NextResponse.json(rows);
  } catch (error) {
    throw error
  }
}