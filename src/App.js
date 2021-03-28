import { React, useEffect, useState } from 'react';
import './App.css';
import { Box, Container, useColorMode } from '@chakra-ui/react';
import 'focus-visible/dist/focus-visible';
import Header from './components/Header';
import Tasks from './components/Tasks';
import Timer from './components/Timer';
import { generateGradientTheme, PURPLE } from './Constants/themes';

function App() {
  const { colorMode } = useColorMode();
  const [timerTheme, setTimerTheme] = useState(
    localStorage.getItem('timer-theme')
      ? JSON.parse(localStorage.getItem('timer-theme'))
      : generateGradientTheme(PURPLE, colorMode)
  );

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem('timer-theme'));
    if (storedTheme) {
      setTimerTheme(
        generateGradientTheme(timerTheme.color, colorMode, {
          image: storedTheme.bgImage,
          random: storedTheme.bgInfo.random,
          custom_url: storedTheme.bgInfo.custom_url
        })
      );
    }
  }, [colorMode, timerTheme.color]);

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
      overflow="hidden"
      minH="100vh"
      bgGradient={
        colorMode === 'light'
          ? 'linear(to-bl, #F5F5F5, #FFFFFF)'
          : 'linear(to-bl, #121417, #2B2E36)'
      }>
      {content}
    </Box>
  );

  const withBgRandomImage = (
    <Box
      width="100vw"
      minH="100vh"
      _before={{
        bgImage: `url('${timerTheme.bgInfo.random_url}')`,
        bgAttachment: 'fixed',
        bgSize: 'cover',
        bgRepeat: 'no-repeat',
        height: '100%',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        willChange: 'transform',
        content: "''",
        zIndex: -1
      }}>
      {content}
    </Box>
  );

  const withBgCustomImage = (
    <Box
      width="100vw"
      height="maxContent"
      minH="100vh"
      _before={{
        bgImage: `url('${timerTheme.bgInfo.custom_url}')`,
        bgAttachment: 'fixed',
        bgSize: 'cover',
        bgRepeat: 'no-repeat',
        height: '100%',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        willChange: 'transform',
        content: "''",
        zIndex: -1
      }}>
      {content}
    </Box>
  );
  let displayedTimer = <div />;

  if (timerTheme.bgImage) {
    if (timerTheme.bgInfo.random) {
      displayedTimer = withBgRandomImage;
    } else {
      displayedTimer = withBgCustomImage;
    }
  } else {
    displayedTimer = noBgImage;
  }
  return displayedTimer;
}

export default App;
