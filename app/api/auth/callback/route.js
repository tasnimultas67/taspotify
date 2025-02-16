import { NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    data: querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios(authOptions);
    const { access_token, refresh_token } = response.data;

    // Redirect to the homepage with the access token
    const url = new URL("/", request.url);
    url.searchParams.set("access_token", access_token);
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
