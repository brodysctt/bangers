import { GetServerSideProps } from "next";
import { Box, Text } from "rebass";
import theme from "../styles/theme";

import { TrackList } from "../components";

import { db } from "@lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { spotify } from "@lib/spotify";

const Homies = ({ homieId, homieTracks }) => {
  return (
    <Box
      sx={{
        paddingX: "10%",
        paddingTop: "120px",
        background: "linear-gradient(#181857 , #0A0A0C 30%)",
      }}
    >
      <Text
        sx={{ ...theme.textStyle.main, fontSize: 40, marginBottom: "40px" }}
      >{`${homieId}'s Top Songs`}</Text>
      <TrackList songs={homieTracks} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  try {
    const docRefMe = doc(db, "users", "beroyjenkins");
    const docSnapMe = await getDoc(docRefMe);
    const {
      tokens: { accessToken },
    } = docSnapMe.data();

    const docRefHomie = doc(db, "users", "bigpuss");
    const docSnapHomie = await getDoc(docRefHomie);
    const { id: homieId, playlistId } = docSnapHomie.data();

    console.log(`access token for getting homie tracks: ${accessToken}`);
    const homiePlaylistTracks = await spotify.getPlaylistTracks(
      accessToken,
      playlistId
    );
    console.dir(homiePlaylistTracks);
    const homieTracks = homiePlaylistTracks.items.map((item) => item.track);
    return {
      props: { homieId, homieTracks },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Homies;
