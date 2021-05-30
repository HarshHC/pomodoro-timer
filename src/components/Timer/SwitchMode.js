import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Button,
  IconButton
} from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BREAK, SESSION } from '../../Constants/modes';

function SwitchMode({ mode, setMode }) {
  const initRef = React.useRef();

  return (
    <Popover closeOnBlur={false} placement="bottom" initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton
              pos="absolute"
              top="0"
              right="0"
              m="4"
              icon={<ChevronDownIcon />}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent w="200px">
              <Button
                colorScheme="blue"
                onClick={() => {
                  setMode(mode === SESSION ? BREAK : SESSION);
                  onClose();
                }}
                ref={initRef}>
                Switch to {mode === SESSION ? BREAK : SESSION}
              </Button>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}

export default SwitchMode;
