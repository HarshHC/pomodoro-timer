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
  Text,
  useColorMode,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import firebase from 'firebase/app';
import { MdAttachMoney } from 'react-icons/md';
import { StarIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import BackgroundOptions from './BackgroundOptions';
import ColourSelector from './ColourSelector';
import { FONT_FAMILY } from '../../Constants/themes';
import { provider } from '../../Constants/firebase';
import {
  checkIfUserAlreadyExists,
  getUserData
} from '../../Constants/firebaseUtils';
import PremiumPopUp from './PremiumPopUp';
import { openCustomerDashboard } from '../../Constants/paymentUtils';
import { calculateDays, calculateHours } from '../../Constants/utils';

function SideDrawer(props) {
  const [btnText, setBtnText] = useState('SIGN IN');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isOnmobile] = useMediaQuery('(max-width: 768px)');
  const { colorMode, toggleColorMode } = useColorMode();

  const isUserSignedIn = () => {
    return currentUser != null;
  };

  useEffect(() => {
    const receiveUserData = data => {
      setUserData(data);
    };

    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user != null) {
        setBtnText('Log Out');
        getUserData(currentUser, receiveUserData);
      }
    });
  }, []);

  const recieveUserDataForCustomerPortal = data => {
    setUserData(data);
    openCustomerDashboard(data.custID);
  };

  function signUserIn() {
    if (isOnmobile) {
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {
          const { user } = result;
          setCurrentUser(user);
          setBtnText('Log Out');
          checkIfUserAlreadyExists(user);
        })
        .catch(error => {
          // if there is an error
          console.log(`failed! ${error}`);
        });
    } else {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const { user } = result;
          setCurrentUser(user);
          setBtnText('Log Out');
          checkIfUserAlreadyExists(user);
        })
        .catch(error => {
          // if there is an error
          console.log(`failed! ${error}`);
        });
    }
  }

  const signInClicked = () => {
    if (isUserSignedIn()) {
      // user is already signed in
      // todo: sign user out
      firebase
        .auth()
        .signOut()
        .then(() => {
          setCurrentUser(null);
          setBtnText('Log In');
        })
        .catch(error => {
          // error
          console.log(error);
        });
    } else {
      // user not signed in
      // todo: sign the user in
      signUserIn();
    }
  };

  const themeDrawer = (
    <DrawerContent>
      <DrawerHeader>
        <Text
          letterSpacing="normal"
          fontFamily={FONT_FAMILY}
          fontSize="xl"
          fontWeight="800">
          Customize Theme
        </Text>
      </DrawerHeader>
      <DrawerCloseButton />

      <Button
        leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        color={colorMode === 'light' ? 'black' : 'white'}
        {...(props.theme.bgImage ? props.theme.styles.imageModeContrastBg : {})}
        onClick={toggleColorMode}
        mx="8"
        p="10px"
        textAlign="left">
        {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
      </Button>

      <DrawerBody>
        <Flex flexDir="column">
          <ColourSelector
            theme={props.theme}
            setTheme={props.setTheme}
            isPremium={props.isPremium}
          />
          <BackgroundOptions
            theme={props.theme}
            setTheme={props.setTheme}
            isPremium={props.isPremium}
          />
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
          letterSpacing="normal"
          fontFamily={FONT_FAMILY}
          fontSize="xl"
          fontWeight="800">
          SETTINGS
        </Text>
      </DrawerHeader>

      <DrawerBody>
        <Flex flexDir="column">
          <Flex flexDir="row" justifyContent="space-between">
            <Text
              my="2"
              fontWeight="semibold"
              fontSize="xl"
              letterSpacing="normal"
              fontFamily={FONT_FAMILY}>
              {isUserSignedIn()
                ? `Hi ${currentUser.displayName.split(' ')[0]}`
                : 'Hi User'}
            </Text>
            <Button
              textColor={
                props.isPremium && isUserSignedIn() ? 'black' : 'white'
              }
              onClick={onOpen}
              {...(props.isPremium && isUserSignedIn()
                ? { bg: '#FFD700' }
                : props.theme.styles.bg)}
              leftIcon={
                props.isPremium && isUserSignedIn() ? (
                  <StarIcon />
                ) : (
                  <MdAttachMoney />
                )
              }>
              {props.isPremium && isUserSignedIn() ? 'Premium' : 'Buy Premium'}
            </Button>
          </Flex>
          <Button onClick={signInClicked}>{btnText}</Button>

          {props.isPremium ? (
            <Flex mt="8" flexDir="column">
              <Text fontWeight="bold" fontSize="lg">
                {userData != null
                  ? `Your premium subscription ends in ${calculateDays(
                      userData.endDate
                    )} days and ${calculateHours(userData.endDate)} hours`
                  : ''}
              </Text>
              <Button
                my="4"
                onClick={() => {
                  if (userData == null) {
                    getUserData(currentUser, recieveUserDataForCustomerPortal);
                  } else {
                    openCustomerDashboard(userData.custID);
                  }
                }}>
                Manage Subscription
              </Button>
            </Flex>
          ) : (
            <div />
          )}
        </Flex>
      </DrawerBody>

      <DrawerFooter>
        <Button letiant="outline" mr={3} onClick={onClose}>
          Close
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="right"
        onClose={props.onClose}
        finalFocusRef={props.btnRef}>
        <DrawerOverlay>
          {props.mode === 'THEME' ? themeDrawer : settingsDrawer}
        </DrawerOverlay>
      </Drawer>
      <PremiumPopUp
        onClose={onClose}
        isOpen={isOpen}
        isUserSignedIn={isUserSignedIn}
        isPremium={props.isPremium}
        currentUser={currentUser}
        theme={props.theme}
      />
    </>
  );
}

export default SideDrawer;
