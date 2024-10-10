import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

const SearchBar = () => {
  return (
    <Form inline="true" className="ml-auto">
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    </Form>
  );
};

export default SearchBar;
