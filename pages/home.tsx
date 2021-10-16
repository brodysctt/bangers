import { GetServerSideProps } from "next";
import React from "react";
import Navbar from "../components/Navbar";
import {
  createCookie,
  getSpotifyTokens,
} from "../spotify/setSpotifyAccessTokens";
import { spotify } from "../spotify/spotify";
import { Box } from "rebass";
const Home = ({ profile }) => {
  console.log(profile);
  return (
    <>
      <Navbar profile={profile} />
      <Box sx={{ paddingX: "10%" }}>
        <h1>{`Welcome ${profile.display_name}`}</h1>
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
    await createCookie(tokens, context);
    return {
      props: { profile },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Home;
