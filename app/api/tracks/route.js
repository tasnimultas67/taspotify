export async function GET() {
  const clientId = process.env.JAMENDO_CLIENT_ID;
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=jsonpretty&limit=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch tracks");
    }
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}
