import React, { useEffect } from 'react';
import Nav from '../components/Nav';

function PrivacyPolicy({ theme }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Nav theme={theme} page="Privacy Policy" />
      hi
    </div>
  );
}

export default PrivacyPolicy;
