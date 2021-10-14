import { useEffect } from "react";
import qs from "qs";

const Login = ({ spotifyLogin }) => {
  useEffect(() => {
    window.location.href = spotifyLogin;
  });
  return null;
};

export async function getStaticProps(context) {
  return {
    props: {
      spotifyLogin:
        "https://accounts.spotify.com/authorize?" +
        qs.stringify({
          client_id: process.env.SPOTIFY_CLIENT_ID,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
          scope: "user-read-email user-top-read",
          response_type: "code",
        }),
    },
  };
}

export default Login;
