import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Parse article content
  let title = null;
  let content = null;
  let author = null;
  let wordCount = 0;
  let readingTime = 0;

  try {
    const response = await fetch(body.url);
    const html = await response.text();

    // Simple parsing
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    title = titleMatch ? titleMatch[1].trim() : null;

    // Extract text content (simple approach)
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 50000);

    content = textContent;
    wordCount = textContent.split(/\s+/).length;
    readingTime = Math.max(1, Math.ceil(wordCount / 200));
  } catch (e) {
    // If parsing fails, save with URL only
  }

  const { data, error } = await supabase
    .from("articles")
    .insert({
      url: body.url,
      title,
      content,
      author,
      word_count: wordCount,
      reading_time_minutes: readingTime,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}
