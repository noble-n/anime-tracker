import { NextResponse } from "next/server"
import axios from "axios"
import moment from "moment"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const animeName = searchParams.get("anime")

  if (!animeName) {
    return NextResponse.json({ error: "Please provide an anime name (?anime=YourAnimeName)" }, { status: 400 })
  }

  try {
    const searchResponse = await axios.get(`https://api.jikan.moe/v4/anime`, {
      params: { q: animeName, limit: 1 },
    })

    if (!searchResponse.data.data.length) {
      return NextResponse.json({ error: "Anime not found" }, { status: 404 })
    }

    const anime = searchResponse.data.data[0]

    const startDate = anime.aired.from ? moment(anime.aired.from) : null
    const episodes = anime.episodes || 12
    const isOngoing = !anime.aired.to

    let estimatedEndDate = "Unknown"

    if (startDate) {
      if (isOngoing) {
        estimatedEndDate = startDate
          .clone()
          .add(episodes * 7, "days")
          .format("YYYY-MM-DD")
      } else if (anime.aired.to) {
        estimatedEndDate = moment(anime.aired.to).format("YYYY-MM-DD")
      } else {
        // If we don't have an end date, calculate based on episodes
        estimatedEndDate = startDate
          .clone()
          .add(episodes * 7, "days")
          .format("YYYY-MM-DD")
      }
    }

    return NextResponse.json({
      title: anime.title,
      episodes: anime.episodes || "TBA",
      start_date: startDate ? startDate.format("YYYY-MM-DD") : "Unknown",
      estimated_end_date: estimatedEndDate,
    })
  } catch (error) {
    console.error("Error fetching anime data:", error)
    return NextResponse.json({ error: "Failed to fetch anime data" }, { status: 500 })
  }
}

