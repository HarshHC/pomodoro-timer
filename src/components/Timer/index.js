import {
  Box,
  Button,
  Center,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { SESSION } from '../../Constants/modes';
import { FONT_FAMILY } from '../../Constants/themes';
import RunningTimer from './RunningTimer';
import TimerEditMode from './TimerEditMode';

function Timer(props) {
  const [sessionMins, setSessionMins] = useState(25);
  const [breakMins, setBreakMins] = useState(10);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(SESSION);
  const [isRunning, setIsRunning] = useState(true);
  const [updatedStart, setUpdatedStart] = useState(false);
  const initialFocusRef = React.useRef();

  let displayedTimer;

  // useEffect to parse local storage and load started value on refresh
  useEffect(() => {
    const timerProp = JSON.parse(localStorage.getItem('timerProps'));
    if (timerProp) {
      setStarted(timerProp.started);
      setIsRunning(false);
      setMode(timerProp.mode);
      setUpdatedStart(timerProp.updatedStart);
    }
  }, []);

  // useEffect to save Mode to local storage
  useEffect(() => {
    const timerProp = JSON.parse(localStorage.getItem('timerProps'));
    if (timerProp) {
      timerProp.started = started;
      window.localStorage.setItem('timerProps', JSON.stringify(timerProp));
    }
  }, [started]);

  if (started) {
    displayedTimer = (
      <RunningTimer
        theme={props.theme}
        mode={mode}
        sessionMins={sessionMins}
        setMode={setMode}
        started={started}
        setStarted={setStarted}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        breakMins={breakMins}
        setUpdatedStart={setUpdatedStart}
        updatedStart={updatedStart}
      />
    );
  } else {
    displayedTimer = (
      <TimerEditMode
        theme={props.theme}
        sessionMins={sessionMins}
        setSessionMins={setSessionMins}
        maxSessionMins={60}
        breakMins={breakMins}
        setBreakMins={setBreakMins}
        maxBreakMins={60}
      />
    );
  }

  const startClicked = () => {
    Notification.requestPermission();

    setStarted(!started);
    setIsRunning(true);
    setUpdatedStart(!updatedStart);
  };

  return (
    <Box
      w="90%"
      minH="40vh"
      rounded="xl"
      boxShadow="dark-lg"
      fontFamily={FONT_FAMILY}
      letterSpacing="wide"
      p="2"
      {...(props.theme.bgImage ? props.theme.styles.imageModeContrastBg : {})}>
      <Flex
        minH="40vh"
        h="100%"
        justify="center"
        align="center"
        flexDir="column">
        <Center>{displayedTimer}</Center>
        <Flex m="4" justify="center" align="center">
          <Center m="20px">
            <Popover
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}>
              <PopoverTrigger>
                <Button
                  {...props.theme.styles.bg}
                  fontSize="2xl"
                  letterSpacing="wider"
                  p="6">
                  {started ? 'STOP' : 'START'}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                color="white"
                bg="blue.800"
                borderColor="blue.800">
                <PopoverHeader pt={4} fontWeight="bold" border="0">
                  Manage Your Channels
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore.
                </PopoverBody>
                <PopoverFooter
                  border="0"
                  d="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pb={4}>
                  <Box fontSize="sm">Step 2 of 4</Box>
                  <ButtonGroup size="sm">
                    <Button colorScheme="green" onClick={startClicked}>
                      START
                    </Button>
                    <Button colorScheme="blue" ref={initialFocusRef}>
                      Next
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Center>

          {started ? (
            <Center>
              <Button
                {...props.theme.styles.bg}
                fontSize="2xl"
                letterSpacing="wider"
                p="6"
                onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? 'PAUSE' : 'RESUME'}
              </Button>
            </Center>
          ) : (
            <div />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Timer;
