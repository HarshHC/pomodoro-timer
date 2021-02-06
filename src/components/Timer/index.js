import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Container, Editable, EditableInput, EditablePreview, Flex, Spacer, Square, Text } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react'

function Timer() {
    const [sessionMins, setSessionMins] = useState(25);
    const [breakMins, setBreakMins] = useState(10);
    const [sessionSeconds, setSessionSeconds] = useState(10);
    const [breakSeconds, setBreakSeconds] = useState(10);
    const [start, setStart] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if(start) {
            const id = window.setInterval(() => {
                setSessionMins(sessionMins => sessionMins-1);
            }, 1000)
            setIntervalId(id);
        } else {
            window.clearInterval(intervalId);
        }
    }, [start]);


    return (
        <Box w="60vw" h="50vh" bg="blue.500" rounded="lg" boxShadow="md" centerContent>
            <Flex height="80%" color="white" justifyContent="center" alignItems="center">
                <Container h="100%" flex="1" bg="transparent" centerContent>

                    <Flex height="100%" direction="column" align="center" justify="center">
                        <Spacer />
                        <Text my="10px" color="white" fontWeight="500"> 
                            SESSION (mins)
                        </Text>
                        <Spacer />
                        <Square 
                            size="40px" 
                            bg="orange" 
                            rounded="md" 
                            fontSize="lg" 
                            as={Button} 
                            _hover={{ bg: "#f09b00" }}
                            onClick={() => setSessionMins(sessionMins+1)}>
                            <AddIcon />
                        </Square>
                        <Spacer />
                        <Square size="100px" bg="transparent" rounded="md" fontSize="6xl" textAlign="center">
                            <Editable defaultValue={sessionMins} className="noSelect" value={sessionMins}>
                                <EditablePreview className="noSelect"/>
                                <EditableInput className="noSelect" />
                            </Editable>
                        </Square>
                        <Spacer />
                        <Square 
                            size="40px"
                            bg="orange"
                            rounded="md"
                            fontSize="lg"
                            as={Button}
                            _hover={{ bg: "#f09b00" }}
                            onClick={() => setSessionMins(parseInt(sessionMins-1))}>
                            <MinusIcon />
                        </Square>
                        <Spacer />

                    </Flex>
                
                </Container>
                <Container  h="100%" flex="1" bg="transparent" centerContent>
                
            <Flex height="100%" direction="column" align="center" justify="center">
                    
                    <Spacer />
                    <Text my="10px" color="white" fontWeight="500"> 
                        BREAK (mins)
                    </Text>
                    <Spacer />
                    <Square 
                        size="40px" 
                        bg="orange" 
                        rounded="md" 
                        fontSize="lg" 
                        as={Button} 
                        _hover={{ bg: "#f09b00" }}
                        onClick={() => setBreakMins(parseInt(breakMins) + 1)}>
                        <AddIcon />
                    </Square>
                    <Spacer />
                    <Square size="100px" bg="transparent" rounded="md" fontSize="6xl" textAlign="center">
                        <Editable 
                            defaultValue={breakMins} 
                            className="noSelect" 
                            value={breakMins} 
                            onChange={(target) => setBreakMins(target.value)}>
                            <EditablePreview className="noSelect"/>
                            <EditableInput className="noSelect" />
                        </Editable>
                    </Square>
                    <Spacer />
                    <Square 
                        size="40px" 
                        bg="orange" 
                        rounded="md" 
                        fontSize="lg" 
                        as={Button} 
                        _hover={{ bg: "#f09b00" }}
                        onClick={() => setBreakMins(breakMins-1)}>
                        <MinusIcon />
                    </Square>
                    <Spacer />

                </Flex>

            </Container>
            </Flex>
            
            <Center m="10px">
                <Button 
                _hover={{ bg: "#ebedf0" }} 
                onClick={() => setStart(!start)}
                >
                    
                START
                </Button>
            </Center>
        </Box>
    )
}

export default Timer;
