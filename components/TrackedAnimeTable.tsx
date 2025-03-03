import { Trash2 } from "lucide-react"

type AnimeEntry = {
  id: number
  title: string
  episodes: number | string
  start_date: string
  estimated_end_date: string
}

type TrackedAnimeTableProps = {
  animeList: AnimeEntry[]
  onDelete: (id: number) => void
}

export default function TrackedAnimeTable({ animeList, onDelete }: TrackedAnimeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="custom-table">
        <thead>
          <tr>
            <th className="w-[30%]">Anime Name</th>
            <th>Episodes</th>
            <th>Start Date</th>
            <th>Estimated End Date</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {animeList.map((anime) => (
            <tr key={anime.id}>
              <td className="font-medium">{anime.title}</td>
              <td>{anime.episodes}</td>
              <td>{anime.start_date}</td>
              <td>{anime.estimated_end_date}</td>
              <td className="text-right">
                <button
                  onClick={() => onDelete(anime.id)}
                  className="text-secondary hover:text-secondary/80 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

