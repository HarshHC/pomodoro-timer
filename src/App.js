import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { Box, Container, useColorMode } from "@chakra-ui/react";
import Timer from "./components/Timer";
import "focus-visible/dist/focus-visible";
import { useState } from "react";
import { generateGradientTheme, PURPLE } from "./Constants/themes";

function App() {
  const { colorMode } = useColorMode();
  const [timerTheme, setTimerTheme] = useState(
    localStorage.getItem("timer-theme")
      ? JSON.parse(localStorage.getItem("timer-theme"))
      : generateGradientTheme(PURPLE, colorMode)
  );

  const content = (
    <Container centerContent>
      <Header theme={timerTheme} setTheme={setTimerTheme} />
      <Timer theme={timerTheme} />
      <Tasks theme={timerTheme} />
    </Container>
  );

  const noBgImage = (
    <Box
      width="100vw"
      height="maxContent"
      minH="100vh"
      bgGradient={
        colorMode === "light"
          ? "linear(to-bl, #F5F5F5, #FFFFFF)"
          : "linear(to-bl, #121417, #2B2E36)"
      }>
      {content}
    </Box>
  );
  console.log(timerTheme.bgInfo);
  const withBgImage = (
    <Box
      width="100vw"
      height="maxContent"
      minH="100vh"
      bgImage={"url(" + timerTheme.bgInfo.random_url + ")"}
      bgAttachment="fixed"
      bgSize="cover"
      bgRepeat="no-repeat">
      {content}
    </Box>
  );

  return timerTheme.bgImage ? withBgImage : noBgImage;
}

export default App;
