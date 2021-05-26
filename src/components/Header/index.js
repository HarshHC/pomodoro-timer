import React, { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdBrush } from 'react-icons/io';
import loadable from '@loadable/component';
import logo from '../../assets/images/logo512.png';
import { FONT_FAMILY } from '../../Constants/themes';
// import SideDrawer from './SideDrawer';

function Header(props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOnmobile] = useMediaQuery('(max-width: 768px)');

  const [mode, setMode] = useState('THEME');

  const btnRef = React.useRef();

  const SideDrawer = loadable(() => import('./SideDrawer'));

  return (
    <>
      <Flex justify="center" align="center" p="5" m="4">
        <Flex mr="8" alignItems="center">
          <img width="40px" height="40px" src={logo} alt="logo" />
          <Heading
            color={colorMode === 'light' ? 'black' : 'white'}
            size="lg"
            ml="2"
            letterSpacing="normal"
            fontFamily={FONT_FAMILY}
            {...(props.theme.bgImage
              ? props.theme.styles.imageModeContrastText
              : {})}>
            Study Pomodoro
          </Heading>
        </Flex>

        {isOnmobile ? (
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
            ml="12"
            fill="red"
          />
        ) : (
          <Button
            leftIcon={<IoMdBrush />}
            color={colorMode === 'light' ? 'black' : 'white'}
            {...(props.theme.bgImage
              ? props.theme.styles.imageModeContrastBg
              : {})}
            onClick={() => {
              setMode('THEME');
              onOpen();
            }}
            fontFamily={FONT_FAMILY}
            fontSize="sm"
            mx="10px">
            Themes
          </Button>
        )}

        {props.currenUser != null ? (
          <div>hi</div>
        ) : (
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
        )}
      </Flex>
      <SideDrawer
        fallback={<div>Loading...</div>}
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
