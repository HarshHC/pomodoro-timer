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
  Box,
  Flex
} from '@chakra-ui/react';
import {
  openCustomerDashboard,
  processPayment
} from '../../Constants/paymentUtils';
import {
  getUserData,
  getUserDataWithPriceID
} from '../../Constants/firebaseUtils';

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

  const recieveUserDataForCustomerPortal = data => {
    setUserData(data);
    openCustomerDashboard(data.custID);
  };

  const recieveUserDataForPaymentSession = data => {
    setUserData(data);
    processPayment(props.currentUser, props.priceID, data.custID);
  };

  const calculateDays = endDate => {
    const currentTime = Math.floor(Date.now() / 1000);
    const difference = endDate - currentTime;

    const daysDifference = Math.floor(difference / 60 / 60 / 24);
    return daysDifference;
  };

  const calculateHours = endDate => {
    const currentTime = Math.floor(Date.now() / 1000);
    const difference = endDate - currentTime;

    const hoursDiff = Math.floor((difference / 60 / 60) % 24);
    return hoursDiff;
  };

  useEffect(() => {
    if (props.currentUser && props.isPremium && props.isOpen) {
      getUserData(props.currentUser, recieveUserData);
    }
  }, [props.currentUser, props.isPremium, props.isOpen]);
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
                <Flex flexDirection="row" my="4">
                  <Button
                    m="2"
                    value="1"
                    onClick={() => {
                      getUserDataWithPriceID(
                        props.currentUser,
                        recieveUserDataForPaymentSession,
                        'price_1If783Cis0IADyYOpyOyp5Hn'
                      );
                    }}>
                    Monthly ~ €1
                  </Button>
                  <Button
                    m="2"
                    value="2"
                    onClick={() => {
                      getUserDataWithPriceID(
                        props.currentUser,
                        recieveUserDataForPaymentSession,
                        'price_1If7AkCis0IADyYOvgdg8lHH'
                      );
                    }}>
                    6 Months ~ €5{' '}
                  </Button>
                  <Button
                    m="2"
                    value="3"
                    onClick={() => {
                      getUserDataWithPriceID(
                        props.currentUser,
                        recieveUserDataForPaymentSession,
                        'price_1If7COCis0IADyYOQlHgwn9i'
                      );
                    }}>
                    1 Year ~ €8
                  </Button>
                </Flex>
              </Stack>
            </RadioGroup>
          ) : (
            <Text fontWeight="bold" mb="1rem" fontSize="lg">
              You have {calculateDays(userData.endDate)} days and
              {` ${calculateHours(userData.endDate)}`} hours left as a premium
              member
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          {props.isPremium && props.isUserSignedIn() ? (
            <Button
              variant="ghost"
              onClick={() => {
                if (props.isUserSignedIn() && props.isPremium) {
                  if (props.isPremium) {
                    getUserData(
                      props.currentUser,
                      recieveUserDataForCustomerPortal
                    );
                  }
                } else {
                  displayToast();
                }
              }}>
              {props.isPremium && props.isUserSignedIn() ? 'Dashboard' : 'Buy'}
            </Button>
          ) : (
            ''
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PremiumPopUp;
