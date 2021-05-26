import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import { FONT_FAMILY } from '../Constants/themes';

function Description({ theme }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Flex flexDir="column" align="center" minH="90vh" mb="4">
      <Nav theme={theme} page="Description" />
      <Flex
        m="4"
        flexDir="column"
        w="80%"
        color={theme.color.textColor}
        fontFamily={FONT_FAMILY}
        bg={theme.startColor}
        py="8"
        px="12"
        borderRadius="lg">
        <Heading fontWeight="800" my="2">
          WHAT IS STUDY POMODORO?
        </Heading>
        <Text>
          Study Pomodoro is a dynamic and customizable Pomodoro timer clock,
          which can be easily configured according to an individual&apos;s need.
          The basic objective of the timer is to help keep focus while studying
          or attempting to do any kind of work by following the 25-5 rule, which
          is 25 minutes of work followed by 5 minutes of break and repeat. This
          app is inspired by Francesco Cirillo&apos;s Pomodoro Technique, which
          is one of the essences of time management in the modern virtual world.
        </Text>
        <Text my="2">
          For a better user experience, any user can easily change the timer
          according to his/her own needs if they wish to use a different
          session/break period.
        </Text>
        <Heading fontWeight="800" my="2">
          FEATURES
        </Heading>
        <Text>
          Study Pomodoro offers a light mode and a dark mode and several themes
          to choose from for the text of the website. It also offers an option
          to add background images which helps the users have a personal touch
          of their own on the website. Additionally, instead of one traditional
          task list setup, we have chosen to integrate a two-layered new task
          and tasks done set-up, with a drag and drop feature to enhance the
          user experience further. We have also enabled google-sign-in so that
          you don&apos;t lose out on your task list anytime soon!
        </Text>
        <Heading fontWeight="800" my="2">
          HOW TO USE STUDY POMODORO?
        </Heading>
        <Box as="ol">
          <Box as="li" my="2">
            Add tasks under the &apos;Tasks&apos; tab and click enter.
          </Box>
          <Box as="li" my="2">
            Set a timer for the session and break by either using the + and -
            option or by clicking on the numbers and typing your required
            selection.
          </Box>
          <Box as="li" my="2">
            As soon as the timer ends, there will be an audio output,
            notification, and the break will automatically start. You may move
            the task from new tasks to tasks done by dragging and dropping the
            task if you have completed the same.
          </Box>
          <Box as="li" my="2">
            To delete a task, use the bin icon on the side of the task. To edit,
            use the edit icon.
          </Box>
          <Box as="li" my="2">
            To change the theme or add background images, click on the theme
            option on the top right and explore the same.
          </Box>
        </Box>
        <Heading fontWeight="800" my="2">
          HOW TO Buy STUDY POMODORO Premium?
        </Heading>
        <Box as="ol">
          <Box as="li" my="2">
            Go to the top-right user icon.
          </Box>
          <Box as="li" my="2">
            Use the google-sign-in to login into Study Pomodoro
          </Box>
          <Box as="li" my="2">
            Click the user icon again, and click on Buy Premium
          </Box>
          <Box as="li" my="2">
            Follow the steps on our partner portal
          </Box>
        </Box>
        <Heading fontWeight="800" my="2">
          What is the Pomodoro Technique ?
        </Heading>
        <Text>
          The Pomodoro Technique is a popular time-management method invented by
          Italian Francesco Cirillo. He wrote, “I discovered that you could
          learn how to improve your effectiveness and be better able to estimate
          how long a task will take to complete by recording how you utilizs
          your time.”
        </Text>
        <Text my="2">
          The technique is popular, perhaps because it’s portable and easy to
          learn.
        </Text>
        <Box as="ul">
          <Box as="li" my="2">
            The technique is popular, perhaps because it’s portable and easy to
            learn.
          </Box>
          <Box as="li" my="2">
            Set a timer for 25-30 minutes, and get to work.
          </Box>
          <Box as="li" my="2">
            When the buzzer sounds, take a two-to-three-minute break.
          </Box>
          <Box as="li" my="2">
            Repeat.
          </Box>
          <Box as="li" my="2">
            Repeat.
          </Box>
          <Box as="li" my="2">
            Record each session with a tick or X in your notebook
          </Box>
        </Box>
        <Text my="2">
          The Pomodoro Technique is useful if you get distracted while working
          on a project or want to understand how long a task takes. It’s ideal
          for many types of work including writing, coding, design, and study.
          The technique also works if you have a lot of repetitive work to get
          through, such as wading through a busy inbox.
        </Text>
      </Flex>
    </Flex>
  );
}

export default Description;
