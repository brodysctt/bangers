import axios from "axios";

const SPOTIFY_API = "https://api.spotify.com/v1/";

const getUserProfile = async (accessToken: string) => {
  require("axios-debug-log")({
    response: (debug, response) => debug("Response:", response),
  });
  const res = await axios.get(SPOTIFY_API + "me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  return res.data;
};

export const spotify = {
  getUserProfile,
};
