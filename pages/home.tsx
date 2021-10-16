import { GetServerSideProps } from "next";
import React from "react";
import Navbar from "../components/Navbar";
import {
  createCookie,
  getSpotifyTokens,
} from "../spotify/setSpotifyAccessTokens";
import { spotify } from "../spotify/spotify";
import { Box, Text } from "rebass";
const Home = ({ profile, topTunes }) => {
  // console.log(profile);
  console.log(topTunes);
  return (
    <>
      <Navbar profile={profile} />
      <Box
        sx={{
          paddingX: "10%",
          marginTop: "65px",
          paddingTop: "30px",
          background: "linear-gradient(#181857 , #0A0A0C 30%)",
        }}
      >
        <Text
          sx={{ color: "#DCDCDF" }}
        >{`Welcome ${profile.display_name}`}</Text>
        {topTunes.items.map((song) => (
          <Text
            sx={{ color: "#DCDCDF", marginBottom: "10px" }}
            key={song.id}
          >{`${song.name} : ${song.artists[0].name}`}</Text>
        ))}
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
    const profile = await spotify.getUserProfile(tokens.accessToken);
    const topTunes = await spotify.getTopMusic(tokens.accessToken, {
      type: "tracks",
    });
    await createCookie(tokens, context);
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
