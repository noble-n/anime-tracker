export default async function handler(req, res) {
    try {
      const baseURL = "https://anime-tracka.vercel.app/";
  
      const response = await fetch(`${baseURL}/api/getCompletedAnime`, {
        method: "GET",
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error("❌ Cron job API error:", result.error);
        return res.status(500).json({ error: "Cron job execution failed" });
      }
  
      console.log("✅ Cron job executed:", result);
      return res.status(200).json({ message: "Cron job completed successfully" });
  
    } catch (error) {
      console.error("❌ Error in cron job:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  