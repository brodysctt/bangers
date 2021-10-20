import { GetServerSideProps } from "next";
import { Box, Text } from "rebass";
import theme from "../styles/theme";
import { Navbar, TrackList } from "../components";
import { spotify, createCookie, getSpotifyTokens } from "@lib/spotify";
import { useSpotifyPlaybackSDK } from "../hooks/use-spotify-playback-sdk";
import { db } from "@lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const Home = ({ profile, topTunes }) => {
  const { SpotifyPlayer } = useSpotifyPlaybackSDK();
  console.log("PLAYER", SpotifyPlayer);
  return (
    <>
      <Navbar profile={profile} topTunes={topTunes} />
      <Box
        sx={{
          paddingX: "10%",
          paddingTop: "120px",
          background: "linear-gradient(#181857 , #0A0A0C 30%)",
        }}
      >
        <Text
          sx={{ ...theme.textStyle.main, fontSize: 40, marginBottom: "40px" }}
        >{`${profile.display_name}'s Top Songs`}</Text>
        <TrackList songs={topTunes.items} />
      </Box>
    </>
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
    const topTunes = await spotify.getTopMusic(tokens.accessToken, {
      type: "tracks",
    });

    await createCookie(tokens, context);

    const { id } = profile;
    await setDoc(doc(db, "users", id), {
      id,
    });
    return {
      props: { profile, topTunes },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Home;
