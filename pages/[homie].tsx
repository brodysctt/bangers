import { GetServerSideProps } from "next";
import { Box, Text } from "rebass";
import qs from "qs";

import { spotifyApi } from "@lib/spotify";
import { UserDashboard, Navbar } from "components";
import { firestore } from "@lib/firebase";

const Homies = ({ authProfile, homieProfile, homieTopTunes }) =>
  homieProfile && homieTopTunes ? (
    <UserDashboard profile={homieProfile} topTunes={homieTopTunes}>
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
    spotifyApi.setAccessToken(accessToken);

    const { body: authProfile } = await spotifyApi.getMe();

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
    } = await spotifyApi.getPlaylist(playlistId);

    return {
      props: {
        homieProfile: { id: homieId, playlistId, displayName },
        homieTopTunes: items.map(({ track }) => track),
        authProfile,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Homies;
