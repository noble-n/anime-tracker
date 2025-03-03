import { NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false }, 
    }
  );

  export async function GET() {
    const today = new Date().toISOString().split("T")[0];
  
    // Fetch tracked anime that ends today
    const { data, error } = await supabase
      .from("tracked_anime")
      .select("title, email")
      .eq("estimated_end_date", today);
  
    if (error) {
      console.error("Error fetching today's anime:", error);
      return NextResponse.json({ error: "Failed to fetch tracked anime" }, { status: 500 });
    }
  
    // If no anime ends today, return early
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No anime completed today" });
    }
  
    // Send emails for each completed anime
    for (const anime of data) {
      await sendCompletionEmail(anime.email, anime.title);
    }
  
    return NextResponse.json({ message: "Emails sent successfully" });
  }
  
  // Helper function to send an email via your existing API
  const sendCompletionEmail = async (to: string, animeTitle: string) => {
    const baseURL = "https://anime-tracka.vercel.app/";

    try {
      const response = await fetch(`${baseURL}/api/sendMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject: "Your Tracked Anime is Completed! 🎉",
          text: `Good news! The anime **${animeTitle}** has completed today. It's time to binge-watch! 🎉`, // Plain text fallback
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; text-align: center;">
              <h2 style="color: #2c3e50;">🎉 Your Tracked Anime is Complete! 🎉</h2>
              <p style="font-size: 16px; color: #333;">
                <strong>${animeTitle}</strong> has finished airing today! Time to binge-watch! 🍿
              </p>
              
            </div>
          `, 
        }),
      });
  
      const result = await response.json();
      if (!response.ok) {
        console.error(`❌ Failed to send email to ${to}:`, result.error);
      } else {
        console.log(`✅ Email sent to ${to}: ${animeTitle}`);
      }
    } catch (error) {
      console.error(`❌ Error sending email to ${to}:`, error);
    }
  };
  
