import { NextRequest, NextResponse } from "next/server";
import axios from "@/conf/axios";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const response = await axios.post("/deployments", json);
  return NextResponse.json(response.data, {
    status: response.status,
  });
}
