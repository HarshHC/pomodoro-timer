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
  Flex,
  Spinner
} from '@chakra-ui/react';
import {
  openCustomerDashboard,
  processPayment
} from '../../Constants/paymentUtils';
import {
  getUserData,
  getUserDataWithPriceID
} from '../../Constants/firebaseUtils';
import { calculateDays, calculateHours } from '../../Constants/utils';

function PremiumPopUp(props) {
  const [value, setValue] = useState('1');
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setUserData(data);
    processPayment(props.currentUser, data.priceID, data.custID);
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
                <Text margin="2px">Background Images</Text>
                <Text margin="2px"> Custom Background Images</Text>
                <Text margin="2px">Different Colour Themes</Text>
                <Text margin="2px">All future features ...</Text>
              </Box>
              <Text>Select Plan</Text>
              <Stack>
                {isLoading ? (
                  <Flex m="2" alignItems="center" justifyContent="center">
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                      m="2"
                    />
                    Loading...
                  </Flex>
                ) : (
                  <Flex flexDirection="row" my="4">
                    <Button
                      m="2"
                      value="1"
                      onClick={() => {
                        if (props.isUserSignedIn()) {
                          getUserDataWithPriceID(
                            props.currentUser,
                            recieveUserDataForPaymentSession,
                            'price_1If783Cis0IADyYOpyOyp5Hn'
                          );
                        } else {
                          displayToast();
                        }
                      }}>
                      Monthly ~ €1
                    </Button>
                    <Button
                      m="2"
                      value="2"
                      onClick={() => {
                        if (props.isUserSignedIn()) {
                          getUserDataWithPriceID(
                            props.currentUser,
                            recieveUserDataForPaymentSession,
                            'price_1If7AkCis0IADyYOvgdg8lHH'
                          );
                        } else {
                          displayToast();
                        }
                      }}>
                      6 Months ~ €5{' '}
                    </Button>
                    <Button
                      m="2"
                      value="3"
                      onClick={() => {
                        if (props.isUserSignedIn()) {
                          getUserDataWithPriceID(
                            props.currentUser,
                            recieveUserDataForPaymentSession,
                            'price_1If7COCis0IADyYOQlHgwn9i'
                          );
                        } else {
                          displayToast();
                        }
                      }}>
                      1 Year ~ €8
                    </Button>
                  </Flex>
                )}
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
                  getUserData(
                    props.currentUser,
                    recieveUserDataForCustomerPortal
                  );
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
