"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BellRing } from "lucide-react"
import { Clock, CheckCircle } from "lucide-react"
import AnimeForm from "@/components/AnimeForm"
import TrackedAnimeTable from "@/components/TrackedAnimeTable"
import Footer from "@/components/Footer"
import { AuthModal } from "@/components/AuthModal"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"
import { toast } from "@/hooks/use-toast";
import Loader from "@/components/ui/loader";

type AnimeEntry = {
  id: number
  title: string
  episodes: number | string
  start_date: string
  estimated_end_date: string
}

export default function Home() {
  const [animeList, setAnimeList] = useState<AnimeEntry[]>([])
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchAnimeList(session.user.id)
      } else {
        setAnimeList([])
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const fetchAnimeList = async (userId: string) => {
    const { data, error } = await supabase.from("tracked_anime").select("*").eq("user_id", userId)

    if (error) {
      console.error("Error fetching anime list:", error)
    } else {
      setAnimeList(data || [])
    }
  }

  const handleAnimeAdded = async (anime: AnimeEntry) => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }

    setAnimeList((prevList) => [...prevList, anime])

  }

  const handleAnimeDelete = async (id: number) => {
    setDeleteLoading(true);
    await new Promise(r => setTimeout(r, 0)); // Ensures state updates before API call
    const { error } = await supabase.from("tracked_anime").delete().eq("id", id)
    setDeleteLoading(false);
    if (error) {
      console.error("Error deleting anime:", error)
      toast({
        title: "Error",
        description: "Failed to delete anime. Please try again.",
        variant: "destructive", // Makes the toast appear as an error message
        duration: 5000,
      })
    } else {
      setAnimeList((prevList) => prevList.filter((anime) => anime.id !== id))
      toast({
        title: "Success",
        description: "The anime has been successfully removed from your list.",
      })
    }
  }


  const handleSignOut = async () => {
    setLoading(true);
    // await new Promise(r => setTimeout(r, 0)); // Ensures state updates before API call
    await supabase.auth.signOut()
    setAnimeList([])
    setLoading(false);
    toast({
      title: "Success",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <>
      {loading || deleteLoading && <Loader isLoading={loading || deleteLoading} />}
      <div className="min-h-screen bg-dot-pattern">
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="size-8 rounded bg-primary flex items-center justify-center">
                <BellRing className="size-5 text-white" />
              </div>
              <span className="font-semibold text-xl">AnimeTrack</span>
            </div>


            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span>Welcome, {user.email}</span>
                  <Button onClick={handleSignOut} disabled={loading}>
                    {loading ? "Signing Out..." : "Sign Out"}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)}>Sign In</Button>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="container mx-auto px-4 pt-32 pb-40">
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -left-20 -top-14 md:left-32 md:top-24 animate-float">
              <div className="bg-yellow-100 p-6 rounded-lg shadow-lg transform rotate-[-4deg] max-w-[200px]">
                <p className="text-sm font-medium text-gray-700">
                  Track your favorite anime series and never miss a finale
                </p>
                <CheckCircle className="text-primary mt-2 size-5" />
              </div>
            </div>

            <div className="absolute -right-4 top-40 md:right-20 md:top-10 animate-float-delayed">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="text-secondary size-5" />
                  <div>
                    <p className="font-medium">New Episode Alert</p>
                    <p className="text-sm text-gray-500">One Piece - EP 1092</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center max-w-3xl mx-auto pt-10">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                No more
                <span className="block text-gray-400 mt-2">"What was i waiting to binge?"</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Efficiently track your anime watchlist and get notified when series complete.
              </p>
              {!user && (
                <Button
                  size="lg"
                  className="text-lg px-8 bg-primary hover:bg-primary/90"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Get started for free
                </Button>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className="mt-32 max-w-md mx-auto">
            <AnimeForm onAnimeAdded={handleAnimeAdded} />
          </div>

          {/* Tracked Anime Table */}
          <div className="mt-32 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Tracked Anime</h2>
            <TrackedAnimeTable animeList={animeList} onDelete={handleAnimeDelete} />
          </div>
        </main>

        <Footer />

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </>

  )
}

