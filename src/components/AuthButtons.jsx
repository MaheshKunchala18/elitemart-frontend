import React from 'react';
import { Button } from 'react-bootstrap';

const AuthButtons = () => {
  return (
    <>
      <Button variant="outline-primary" href="/login" className="mr-2">
        Login
      </Button>
      <Button variant="primary" href="/signup">
        Signup
      </Button>
    </>
  );
};

export default AuthButtons;
