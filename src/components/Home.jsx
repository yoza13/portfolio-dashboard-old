import React, { useContext } from "react";
import Yash from "../Yash.jpg";
import Typewriter from "typewriter-effect";
import { useStyles } from "../useStyles";
import AppContext from "../ApplicationContext";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";

export default function Home() {
  const { isDarkTheme } = useContext(AppContext);
  const classes = useStyles({ isDarkTheme });
  return (
    <Container maxWidth="sm" sx={{ margin: "auto", textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Avatar alt="Yash Oza" src={Yash} className={classes.homePageAvatar} />
      </Box>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Hi, I am
        </Typography>
        <Typography variant="h5" gutterBottom component="div">
          Yash Oza
        </Typography>
      </Stack>
      <Typography variant="h3" gutterBottom component="div">
        What I do ?
      </Typography>
      <Typewriter
        options={{
          strings: [
            "I am a Full Stack Developer",
            "I love learning new technologies",
            "I love web design",
          ],
          autoStart: true,
          loop: true,
          cursor: "<",
        }}
      />
    </Container>
  );
}
