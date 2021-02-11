import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { Box, Container, useColorMode } from "@chakra-ui/react";
import Timer from "./components/Timer";
import "focus-visible/dist/focus-visible";
import { useEffect, useState } from "react";
import { generateGradientTheme, PURPLE } from "./Constants/themes";

function App() {
  const { colorMode } = useColorMode();
  const [timerTheme, setTimerTheme] = useState(
    generateGradientTheme(PURPLE),
    colorMode
  );

  useEffect(() => {
    setTimerTheme(generateGradientTheme(timerTheme.color, colorMode));
  }, [colorMode, timerTheme.color]);

  return (
    <Box
      width="100vw"
      height="maxContent"
      minH="100vh"
      bgGradient={
        colorMode === "light"
          ? "linear(to-bl, #F5F5F5, #FFFFFF)"
          : "linear(to-bl, #121417, #2B2E36)"
      }>
      <Container centerContent>
        <Header theme={timerTheme} setTheme={setTimerTheme} />
        <Timer theme={timerTheme} />
        <Tasks theme={timerTheme} />
      </Container>
    </Box>
  );
}

export default App;
