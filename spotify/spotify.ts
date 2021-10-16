import axios from "axios";

const SPOTIFY_API = "https://api.spotify.com/v1/";
const getHeaders = (accessToken: string) => ({
  headers: {
    Authorization: "Bearer " + accessToken,
  },
});
const debug = () => {
  require("axios-debug-log")({
    response: (debug, response) => debug("Response:", response),
  });
};

const getUserProfile = async (accessToken: string) => {
  debug();
  const res = await axios.get(SPOTIFY_API + "me", getHeaders(accessToken));
  return res.data;
};

const getTopMusic = async (
  accessToken: string,
  {
    type,
    timeRange,
    limit,
  }: {
    type: "artists" | "tracks";
    timeRange?: "long_term" | "medium_term" | "short_term";
    limit?: number;
  }
) => {
  debug();
  const res = await axios.get(
    SPOTIFY_API + `me/top/${type}?limit=${limit || "50"}`,
    getHeaders(accessToken)
  );

  return res.data;
};

export const spotify = {
  getUserProfile,
  getTopMusic,
};
