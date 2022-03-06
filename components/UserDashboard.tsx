import React from "react";
import theme from "styles/theme";
import { Box, Text } from "rebass";
import { TrackList } from "components";

interface IUserDashboard {
  displayName: string;
  topTunes: SpotifyApi.TrackObjectFull[];
}

export const UserDashboard: React.FC<IUserDashboard> = ({
  displayName,
  topTunes,
  children,
}) => (
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
