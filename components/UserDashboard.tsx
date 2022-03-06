import React from "react";
import theme from "styles/theme";
import { Box, Text } from "rebass";
import { TrackList } from "components";

interface IUserDashboard {
  profile: any;
  topTunes: any[];
}

export const UserDashboard: React.FC<IUserDashboard> = ({
  profile,
  topTunes,
  children,
}) => {
  // const { display_name } = profile
  const { displayName } = profile;
  return (
    <>
      {children}
      <Box
        sx={{
          paddingX: "10%",
          paddingTop: "120px",
          background: "linear-gradient(#181857 , #0A0A0C 30%)",
        }}
      >
        <Text
          sx={{ ...theme.textStyle.main, fontSize: 40, marginBottom: "40px" }}
        >{`${displayName}'s Top Songs`}</Text>
        <TrackList songs={topTunes} />
      </Box>
    </>
  );
};
