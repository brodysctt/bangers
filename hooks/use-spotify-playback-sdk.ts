import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useSpotifyPlaybackSDK = () => {
  const [SpotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player>();

  useEffect(() => {
    const getPlayer = async () => {
      await waitForSpotifyWebPlaybackSDKToLoad();
      const accessToken = Cookies.get("spotifyAccess");
      const player = new Spotify.Player({
        name: "Bangers Only",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });
      setSpotifyPlayer(player);
    };
    getPlayer();
  }, []);

  return { SpotifyPlayer };
};

const waitForSpotifyWebPlaybackSDKToLoad = async (): Promise<
  typeof Spotify
> => {
  return new Promise((resolve) => {
    if (window.Spotify) {
      resolve(window.Spotify);
    } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve(window.Spotify);
      };
    }
  });
};
