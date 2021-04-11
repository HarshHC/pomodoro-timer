import { React, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Button
} from '@chakra-ui/react';
import { processPayment } from '../../Constants/paymentUtils';

function PremiumPopUp(props) {
  const [value, setValue] = useState('1');
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={props.isOpen}
      onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payment Plans</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!props.isPremium || !props.isUserSignedIn() ? (
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
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => processPayment(props.currentUser, props.isPremium)}>
            {props.isPremium && props.isUserSignedIn() ? 'Dashboard' : 'Buy'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PremiumPopUp;
