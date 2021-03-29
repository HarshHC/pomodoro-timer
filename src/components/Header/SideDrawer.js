import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text
} from '@chakra-ui/react';
// eslint-disable-next-line no-unused-vars
import * as firebaseui from 'firebaseui';
import BackgroundOptions from './BackgroundOptions';
import ColourSelector from './ColourSelector';
import { FONT_FAMILY } from '../../Constants/themes';
import { ui, firebase } from '../../Constants/firebase';

const signInClicked = () => {
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
    // Other config options...
  });
};

function SideDrawer(props) {
  const themeDrawer = (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>
        <Text
          ml="3"
          letterSpacing="wide"
          fontFamily={FONT_FAMILY}
          fontSize="2xl"
          fontWeight="800">
          Customize Theme
        </Text>
      </DrawerHeader>

      <DrawerBody>
        <Flex flexDir="column">
          <ColourSelector theme={props.theme} setTheme={props.setTheme} />
          <BackgroundOptions theme={props.theme} setTheme={props.setTheme} />
        </Flex>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={props.onClose}>
          Close
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );

  const settingsDrawer = (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>
        <Text
          ml="3"
          letterSpacing="wide"
          fontFamily={FONT_FAMILY}
          fontSize="2xl"
          fontWeight="800">
          SETTINGS
        </Text>
      </DrawerHeader>

      <DrawerBody>
        <Flex flexDir="column">
          <Button onClick={signInClicked}>SIGN IN</Button>
        </Flex>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={props.onClose}>
          Close
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      finalFocusRef={props.btnRef}>
      <DrawerOverlay>
        {props.mode === 'THEME' ? themeDrawer : settingsDrawer}
      </DrawerOverlay>
    </Drawer>
  );
}

export default SideDrawer;
