import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@lib/firebase/firebase";

const SPOTIFY_API = "https://api.spotify.com/v1";
const getHeaders = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
const debug = () => {
  require("axios-debug-log")({
    response: (debug, response) => debug("Response:", response),
  });
};

const getUserProfile = async (accessToken: string) => {
  const res = await axios.get(`${SPOTIFY_API}/me`, getHeaders(accessToken));
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
    `${SPOTIFY_API}/me/top/${type}?limit=${limit || "50"}`,
    getHeaders(accessToken)
  );

  return res.data;
};

const playTrack = async ({
  accessToken,
  uri,
}: {
  accessToken: string;
  uri: string;
}) => {
  try {
    const res = await axios.put(
      `${SPOTIFY_API}/me/player/play`,
      { uris: [uri] },
      getHeaders(accessToken)
    );
    return res.data;
  } catch (e) {
    return e;
  }
};

const initializePlaylist = async (accessToken, userId) => {
  debug();
  const res = await axios.post(
    `${SPOTIFY_API}/users/${userId}/playlists`,
    {
      name: `${userId}'s Top Tracks'`,
      public: false,
      description: "created by BANGERS to share with the homies",
    },
    getHeaders(accessToken)
  );
  return res.data;
};

const addTracksToPlaylist = async (accessToken, playlistId, uris) => {
  debug();
  const res = await axios.post(
    `${SPOTIFY_API}/playlists/${playlistId}/tracks`,
    { uris },
    getHeaders(accessToken)
  );
  return res.data;
};

const createPlaylist = async (accessToken, userId, trackURIs) => {
  debug();
  try {
    const response: any = await initializePlaylist(accessToken, userId);
    const { id: playlistId } = response;
    await addTracksToPlaylist(accessToken, playlistId, trackURIs);
    return response;
  } catch (e) {
    return e;
  }
};

const getPlaylistTracks = async (accessToken, playlistId) => {
  debug();
  try {
    const res = await axios.get(
      `${SPOTIFY_API}/playlists/${playlistId}/tracks`,
      getHeaders(accessToken)
    );
    return res.data;
  } catch (e) {
    return e;
  }
};

export const spotify = {
  getUserProfile,
  getTopMusic,
  playTrack,
  createPlaylist,
  getPlaylistTracks,
};
