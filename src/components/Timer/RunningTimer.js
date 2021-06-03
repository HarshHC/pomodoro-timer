/* eslint-disable no-param-reassign */
import { Container, Flex, Text, useColorMode } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import {
  createWorkerFactory,
  useWorker,
  terminate
} from '@shopify/react-web-worker';
import { SESSION, BREAK } from '../../Constants/modes';
import { createNotification } from '../../Constants/utils';
import { reset } from './timerWorker';

const createWorker = createWorkerFactory(() => import('./timerWorker'));

function RunningTimer(props) {
  // useStates defined here
  const { colorMode } = useColorMode();
  const [seconds, setSeconds] = useState(0);
  const [mins, setMins] = useState(
    props.mode === SESSION ? props.sessionMins : props.breakMins
  );
  const timeProps = localStorage.getItem('timerProps');
  const [updatedTime, setUpdatedTime] = useState(
    // eslint-disable-next-line no-nested-ternary
    timeProps
      ? JSON.parse(localStorage.getItem('timerProps')).updatedTime
      : props.mode === SESSION
      ? props.sessionMins
      : props.breakMins
  );

  // variables defined here
  const worker = useWorker(createWorker);
  const time = useRef(null);

  //  useEffect to store data in local storage
  useEffect(() => {
    const timerProps = JSON.parse(localStorage.getItem('timerProps'));
    if (timerProps) {
      timerProps.mode = props.mode;
      timerProps.updatedTime = updatedTime;
      timerProps.updatedStart = props.updatedStart;
      window.localStorage.setItem('timerProps', JSON.stringify(timerProps));
    }
  }, [props.mode, updatedTime, props.updatedStart]);
  //  useEffect to reload data from local storage and store in our variables
  useEffect(() => {
    let timerProps = JSON.parse(localStorage.getItem('timerProps'));
    if (timerProps) {
      setUpdatedTime(timerProps.updatedTime);
      props.setMode(timerProps.mode);
      props.setUpdatedStart(timerProps.updatedStart);
      setMins(Math.floor(timerProps.updatedTime / 60));
      setSeconds(timerProps.updatedTime % 60);
    } else {
      timerProps = {};

      timerProps.started = true;
      timerProps.isRunning = false;
      timerProps.mode = props.mode;
      timerProps.updatedTime = updatedTime;
      timerProps.updatedStart = true;
      window.localStorage.setItem('timerProps', JSON.stringify(timerProps));
    }
  }, []);
  useEffect(() => {
    if (!props.updatedStart) {
      props.setMode(SESSION);
      setSeconds(0);
      setMins(props.mode === SESSION ? props.sessionMins : props.breakMins);
      props.setMode(SESSION);
    }
  }, [props.updatedStart]);
  // javascript functions defined here
  // function to handle the countdown. will be called every second.
  const countdownHandler = () => {
    setUpdatedTime(time.current);
    if (time.current < 0) {
      setMins(props.mode === !SESSION ? props.sessionMins : props.breakMins);
      setUpdatedTime(
        props.mode === !SESSION ? props.sessionMins * 60 : props.breakMins * 60
      );
      time.current =
        props.mode === !SESSION ? props.sessionMins * 60 : props.breakMins * 60;

      // play the sound
      const audio = new Audio(
        `https://firebasestorage.googleapis.com/v0/b/study-pomodoro.appspot.com/o/goes-without-saying-608.mp3?alt=media&token=8fd892c7-aea0-4bb1-ab2a-046823dabb74`
      );
      audio.play();
      // send a notification
      createNotification({
        title: `${props.mode.toUpperCase()}'s Over! `,
        message: `${
          props.mode === SESSION ? BREAK.toUpperCase() : SESSION.toUpperCase()
        } time!`,
        icon:
          'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/hourglass-64.png',
        clickCallback() {
          // function executed on clicking notification
        }
      });

      // change the mode state
      props.setMode(props.mode === SESSION ? BREAK : SESSION);
    }
  };

  // function that takes anammout of minutes as a parameter and starts the timer
  // const startTimer = startingMins => {
  // };

  function updateUI(currentTime) {
    if (currentTime >= 0) {
      setSeconds(currentTime % 60);
      setMins(Math.floor(currentTime / 60));
    }
    time.current = currentTime;
    countdownHandler();
  }

  const runWorker = async startMins => {
    time.current = startMins * 60;

    const result = await worker.backgroundTimer(time.current, updateUI);
    return result;
  };

  // useEffects defined here
  useEffect(() => {
    if (!props.isRunning) {
      reset();
    }

    let interval;
    if (props.isRunning) {
      // when start is clicked state is changed
      if (mins === props.sessionMins || mins === props.breakMins) {
        // checking if timer is starting again or just starting
        if (props.mode === SESSION) {
          // check the mode
          interval = runWorker(props.sessionMins);
        } else if (props.mode === BREAK) {
          // check the mode
          interval = runWorker(props.breakMins);
        }
      } else if (props.oldMode !== props.mode) {
        //  if timer is running and we switch mode
        props.setOldMode(props.mode);
        if (props.mode === SESSION) {
          // check the mode
          interval = runWorker(props.sessionMins);
        } else if (props.mode === BREAK) {
          // check the mode
          interval = runWorker(props.breakMins);
        }
      } else {
        //  if timer is running and we pause, when unpaused we pass updated time.current back into startTimer

        interval = runWorker(updatedTime / 60);
      }
    }
    return () => {
      terminate(worker);
      clearInterval(interval);
    };
  }, [props.mode, props.isRunning]);

  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <Helmet defer={false}>
        <title>
          {seconds < 10 ? `${mins}:0${seconds} ` : `${mins}:${seconds} `} -
          Pomodoro Timer
        </title>
      </Helmet>
      <Container flex="1" h="100%" bg="transparent" centerContent>
        <Text
          m="5"
          fontSize="3xl"
          letterSpacing="normal"
          {...props.theme.styles.bgNoHover}
          textShadow={
            props.theme.colorMode === 'dark' && props.theme.bgImage
              ? `1px 1px 50px black, -1px -1px 40px ${props.theme.color.baseColor}`
              : `1px 1px 50px ${props.theme.color.baseColor}, -1px -1px 40px ${props.theme.color.baseColor}, -4px 4px 30px black${props.theme.color.baseColor}`
          }
          bgClip="text"
          fontWeight="extrabold">
          - {props.mode.toUpperCase()} -
        </Text>

        <Text
          color={colorMode === 'light' ? 'black' : 'white'}
          {...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastText
            : {})}
          letterSpacing="normal"
          fontSize="100px">
          {seconds < 10 ? `${mins}:0${seconds}` : `${mins}:${seconds}`}
        </Text>
      </Container>
    </Flex>
  );
}

export default RunningTimer;
