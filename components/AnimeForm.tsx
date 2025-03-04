"use client"

import type React from "react"
import { supabase } from "@/lib/supabase" // Import Supabase client
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { toast } from "@/hooks/use-toast";

type AnimeData = {
  id: number
  title: string
  episodes: number | string
  start_date: string
  estimated_end_date: string
  error?: string
}

type AnimeFormProps = {
  onAnimeAdded: (anime: AnimeData) => void
}

export default function AnimeForm({ onAnimeAdded }: AnimeFormProps) {
  const [animeName, setAnimeName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLoading) return // Prevent duplicate submissions

    setIsLoading(true)
    setError("")

    try {
      // Fetch anime details
      const response = await axios.get(`/api/anime-end-date?anime=${encodeURIComponent(animeName)}`)
      const fetchedData: AnimeData = response.data
      console.log("fetchData :", fetchedData)
      // Check if anime has already ended

      // Handle anime already ended (410 status)
      if (response.status === 410) {
        toast({
          title: "Anime Not Available",
          description: "This anime has already ended and cannot be tracked.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }


      // Get current user's ID from Supabase auth
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to track anime.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Insert anime into Supabase
      const { data, error: insertError } = await supabase
        .from("tracked_anime")
        .insert([
          {
            title: fetchedData.title,
            episodes: fetchedData.episodes,
            start_date: fetchedData.start_date,
            estimated_end_date: fetchedData.estimated_end_date,
            user_id: user.id,
            email: user.email,
          }
        ])
        .select("*") // Ensure the inserted row is returned

      if (insertError) {
        throw insertError
      }

      // Only update UI if data exists
      if (data && data.length > 0) {
        onAnimeAdded(data[0]) // Update UI

        // Success toast 🎉
        toast({
          title: "Success",
          description: `${fetchedData.title} has been added to your list.`,
          variant: "default",
        })
      }

      // Clear input field
      setAnimeName("")
    } catch (error) {
      console.log("Error tracking anime:", error)
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: "Error",
          description: error.response.status === 410 
            ? "This anime has already ended." 
            : "Failed to fetch anime details.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred.",
          variant: "destructive",
        })
      }
      console.error("Error tracking anime:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80">
      <CardHeader>
        <CardTitle className="text-center">Track New Anime</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter anime name"
              value={animeName}
              onChange={(e) => setAnimeName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Tracking..." : "Track Anime"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
