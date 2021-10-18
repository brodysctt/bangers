import axios from "axios";
import qs from "qs";
import { DateTime } from "luxon";
import cookie from "cookie";

interface SpotifyAccessToken {
  expiresAt: string;
  accessToken: string;
  refreshToken: string;
}

export const getSpotifyTokens = async ({
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  spotifyAuthCode,
}): Promise<SpotifyAccessToken | null> => {
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
    const res = (await axios.post(tokenURL, qs.stringify(data), {
      headers,
    })) as any;
    const tokens: SpotifyAccessToken = {
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
      expiresAt: DateTime.now().plus({ hours: 1 }).toISO(),
    };

    return tokens;
  } catch (e) {
    return null;
  }
};

export const createCookie = ({ accessToken }: SpotifyAccessToken, context) => {
  context.res.setHeader(
    "Set-Cookie",
    cookie.serialize("spotifyAccess", accessToken, {
      // httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 3600,
      sameSite: "strict",
      path: "/",
    })
  );
};
