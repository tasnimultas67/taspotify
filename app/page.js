import Search from "../app/components/Search";
import MusicCard from "./components/MusicCard";

async function getTracks() {
  const clientId = process.env.JAMENDO_CLIENT_ID;
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=jsonpretty&limit=12`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch tracks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return { results: [] }; // Return an empty array if there's an error
  }
}

export default async function Home() {
  const tracks = await getTracks();

  return (
    <div className="min-h-screen  text-slate-900 p-8">
      <Search />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {tracks.results.map((track) => (
          <div key={track.id}>
            <MusicCard track={track}></MusicCard>
          </div>
        ))}
      </div>
    </div>
  );
}
