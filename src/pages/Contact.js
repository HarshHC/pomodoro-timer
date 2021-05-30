import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Nav from '../components/Nav';

function Contact({ theme }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex flexDir="column" minH="90vh" align="center" justify="center">
      <Nav theme={theme} page="Contact" />
      <iframe
        title="Contact Form"
        allowTransparency="true"
        allowFullScreen="true"
        allow="geolocation; microphone; camera"
        src="https://my.forms.app/form/60b37001b42c292b4c68585d"
        frameBorder={0}
        style={{
          width: '1px',
          minWidth: '100%',
          height: '500px',
          border: 'none'
        }}
      />
    </Flex>
  );
}

export default Contact;
