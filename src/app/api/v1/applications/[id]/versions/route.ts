import { NextRequest, NextResponse } from "next/server";
import axios from "@/conf/axios";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await axios.get("/applications/" + params.id + "/versions");
  return NextResponse.json(response.data, {
    status: response.status,
  });
}
