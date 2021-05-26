import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/images/logo512.png';
import { FONT_FAMILY } from '../Constants/themes';

function Nav({ theme, page }) {
  const history = useHistory();

  return (
    <Flex w="95%" justify="center" align="center" p="5" m="4" flexDir="column">
      <Flex
        mr="8"
        alignItems="center"
        cursor="pointer"
        onClick={() => {
          history.push('/');
        }}>
        <img width="40px" height="40px" src={logo} alt="logo" />
        <Heading
          color={theme.colorMode === 'light' ? 'black' : 'white'}
          size="lg"
          ml="2"
          letterSpacing="normal"
          fontFamily={FONT_FAMILY}
          {...(theme.bgImage ? theme.styles.imageModeContrastText : {})}>
          Study Pomodoro
        </Heading>
        <Text ml="4" textAlign="right" fontFamily={FONT_FAMILY} fontSize="lg">
          - {page}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Nav;
