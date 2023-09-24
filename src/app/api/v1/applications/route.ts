import { NextRequest, NextResponse } from "next/server";
import axios from "@/conf/axios";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const response = await axios.post("/applications", json);
  return NextResponse.json(response.data, {
    status: response.status,
  });
}

export async function GET(request: NextRequest) {
  const response = await axios.get("/applications");
  return NextResponse.json(response.data, {
    status: response.status,
  });
}
