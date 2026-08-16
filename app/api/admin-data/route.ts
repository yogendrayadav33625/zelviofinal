import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const adminKey = authHeader.replace(/^Bearer\s+/i, "");

    const expectedAdminKey =
      process.env.ADMIN_KEY || "zelvio-admin-2026";

    if (!adminKey || adminKey !== expectedAdminKey) {
      return NextResponse.json(
        { error: "Invalid admin key" },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Supabase server environment variables are missing" },
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

    const [contactsResult, jobsResult] = await Promise.all([
      supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (contactsResult.error) {
      console.error("Contacts fetch error:", contactsResult.error);
      return NextResponse.json(
        { error: "Failed to load contacts" },
        { status: 500 }
      );
    }

    if (jobsResult.error) {
      console.error("Jobs fetch error:", jobsResult.error);
      return NextResponse.json(
        { error: "Failed to load job applications" },
        { status: 500 }
      );
    }

   return NextResponse.json(
  {
    contacts: contactsResult.data || [],
    jobs: jobsResult.data || [],
  },
  {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  }
); 
  } catch (error) {
    console.error("Admin data error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
