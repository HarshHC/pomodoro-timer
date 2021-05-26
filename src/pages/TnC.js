import React, { useEffect } from 'react';
import Nav from '../components/Nav';

function TnC({ theme }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Nav theme={theme} page="Terms &amp; Conditions" />
      hi
    </div>
  );
}

export default TnC;
