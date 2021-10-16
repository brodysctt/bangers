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
      <Text
        sx={{
          fontSize: 60,
          color: "white",
          textAlign: "center",
          fontFamily: "Poppins",
        }}
      >
        🤘 Bangers Only 🤘
      </Text>

      <Text sx={{ color: "white", textAlign: "center" }}>
        Get started by logging in
      </Text>
      <Image
        sx={{
          alignSelf: "center",
          width: "100px",
          height: "100px",
          marginTop: "20px",
          ":hover": {
            height: "110px",
            width: "110px",
            cursor: "pointer",
            marginTop: "10px",
          },
        }}
        src="/spotify-logo.png"
        alt="Spotify Logo"
        onClick={() => Router.push("/login")}
      />
    </Box>
  );
}
