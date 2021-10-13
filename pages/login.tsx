import { useEffect } from "react";
import qs from "qs";

const Login = () => {
  const spotifyLogin =
    "https://accounts.spotify.com/authorize?" +
    qs.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: "user-read-email user-top-read",
      redirect_uri: "https://localhost:3000/home",
    });

  useEffect(() => {
    window.location.href = spotifyLogin;
  });

  return null;
};

export default Login;
