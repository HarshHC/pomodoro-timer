import React, { useEffect, useState } from 'react';
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
import firebase from 'firebase/app';
import BackgroundOptions from './BackgroundOptions';
import ColourSelector from './ColourSelector';
import { FONT_FAMILY } from '../../Constants/themes';
import { provider } from '../../Constants/firebase';

function SideDrawer(props) {
  const [btnText, setBtnText] = useState('SIGN IN');
  const [user, setUser] = useState(null);

  const isUserSignedIn = () => {
    return user != null;
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      console.log('checking', currentUser);
    });
  }, []);

  const signInClicked = () => {
    if (isUserSignedIn()) {
      // user is already signed in
      // todo: sign user out
      firebase
        .auth()
        .signOut()
        .then(() => {
          setUser(null);
          setBtnText('Log In');
        })
        .catch(error => {
          // error
          console.log(error);
        });
    } else {
      // user not signed in
      // todo: sign the user in
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const { currentUser } = result;
          setUser(currentUser);
          setBtnText('Log Out');
        })
        .catch(error => {
          // if there is an error
          console.log(`failed! ${error}`);
        });
    }
  };

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
        <Button letiant="outline" mr={3} onClick={props.onClose}>
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
          <Text
            my="2"
            fontWeight="semibold"
            fontSize="2xl"
            letterSpacing="wide"
            fontFamily={FONT_FAMILY}>
            {isUserSignedIn() ? `Hi ${user.displayName.split(' ')[0]}` : ''}
          </Text>
          <Button onClick={signInClicked}>{btnText}</Button>
        </Flex>
      </DrawerBody>

      <DrawerFooter>
        <Button letiant="outline" mr={3} onClick={props.onClose}>
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
