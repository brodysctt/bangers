import { GetServerSideProps } from "next";
import { spotify, createCookie, getSpotifyTokens } from "@lib/spotify";
// import { useSpotifyPlaybackSDK } from "../hooks/use-spotify-playback-sdk";
import { firestore } from "../lib/firebase/firestore";
import { UserDashboard, Navbar } from "components";

interface IHome {
  authProfile: SpotifyApi.CurrentUsersProfileResponse;
  displayName: string;
  topTunes: SpotifyApi.TrackObjectFull[];
}

const Home = ({ authProfile, displayName, topTunes }: IHome) => {
  // useSpotifyPlaybackSDK();
  return (
    <UserDashboard {...{ displayName, topTunes }}>
      <Navbar profile={authProfile} />
    </UserDashboard>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const spotifyParams = {
    spotifyAuthCode: context.query.code,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URL: process.env.SPOTIFY_REDIRECT_URL,
  };

  try {
    const tokens = await getSpotifyTokens(spotifyParams);
    spotify.setAccessToken(tokens.accessToken);
    const { body: authProfile } = await spotify.getMe();
    const { id, display_name: displayName } = authProfile;

    await createCookie(tokens, context);

    const userData = await firestore.getUserData(id);

    if (userData) {
      console.log("GETTING EXISTING DATA");
      const {
        body: { items: topTunes },
      } = await spotify.getPlaylistTracks(userData.playlistId);

      return {
        props: {
          authProfile,
          displayName,
          topTunes: topTunes.map(({ track }) => track),
        },
      };
    }

    console.log("WRITING NEW USER DATA");
    await firestore.writeUserData(id, {
      ...(displayName ? { displayName } : {}),
      tokens,
    });

    const {
      body: { items: topTunes },
    } = await spotify.getMyTopTracks();

    const {
      body: { id: playlistId },
    } = await spotify.createPlaylist("bangers", {
      description: "created by BANGERS to share with the homies",
      public: false,
    });

    await spotify.addTracksToPlaylist(
      playlistId,
      topTunes.map(({ uri }) => uri)
    );

    await firestore.updateUserData(id, { playlistId });

    return {
      props: { authProfile, displayName, topTunes },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Home;
