import { React, useEffect, useState } from 'react';
import './App.css';
import { Box, Container, useColorMode } from '@chakra-ui/react';
import 'focus-visible/dist/focus-visible';
import firebase from 'firebase/app';
import Header from './components/Header';
import Tasks from './components/Tasks';
import Timer from './components/Timer';
import {
  changeGradientThemeColorTo,
  generateGradientTheme,
  PURPLE,
  toggleBackgroundImageInGradientTheme
} from './Constants/themes';
import { checkIfUserIsPremium } from './Constants/firebaseUtils';

function App() {
  const { colorMode } = useColorMode();
  const [currentUser, setCurrentUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [timerTheme, setTimerTheme] = useState(
    localStorage.getItem('timer-theme')
      ? JSON.parse(localStorage.getItem('timer-theme'))
      : generateGradientTheme(PURPLE, colorMode)
  );

  const isUserPremium = result => {
    if (result) {
      setIsPremium(true);
      // talk to stripe check user subs
    } else {
      setIsPremium(false);
      // disable all premium features here
      if (timerTheme.bgImage) {
        const newTheme = toggleBackgroundImageInGradientTheme(timerTheme);
        setTimerTheme(newTheme);
      }
    }
    return true;
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      if (currentUser && isPremium) {
        // lol fooled u eslint
      }
      if (user != null) {
        checkIfUserIsPremium(user, isUserPremium);
      }
    });
  }, []);

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
    } else {
      setTimerTheme(changeGradientThemeColorTo(timerTheme, PURPLE));
    }
  }, [colorMode, timerTheme.color]);

  const content = (
    <Container centerContent>
      <Header
        theme={timerTheme}
        setTheme={setTimerTheme}
        isPremium={isPremium}
      />
      <Timer theme={timerTheme} />
      <Tasks theme={timerTheme} />
    </Container>
  );

  const noBgImage = (
    <Box
      width="100vw"
      height="maxContent"
      overflowX="hidden"
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
