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
import { SESSION } from '../../Constants/modes';
import { FONT_FAMILY } from '../../Constants/themes';
import {
  isPermissionGranted,
  requestNotificationPermission
} from '../../Constants/utils';
import RunningTimer from './RunningTimer';
import SwitchMode from './SwitchMode';
import TimerEditMode from './TimerEditMode';

function Timer(props) {
  const [sessionMins, setSessionMins] = useState(25);
  const [breakMins, setBreakMins] = useState(10);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(SESSION);
  const [oldMode, setOldMode] = useState(SESSION);
  const [isRunning, setIsRunning] = useState(true);
  const [updatedStart, setUpdatedStart] = useState(false);
  const [
    isNotificationPersmissionGranted,
    setNotificationPermisision
  ] = useState(false);
  const initialFocusRef = React.useRef();

  const { onOpen, onClose, isOpen } = useDisclosure();

  let displayedTimer;

  // useEffect to parse local storage and load started value on refresh
  useEffect(() => {
    const timerProp = JSON.parse(localStorage.getItem('timerProps'));
    if (timerProp) {
      setStarted(timerProp.started);
      setIsRunning(false);
      setMode(timerProp.mode);
      setUpdatedStart(timerProp.updatedStart);
      setBreakMins(timerProp.breakMins ? timerProp.breakMins : 10);
      setSessionMins(timerProp.sessionMins ? timerProp.sessionMins : 25);
    }

    setNotificationPermisision(isPermissionGranted());
  }, []);

  // useEffect to save Mode to local storage
  useEffect(() => {
    const timerProp = JSON.parse(localStorage.getItem('timerProps'));
    if (timerProp) {
      timerProp.started = started;
      timerProp.sessionMins = sessionMins;
      timerProp.breakMins = breakMins;
      window.localStorage.setItem('timerProps', JSON.stringify(timerProp));
    }
  }, [started, breakMins, sessionMins]);

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
        oldMode={oldMode}
        setOldMode={setOldMode}
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
    if (!isPermissionGranted()) {
      requestNotificationPermission();
    }

    onClose();
    setStarted(!started);
    setIsRunning(true);
    setUpdatedStart(!updatedStart);
  };

  const buttonWithPopOver = (
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
          letterSpacing="normal"
          p="6">
          {started ? 'STOP' : 'START'}
        </Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="gray.800">
        <PopoverHeader
          pt={4}
          fontSize="2xl"
          letterSpacing="normal"
          fontWeight="bold"
          border="0">
          Notification Request
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody fontSize="lg" letterSpacing="normal">
          Would you like to receive Notifications when the session ends?
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}>
          <Flex w="100%" justify="flex-end" size="lg" fontFamily="Roboto">
            <Button bg="green.500" fontSize="sm" onClick={startClicked}>
              YES
            </Button>
            <Button
              ml="2"
              bg="red.500"
              fontSize="sm"
              onClick={startClicked}
              ref={initialFocusRef}>
              NO THANKS
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );

  return (
    <Box
      w="90%"
      minH="40vh"
      rounded="xl"
      boxShadow="dark-lg"
      fontFamily={FONT_FAMILY}
      letterSpacing="normal"
      p="2"
      {...(props.theme.bgImage ? props.theme.styles.imageModeContrastBg : {})}>
      <Flex
        minH="40vh"
        h="100%"
        justify="center"
        align="center"
        pos="relative"
        flexDir="column">
        {started ? <SwitchMode mode={mode} setMode={setMode} /> : <div />}

        <Center>{displayedTimer}</Center>
        <Flex mt="2" justify="center" align="center">
          <Center m="20px">
            {isNotificationPersmissionGranted ? (
              <Button
                {...props.theme.styles.bg}
                fontSize="xl"
                letterSpacing="normal"
                w={started ? '100px' : '200px'}
                onClick={startClicked}>
                {started ? 'STOP' : 'START'}
              </Button>
            ) : (
              buttonWithPopOver
            )}
          </Center>

          {started ? (
            <Center>
              <Button
                {...props.theme.styles.bg}
                fontSize="xl"
                letterSpacing="normal"
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
