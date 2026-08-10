import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_TOKEN") ?? "";
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") ?? "";
const WHATSAPP_RECIPIENT = "919532733607";

async function sendWhatsApp(message: string): Promise<void> {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.log("WhatsApp credentials not configured, skipping notification");
    return;
  }

  const url = `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const body = {
    messaging_product: "whatsapp",
    to: WHATSAPP_RECIPIENT,
    type: "text",
    text: { body: message },
  };

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("WhatsApp API error:", resp.status, errText);
    }
  } catch (err) {
    console.error("WhatsApp send failed:", err);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type, name, email, position, message, service_type } = body;

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseResp = await fetch(`${SUPABASE_URL}/rest/v1/${type === "job" ? "job_applications" : "contact_submissions"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        name,
        email,
        ...(type === "job" ? { position: position || "General" } : {}),
        ...(type !== "job" && service_type ? { service_type } : {}),
        ...(message ? { message } : {}),
      }),
    });

    if (!supabaseResp.ok) {
      const errText = await supabaseResp.text();
      console.error("Supabase insert error:", errText);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let waMessage: string;
    if (type === "job") {
      waMessage = `🔔 *New Job Application*\n\n👤 Name: ${name}\n📧 Email: ${email}\n💼 Position: ${position || "General"}${message ? `\n📝 Message: ${message}` : ""}`;
    } else {
      waMessage = `🔔 *New Lead from Zelvio*\n\n👤 Name: ${name}\n📧 Email: ${email}${service_type ? `\n🔧 Service: ${service_type}` : ""}${message ? `\n📝 Message: ${message}` : ""}`;
    }

    await sendWhatsApp(waMessage);

    return new Response(
      JSON.stringify({ success: true, message: "Submission received" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
