import { Navbar, TrackList } from "components";
import React from "react";
import { Box, Text } from "rebass";
import theme from "styles/theme";

interface IUserDashboard {
  profile: any;
  authProfile: any;
  topTunes: any[];
}

export const UserDashboard: React.FC<IUserDashboard> = ({
  profile,
  topTunes,
  authProfile,
}) => {
  const { id } = profile;
  return (
    <>
      <Navbar profile={authProfile} />
      <Box
        sx={{
          paddingX: "10%",
          paddingTop: "120px",
          background: "linear-gradient(#181857 , #0A0A0C 30%)",
        }}
      >
        <Text
          sx={{ ...theme.textStyle.main, fontSize: 40, marginBottom: "40px" }}
        >{`${id}'s Top Songs`}</Text>
        <TrackList songs={topTunes} />
      </Box>
    </>
  );
};
