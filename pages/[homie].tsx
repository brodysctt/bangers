import { GetServerSideProps } from "next";
import { Box, Text } from "rebass";
import qs from "qs";

import { spotify } from "@lib/spotify";
import { UserDashboard } from "components/UserDashboard";
import { firestore } from "@lib/firebase";

const Homies = ({ authProfile, homieProfile, homieTopTunes }) => {
  return homieProfile && homieTopTunes ? (
    <UserDashboard
      authProfile={authProfile}
      profile={homieProfile}
      topTunes={homieTopTunes}
    />
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
    const homieId = context.resolvedUrl.replace("/", "");
    const homie = await firestore.getUserData(homieId);

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
