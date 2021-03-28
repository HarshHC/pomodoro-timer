import { Box, Button, Center, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { SESSION } from '../../Constants/modes';
import RunningTimer from './RunningTimer';
import TimerEditMode from './TimerEditMode';

function Timer(props) {
  const [sessionMins, setSessionMins] = useState(25);
  const [breakMins, setBreakMins] = useState(10);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(SESSION);
  const [isRunning, setIsRunning] = useState(true);
  const [updatedStart, setUpdatedStart] = useState(false);

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

  return (
    <Box
      w="90%"
      minH="40vh"
      rounded="xl"
      boxShadow="dark-lg"
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
            <Button
              {...props.theme.styles.bg}
              onClick={() => {
                setStarted(!started);
                setIsRunning(true);
                setUpdatedStart(!updatedStart);
              }}>
              {started ? 'STOP' : 'START'}
            </Button>
          </Center>

          {started ? (
            <Center>
              <Button
                {...props.theme.styles.bg}
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
