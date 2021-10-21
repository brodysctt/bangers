import { GetServerSideProps } from "next";
import { spotify, createCookie, getSpotifyTokens } from "@lib/spotify";
import { useSpotifyPlaybackSDK } from "../hooks/use-spotify-playback-sdk";
import { firestore } from "../lib/firebase/firestore";
import { UserDashboard } from "components/UserDashboard";

const Home = ({ profile, topTunes }) => {
  useSpotifyPlaybackSDK();
  return (
    <UserDashboard
      authProfile={profile}
      profile={profile}
      topTunes={topTunes}
    />
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const spotifyParams = {
    spotifyAuthCode: context.query.code,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URL: process.env.SPOTIFY_REDIRECT_URL,
  };

  try {
    const tokens = await getSpotifyTokens(spotifyParams);
    const profile: any = await spotify.getUserProfile(tokens.accessToken);
    const { id, display_name: displayName } = profile;
    await createCookie(tokens, context);

    const userData = await firestore.getUserData(profile.id);

    if (userData) {
      console.log("GETTING EXISTING DATA");
      const topTunes = await spotify.getPlaylistTracks(
        tokens.accessToken,
        userData.playlistId
      );
      return {
        props: {
          profile,
          topTunes: topTunes.items.map((item) => item.track),
        },
      };
    }

    console.log("WRITING NEW USER DATA");
    await firestore.writeUserData(id, {
      displayName,
      tokens,
    });

    const topTunes: any = await spotify.getTopMusic(tokens.accessToken, {
      type: "tracks",
    });

    const playlist = await spotify.createPlaylist(
      tokens.accessToken,
      profile.id,
      topTunes.items.map((track) => track.uri)
    );
    await firestore.updateUserData(id, { playlistId: playlist.id });

    return {
      props: { profile, topTunes: topTunes.items },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Home;
