import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .eq("is_public", true)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
  }

  // Increment views
  await supabase
    .from("portfolios")
    .update({ views_count: (data.views_count || 0) + 1 })
    .eq("id", data.id);

  return NextResponse.json(data);
}
