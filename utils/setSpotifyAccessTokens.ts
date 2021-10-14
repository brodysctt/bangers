import axios from "axios";
import qs from "qs";
import { DateTime } from "luxon";
import cookie from "cookie";

export const setSpotifyTokens = async (
  {
    SPOTIFY_REDIRECT_URL,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    spotifyAuthCode,
  },
  context
) => {
  const tokenURL = "https://accounts.spotify.com/api/token",
    data = {
      code: spotifyAuthCode,
      redirect_uri: SPOTIFY_REDIRECT_URL,
      grant_type: "authorization_code",
    };
  const authBuffer = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");
  const headers = {
    Authorization: `Basic ${authBuffer}`,
  };

  try {
    const res = await axios.post(tokenURL, qs.stringify(data), {
      headers,
    });
    const tokens = {
      ...(res.data as Record<string, string>),
      expiresAt: DateTime.now().plus({ hours: 1 }),
      expires_in: undefined,
    };

    context.res.setHeader(
      "Set-Cookie",
      cookie.serialize("spotifyTokens", JSON.stringify(tokens), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600,
        sameSite: "strict",
        path: "/",
      })
    );
    return { tokens };
  } catch (e) {
    return {
      tokens: null,
    };
  }
};
