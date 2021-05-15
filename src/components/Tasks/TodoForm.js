import React, { useState } from 'react';
import { HStack, Box, useMediaQuery } from '@chakra-ui/react';
import { FONT_FAMILY } from '../../Constants/themes';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [isOnmobile] = useMediaQuery('(max-width: 768px)');

  const handleChange = e => {
    setInput(e.target.value);
  };
  // function to check when in the correct mode( update/default) to change the element if needed when pressed the check button in the updateModo
  const handleSubmit = e => {
    e.preventDefault();
    // function to create a random id and get the text input, used to give value to the Todo Item
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      columnID: 'NEW'
    });

    setInput(' ');
  };
  // function: Bon to insert the elements into the TodoList
  const taskOption = (
    <HStack
      spacing="0px"
      w={isOnmobile ? '70vw' : '32vw'}
      fontFamily={FONT_FAMILY}>
      <Box
        {...props.theme.styles.bgNoHover}
        bg="transparent"
        border="2px"
        fontSize="lg"
        letterSpacing="normal"
        borderRadius="4px 0 0 4px"
        p="10px 12px 10px 12px"
        borderColor={props.theme.startColor}
        color={props.theme.colorMode === 'light' ? 'black' : 'white'}
        _placeholder={{
          color: props.theme.colorMode === 'light' ? 'black' : 'white',
          ...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastText
            : {})
        }}
        w="70%"
        as="input"
        my="10px"
        placeholder="Add Task"
        value={input}
        onChange={handleChange}
      />
      <Box
        as="button"
        type="submit"
        ml="0px"
        w="30%"
        border="2px"
        py="12px"
        fontSize="md"
        letterSpacing="normal"
        borderRadius="0 4px 4px 0"
        textAlign="center"
        {...props.theme.styles.bg}
        borderColor={props.theme.startColor}
        borderLeft="0px">
        Add Task
      </Box>
    </HStack>
  );
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {taskOption}
    </form>
  );
}

export default TodoForm;
