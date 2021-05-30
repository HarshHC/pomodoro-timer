import { Flex, Heading, Text, Button, useMediaQuery } from '@chakra-ui/react';
import { FiInstagram } from 'react-icons/fi';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/images/logo512.png';
import { FONT_FAMILY } from '../Constants/themes';

function Footer({ theme }) {
  const history = useHistory();
  const [isOnmobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Flex
      p="4"
      minH="10vh"
      w="100%"
      flexWrap="wrap"
      bg={theme.startColor}
      justify={isOnmobile ? 'center' : 'space-between'}>
      <Flex
        my="2"
        alignItems="center"
        cursor="pointer"
        onClick={() => {
          history.push('/');
        }}>
        <img width="30px" height="30px" src={logo} alt="logo" />
        <Heading
          color={theme.color.textColor}
          size="md"
          ml="2"
          letterSpacing="normal"
          fontFamily={FONT_FAMILY}
          {...(theme.bgImage ? theme.styles.imageModeContrastText : {})}>
          Study Pomodoro
        </Heading>
      </Flex>
      <Flex
        color={theme.color.textColor}
        justify="center"
        align="center"
        fontWeight="semibold"
        flexWrap="wrap">
        <Button
          m="2"
          leftIcon={<FiInstagram fontSize="xl" />}
          color={theme.color.textColor}
          bg="transparent"
          borderColor={theme.color.textColor}
          variant="outline"
          _hover={{ opacity: '70%' }}
          onClick={() => {
            window.open('https://www.instagram.com/studypomodoro/', '_blank');
          }}>
          studypomodoro
        </Button>

        <Text
          m="2"
          cursor="pointer"
          _hover={{ opacity: '70%' }}
          onClick={() => {
            history.push('/about');
          }}>
          About
        </Text>
        <Text
          m="2"
          cursor="pointer"
          _hover={{ opacity: '70%' }}
          onClick={() => {
            window.open(
              'https://portal.termshub.io/studypomodoro.com/',
              '_blank'
            );
            // history.push('/privacy');
          }}>
          Privacy &amp; Terms
        </Text>
        <Text
          m="2"
          cursor="pointer"
          _hover={{ opacity: '70%' }}
          onClick={() => {
            history.push('/contact');
          }}>
          Contact
        </Text>
      </Flex>
    </Flex>
  );
}

export default Footer;
