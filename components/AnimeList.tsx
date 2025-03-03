"use client"

import { useEffect, useState } from "react"
import { getAnimeList } from "@/app/actions"
import { supabase } from "@/lib/supabase"

// Define Anime Type
type Anime = {
  id: number
  title: string
  episodes: number
  start_date: string
  estimated_end_date: string
}

export default function AnimeList() {
  const [animeList, setAnimeList] = useState<Anime[]>([]) // 💡 Now typed correctly

  useEffect(() => {
    const fetchAnime = async () => {
      const initialAnime: Anime[] = await getAnimeList() // 💡 Ensure correct structure
      setAnimeList(initialAnime)
    }

    fetchAnime()

    // Subscribe to new anime insertions
    const subscription = supabase
      .channel("anime-insert-channel")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "tracked_anime" }, (payload) => {
        setAnimeList((prev) => [payload.new as Anime, ...prev]) // 💡 Ensure type casting
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription) // Cleanup
    }
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-purple-700 dark:text-purple-300">
        Currently Tracked Anime
      </h2>
      {animeList.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No anime currently tracked.</p>
      ) : (
        <ul className="space-y-2">
          {animeList.map((anime) => (
            <li key={anime.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <span className="font-medium text-purple-600 dark:text-purple-300">{anime.title}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({anime.episodes} episodes)</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
