import { GetServerSideProps } from "next";
import { setSpotifyTokens } from "../utils/setSpotifyAccessTokens";
const Home = ({}) => {
  return <div>HOME</div>;
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const spotifyParams = {
    spotifyAuthCode: context.query.code,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URL: process.env.SPOTIFY_REDIRECT_URL,
  };

  await setSpotifyTokens(spotifyParams, context);

  return {
    props: {},
  };
};

export default Home;
