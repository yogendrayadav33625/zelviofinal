import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      type,
      name,
      email,
      position,
      message,
      service_type,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Supabase server environment variables are missing");

      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const table =
      type === "job"
        ? "job_applications"
        : "contact_submissions";

    const data =
      type === "job"
        ? {
            name,
            email,
            position: position || "General",
            ...(message ? { message } : {}),
          }
        : {
            name,
            email,
            ...(service_type ? { service_type } : {}),
            ...(message ? { message } : {}),
          };

    const { error } = await supabase
      .from(table)
      .insert(data);

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Submission received",
    });
  } catch (error) {
    console.error("Submit lead error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
