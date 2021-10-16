import Router from "next/router";
import React from "react";
import { Box, Text, Image } from "rebass";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        background: "linear-gradient(#181857 , #0A0A0C 30%)",
        height: "100vh",
        width: "100%",
      }}
    >
      <Text sx={{ fontSize: 60, color: "white", textAlign: "center" }}>
        🤘 Bangers Only 🤘
      </Text>

      <Text sx={{ color: "white", textAlign: "center" }}>
        Get started by logging in
      </Text>
      <Image
        sx={{ alignSelf: "center" }}
        src="/spotify-logo.png"
        alt="Spotify Logo"
        width={"100px"}
        height={"100px"}
        onClick={() => Router.push("/login")}
      />
    </Box>
  );
}
