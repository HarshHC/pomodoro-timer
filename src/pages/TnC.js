import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Nav from '../components/Nav';

function TnC({ theme }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.open('https://portal.termshub.io/studypomodoro.com/', '_blank');
  }, []);

  return (
    <Flex flexDir="column" h="90vh" align="center" justify="center">
      <Nav theme={theme} page="Privacy Policy &amp; Terms of Service" />
      Privacy Policy and Terms of Service can be found
      <a href="https://portal.termshub.io/studypomodoro.com/">here</a>
    </Flex>
  );
}

export default TnC;
