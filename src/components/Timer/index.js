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
  useDisclosure
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Notification from 'react-web-notification';
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

  const { onOpen, onClose, isOpen } = useDisclosure();
  // const displayNotification = () => {
  //     // eslint-disable-next-line no-unused-vars
  //     // eslint-disable-next-line no-new
  //     // const not = new Notification('Hi there!');
  //     // Notification.requestPermission().then(function() {
  //     //   console.log(not);
  //     // });
  //   }
  // };
  // useEffect(() => {
  //   displayNotification();
  // }, []);

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
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              closeOnBlur>
              <PopoverTrigger>
                <Button
                  {...props.theme.styles.bg}
                  fontSize="2xl"
                  letterSpacing="wider"
                  p="6">
                  {started ? 'STOP' : 'START'}
                </Button>
              </PopoverTrigger>
              <PopoverContent color="white">
                <PopoverHeader
                  pt={4}
                  fontSize="2xl"
                  letterSpacing="wide"
                  fontWeight="bold"
                  border="0">
                  Notification Request
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody fontSize="lg" letterSpacing="wide">
                  Would you like to receive Notifications when the session ends?
                  <Notification title="hi" />
                </PopoverBody>
                <PopoverFooter
                  border="0"
                  d="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pb={4}>
                  <Flex
                    w="100%"
                    justify="flex-end"
                    size="lg"
                    fontFamily="Roboto">
                    <Button bg="green.500" fontSize="sm" onClick={startClicked}>
                      YES
                    </Button>
                    <Button
                      ml="2"
                      bg="red.500"
                      fontSize="sm"
                      ref={initialFocusRef}>
                      NO THANKS
                    </Button>
                  </Flex>
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
