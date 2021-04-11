import { React, useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Stack,
  Text,
  Button,
  useToast,
  Box
} from '@chakra-ui/react';
import { processPayment } from '../../Constants/paymentUtils';
import { getUserData } from '../../Constants/firebaseUtils';

function PremiumPopUp(props) {
  const [value, setValue] = useState('1');
  const [userData, setUserData] = useState({});
  const toast = useToast();

  const recieveUserData = data => {
    setUserData(data);
  };
  const displayToast = () => {
    toast({
      title: 'Login required',
      description: 'You need to be logged in to buy premium',
      status: 'error',
      duration: 9000,
      isClosable: true
    });
  };

  const calculateDays = endDate => {
    const currentTime = Date.now();
    let difference = endDate - currentTime;
    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;
    return difference;
  };

  useEffect(() => {
    if (props.currentUser) {
      getUserData(props.currentUser, recieveUserData);
    }
  }, [props.currentUser]);
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={props.isOpen}
      onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Premium Plans</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!props.isPremium || !props.isUserSignedIn() ? (
            <RadioGroup
              onChange={setValue}
              value={value}
              fontWeight="bold"
              mb="1rem"
              fontSize="lg">
              <Box direction="inline" margin="20px">
                <Text margin="2px">BackGround Images</Text>
                <Text margin="2px"> Custom BackGround Images</Text>
                <Text margin="2px">Diffent Colour Thems</Text>
                <Text margin="2px">
                  All the future features implemented ...
                </Text>
              </Box>
              <Text>Select Plan</Text>
              <Stack>
                <Box flexDirection="inline">
                  <Button value="1">Monthly ~ €1 p/ month</Button>
                  <Button value="2">6 Months ~ €5 p/ month</Button>
                  <Button value="3">1 Year ~ €8 p/ month</Button>
                </Box>
              </Stack>
            </RadioGroup>
          ) : (
            <Text fontWeight="bold" mb="1rem" fontSize="lg">
              You have {calculateDays(userData.endDate)} days left as a premium
              member
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (props.isUserSignedIn()) {
                processPayment(props.currentUser, props.isPremium);
              } else {
                displayToast();
              }
            }}>
            {props.isPremium && props.isUserSignedIn() ? 'Dashboard' : 'Buy'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PremiumPopUp;
