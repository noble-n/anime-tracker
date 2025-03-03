"use server"

import { revalidatePath } from "next/cache"
type Anime = {
  id: number
  title: string
  episodes: number
  start_date: string
  estimated_end_date: string
}
const animeList: Anime[] = [] 

// export async function addAnime(name: string, email: string) {
//   animeList.push({ name, email })
//   // In a real application, you would save this to a database
//   revalidatePath("/")
// }

export async function getAnimeList() {
  // In a real application, you would fetch this from a database
  return animeList
}

// Placeholder function for sending email notifications
export async function sendNotification(email: string, animeName: string) {
  console.log(`Sending notification to ${email} for anime: ${animeName}`)
  // Implement actual email sending logic here
}

