import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { Box, Container, useColorMode } from "@chakra-ui/react";
import Timer from "./components/Timer";

function App() {
  const { colorMode } = useColorMode();
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
        <Header />
        <Timer />
        <Tasks />
      </Container>
    </Box>
  );
}

export default App;
