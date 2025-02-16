async function getSearchResults(query) {
  const clientId = process.env.JAMENDO_CLIENT_ID;
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=jsonpretty&limit=10&search=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return { results: [] }; // Return an empty array if there's an error
  }
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const tracks = await getSearchResults(query);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.results.map((track) => (
          <div key={track.id} className="bg-gray-800 p-4 rounded-lg">
            <img
              src={track.image}
              alt={track.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{track.name}</h2>
            <p className="text-gray-400">{track.artist_name}</p>
            <audio controls className="w-full mt-4">
              <source src={track.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}
