import { GetServerSideProps } from "next";
import { Box, Text } from "rebass";
import qs from "qs";

import { spotify } from "@lib/spotify";
import { UserDashboard, Navbar } from "components";
import { firestore } from "@lib/firebase";

interface IHomies {
  authProfile: SpotifyApi.CurrentUsersProfileResponse;
  displayName: string;
  topTunes: SpotifyApi.TrackObjectFull[];
}

const Homies = ({ authProfile, displayName, topTunes }: IHomies) =>
  displayName && topTunes ? (
    <UserDashboard {...{ displayName, topTunes }}>
      <Navbar profile={authProfile} />
    </UserDashboard>
  ) : (
    <Box
      sx={{
        paddingX: "10%",
        paddingTop: "120px",
        height: "100vh",
        background: "linear-gradient(#181857 , #0A0A0C 30%)",
      }}
    >
      <Text sx={{ color: "white" }}>Homie not found!!</Text>
    </Box>
  );

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookie = context.req.cookies;
    const accessToken = qs.parse(cookie).spotifyAccess as string;
    spotify.setAccessToken(accessToken);

    const { body: authProfile } = await spotify.getMe();

    const {
      params: { homie: homieId },
    } = context;

    const homie = await firestore.getUserData(homieId as string);

    if (!homie) {
      return { props: {} };
    }

    const { playlistId, displayName } = homie;
    const {
      body: {
        tracks: { items },
      },
    } = await spotify.getPlaylist(playlistId);

    return {
      props: {
        authProfile,
        displayName,
        topTunes: items.map(({ track }) => track),
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Homies;
