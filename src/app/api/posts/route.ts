import axiosClient from "@/app/interceptors/axiosInterceptor";
import { supabase } from "@/supabase/client";
import { baseURL } from "@/utils/helpers";
import { NextResponse } from "next/server";
import { validate as uuidValidate } from 'uuid';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("id");
  
  if(postId) {
    if(!uuidValidate(postId)) {
      const responsejsonPromise = await axiosClient.get(`${baseURL}/posts/${postId}`).then(res => res.data);
      return NextResponse.json(responsejsonPromise);
    } else {
      const {data, error} = await supabase.from("posts").select("*").eq("id", postId);
      if(error) {
        return NextResponse.json({error: "Error retrieving data from Supabase"}, {status: 500});
      }
      return NextResponse.json(data);
    }
  }

  try {
    const responsejsonPromise = axiosClient.get(`${baseURL}/posts`);
    const supabasePromise = supabase.from("posts").select("*");

    const [responsejson, supabaseResult] = await Promise.all([responsejsonPromise, supabasePromise]);

    if (supabaseResult.error) {
      throw new Error("Error retrieving data from Supabase");
    }

    const supabaseData = supabaseResult.data ?? [];
    const combinedData = [
      ...supabaseData,
      ...responsejson.data,
    ];

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const { title, body, userId } = await req.json();
    

    if (!title || !body || !userId) {
      return NextResponse.json(
        { error: "All fields (title, body, userId) are required" },
        { status: 400 }
      );
    }
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, body, userId }]);

    if (error) {
      console.error("Error saving post console:", error.message);
      return NextResponse.json(
        { error: "Error saving post: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Post created successfully", data },
      { status: 200 }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}

