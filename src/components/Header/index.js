import React, { useState } from 'react';
import {
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import { BsFillPersonFill } from 'react-icons/bs';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IoMdBrush } from 'react-icons/io';
import SideDrawer from './SideDrawer';
import { FONT_FAMILY } from '../../Constants/themes';

function Header(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [mode, setMode] = useState('THEME');

  const btnRef = React.useRef();

  return (
    <>
      <Flex justify="center" align="center" p="5" m="4">
        <Heading
          color={colorMode === 'light' ? 'black' : 'white'}
          size="2xl"
          letterSpacing="wide"
          fontFamily={FONT_FAMILY}
          {...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastText
            : {})}
          mx="20px">
          Study Pomodoro
        </Heading>
        <IconButton
          color={colorMode === 'light' ? 'black' : 'white'}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          {...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastBg
            : {})}
          onClick={toggleColorMode}
          mx="10px"
          fill="red"
        />
        <IconButton
          color={colorMode === 'light' ? 'black' : 'white'}
          icon={<IoMdBrush />}
          {...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastBg
            : {})}
          onClick={() => {
            setMode('THEME');
            onOpen();
          }}
          mx="10px"
          fill="red"
        />
        <IconButton
          color={colorMode === 'light' ? 'black' : 'white'}
          icon={<BsFillPersonFill />}
          {...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastBg
            : {})}
          onClick={() => {
            setMode('SETTINGS');
            onOpen();
          }}
          mx="10px"
          fill="red"
        />
      </Flex>
      <SideDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        theme={props.theme}
        setTheme={props.setTheme}
        mode={mode}
        isPremium={props.isPremium}
      />
    </>
  );
}

export default Header;
