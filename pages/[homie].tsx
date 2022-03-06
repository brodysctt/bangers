import { GetServerSideProps } from "next";
import { Box, Text } from "rebass";
import qs from "qs";

import { spotify } from "@lib/spotify";
import { UserDashboard, Navbar } from "components";
import { firestore } from "@lib/firebase";

const Homies = ({ authProfile, homieProfile, homieTopTunes }) => {
  return homieProfile && homieTopTunes ? (
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
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  try {
    const cookie = context.req.cookies;
    const accessToken = qs.parse(cookie).spotifyAccess as string;
    const authProfile: Record<any, any> = await spotify.getUserProfile(
      accessToken
    );
    console.log("here be the context object:");
    console.dir(context);
    const {
      params: { homie: homieId },
    } = context;

    console.log(`here be homieId: ${homieId}`);

    const homie = await firestore.getUserData(homieId as string);

    console.log(`here be result of firestore homie call:`);
    console.dir(homie);

    if (!homie) {
      return { props: {} };
    }

    const { playlistId, displayName } = homie;
    const homiePlaylistTracks = await spotify.getPlaylistTracks(
      accessToken,
      playlistId
    );
    const homieTopTunes = homiePlaylistTracks.items.map((item) => item.track);
    return {
      props: {
        homieProfile: { id: homieId, playlistId, displayName },
        homieTopTunes,
        authProfile: { ...authProfile, displayName: authProfile.display_name },
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Homies;
