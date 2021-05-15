import React, { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdBrush } from 'react-icons/io';
import SideDrawer from './SideDrawer';
import logo from '../../assets/images/logo512.png';
import { FONT_FAMILY } from '../../Constants/themes';

function Header(props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [mode, setMode] = useState('THEME');

  const btnRef = React.useRef();

  return (
    <>
      <Flex justify="center" align="center" p="5" m="4">
        <Flex mr="8" alignItems="center">
          <Image w="40px" h="40px" src={logo} mr="2" />
          <Heading
            color={colorMode === 'light' ? 'black' : 'white'}
            size="lg"
            letterSpacing="normal"
            fontFamily={FONT_FAMILY}
            {...(props.theme.bgImage
              ? props.theme.styles.imageModeContrastText
              : {})}>
            Study Pomodoro
          </Heading>
        </Flex>

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
          mx="10px"
          p="4">
          Themes
        </Button>
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
