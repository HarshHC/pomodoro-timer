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
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react';
import firebase from 'firebase/app';
import { MdAttachMoney } from 'react-icons/md';
import { StarIcon } from '@chakra-ui/icons';
import BackgroundOptions from './BackgroundOptions';
import ColourSelector from './ColourSelector';
import { FONT_FAMILY } from '../../Constants/themes';
import { provider } from '../../Constants/firebase';
import { checkIfUserAlreadyExists } from '../../Constants/firebaseUtils';
import { processPayment } from '../../Constants/paymentUtils';

function SideDrawer(props) {
  const [btnText, setBtnText] = useState('SIGN IN');
  const [currentUser, setCurrentUser] = useState(null);
  const [isOnmobile] = useMediaQuery('(max-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('1');

  const isUserSignedIn = () => {
    return currentUser != null;
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user != null) {
        setBtnText('Log Out');
      }
    });
  }, []);

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
          letterSpacing="wide"
          fontFamily={FONT_FAMILY}
          fontSize="2xl"
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
              fontSize="2xl"
              letterSpacing="wide"
              fontFamily={FONT_FAMILY}>
              {isUserSignedIn()
                ? `Hi ${currentUser.displayName.split(' ')[0]}`
                : 'Hi User'}
            </Text>
            <Button
              onClick={onOpen}
              bg={props.isPremium && isUserSignedIn() ? '#FFD700' : 'blue'}
              textColor={
                props.isPremium && isUserSignedIn() ? 'black' : 'white'
              }
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
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Plans</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!props.isPremium || !isUserSignedIn() ? (
              <RadioGroup
                onChange={setValue}
                value={value}
                fontWeight="bold"
                mb="1rem"
                fontSize="lg">
                <Stack direction="column">
                  <Radio value="1">1 Month ~ €1</Radio>
                  <Radio value="2">6 Months ~ €5</Radio>
                  <Radio value="3">1 Year ~ €8</Radio>
                </Stack>
              </RadioGroup>
            ) : (
              <Text fontWeight="bold" mb="1rem" fontSize="lg">
                You have 30 days left as a premium member
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => processPayment(currentUser, props.isPremium)}>
              {props.isPremium && isUserSignedIn() ? 'Dashboard' : 'Buy'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SideDrawer;
