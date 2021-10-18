import "../styles/globals.css";
import Script from "next/script";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://sdk.scdn.co/spotify-player.js" />
    </>
  );
};

export default MyApp;
