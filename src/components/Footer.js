import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { FiInstagram } from 'react-icons/fi';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/images/logo512.png';
import { FONT_FAMILY } from '../Constants/themes';

function Footer({ theme }) {
  const history = useHistory();
  return (
    <Flex
      mt="4"
      p="4"
      minH="10vh"
      w="100%"
      flexWrap="wrap"
      bg={theme.startColor}
      justify="space-between">
      <Flex
        my="2"
        alignItems="center"
        cursor="pointer"
        onClick={() => {
          history.push('/');
        }}>
        <img width="30px" height="30px" src={logo} alt="logo" />
        <Heading
          color="white"
          size="md"
          ml="2"
          letterSpacing="normal"
          fontFamily={FONT_FAMILY}
          {...(theme.bgImage ? theme.styles.imageModeContrastText : {})}>
          Study Pomodoro
        </Heading>
      </Flex>
      <Flex color={theme.color.textColor} align="center" fontWeight="semibold">
        <Button
          mr="1"
          leftIcon={<FiInstagram fontSize="xl" />}
          color={theme.color.textColor}
          onClick={() => {
            window.open('https://www.instagram.com/studypomodoro/', '_blank');
          }}>
          studypomodoro
        </Button>

        <Text
          mx="2"
          _hover={{ opacity: '50%' }}
          onClick={() => {
            history.push('/description');
          }}>
          Description
        </Text>
        <Text
          mx="2"
          _hover={{ opacity: '50%' }}
          onClick={() => {
            history.push('/privacy');
          }}>
          Privacy Policy
        </Text>
        <Text
          mx="2"
          _hover={{ opacity: '50%' }}
          onClick={() => {
            history.push('/terms');
          }}>
          T&amp;C
        </Text>
      </Flex>
    </Flex>
  );
}

export default Footer;
