import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, date, message } = await req.json();

    if (!name || !email || !phone || !service || !date) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save to database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase
      .from("consultation_bookings")
      .insert({
        name,
        email,
        phone,
        service,
        preferred_date: date,
        message: message || null,
      });

    if (dbError) {
      console.error("DB insert error:", dbError);
    }

    // Send email notification via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NOTIFICATION_EMAIL = "indraprashadsharma4@gmail.com";

    if (RESEND_API_KEY) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "K&T Financial <onboarding@resend.dev>",
          to: [NOTIFICATION_EMAIL],
          subject: `New Consultation Booking: ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0B2545; padding: 24px; border-radius: 12px 12px 0 0;">
                <h1 style="color: #D4A24E; margin: 0; font-size: 22px;">New Consultation Booking</h1>
              </div>
              <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #0B2545; width: 140px;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #0B2545;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #0B2545;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #0B2545;">Service:</td><td style="padding: 8px 0;">${service}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #0B2545;">Preferred Date:</td><td style="padding: 8px 0;">${date}</td></tr>
                  ${message ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #0B2545; vertical-align: top;">Message:</td><td style="padding: 8px 0;">${message}</td></tr>` : ""}
                </table>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                <p style="color: #888; font-size: 12px; margin: 0;">This notification was sent from the K&T Financial Consultancy website.</p>
              </div>
            </div>
          `,
        }),
      });

      if (!emailRes.ok) {
        const errBody = await emailRes.text();
        console.error("Resend error:", errBody);
      }
    } else {
      console.warn("RESEND_API_KEY not set, skipping email notification");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
