import axiosClient from "@/app/interceptors/axiosInterceptor";
import { baseURL } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";
import { validate as uuidValidate } from "uuid";
import { supabase } from "@/supabase/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("id");

  try {
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }
    if (!uuidValidate(postId)) {
      const responsejsonPromise = await axiosClient.get(
        `${baseURL}/posts/${postId}/comments`
      );
      return NextResponse.json(responsejsonPromise.data);
    } else {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("postId", postId);
        
      if (error) {
        return NextResponse.json(
          { error: "Error retrieving data from Supabase" },
          { status: 500 }
        );
      }
      console.log(data)
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
