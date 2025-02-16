import { NextResponse } from "next/server";

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const scope = "user-read-private user-read-email";

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.append("client_id", client_id);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("redirect_uri", redirect_uri);
  authUrl.searchParams.append("scope", scope);

  return NextResponse.redirect(authUrl.toString());
}
