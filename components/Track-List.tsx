import Cookies from "js-cookie";
import { Box, Image, Text } from "rebass";
import theme from "../styles/theme";

import { spotify } from "@lib/spotify";

export const TrackListItem: React.FC<{ song: any; sx?: any }> = ({
  song,
  sx,
}) => {
  const accessToken = Cookies.get("spotifyAccess");
  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Box
        sx={{
          display: "flex",
          marginRight: "50px",
          width: "500px",
          alignItems: "center",
        }}
      >
        {song?.album?.images[0]?.url && (
          <Image
            src={song.album.images[0].url}
            sx={{ height: "50px", marginRight: "20px" }}
          />
        )}
        <Text
          sx={{
            ...theme.textStyle.main,
            fontSize: 15,
            ":hover": { fontSize: 17, cursor: "pointer" },
          }}
          onClick={async () => {
            const play = await spotify.playTrack({
              accessToken,
              uri: song.uri,
            });
          }}
        >
          {song.name}
        </Text>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text sx={{ ...theme.textStyle.main, fontSize: 15 }}>
          {song.artists.map(
            (song, idx, arr) =>
              `${song.name}${idx !== arr.length - 1 ? " | " : ""}`
          )}
        </Text>
      </Box>
    </Box>
  );
};

export const TrackList = ({ songs }) => {
  return (
    <Box sx={{ width: "1000px", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          borderBottom: `1px solid #404056`,
          marginBottom: "30px",
          width: "755px",
        }}
      >
        <Text
          sx={{
            ...theme.textStyle.main,
            marginRight: "505px",
          }}
        >
          {"Track"}
        </Text>
        <Text sx={{ ...theme.textStyle.main }}>{"Artists"}</Text>
      </Box>
      {songs.map((song) => (
        <TrackListItem
          key={song.id}
          song={song}
          sx={{ marginBottom: "20px" }}
        />
      ))}
    </Box>
  );
};
