import React, { useState } from 'react';
import { HStack, Box, useMediaQuery } from '@chakra-ui/react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [isOnmobile] = useMediaQuery('(max-width: 768px)');
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      columnID: 'NEW',
    });

    setInput(' ');
  };

  const taskOption = (
    <HStack spacing="0px" w={isOnmobile ? '70vw' : '32vw'}>
      <Box
        {...props.theme.styles.bgNoHover}
        bg="transparent"
        border="2px"
        borderRadius="4px 0 0 4px"
        p="14px 16px 14px 16px"
        borderColor={props.theme.startColor}
        color={props.theme.colorMode === 'light' ? 'black' : 'white'}
        _placeholder={{
          color: props.theme.colorMode === 'light' ? 'black' : 'white',
          ...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastText
            : {}),
        }}
        w="70%"
        as="input"
        my="10px"
        placeholder="Add Task"
        value={input}
        onChange={handleChange}></Box>
      <Box
        as="button"
        type="submit"
        ml="0px"
        w="30%"
        border="2px"
        py="14px"
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
