import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Card, Button } from '@material-ui/core';

const Login = (props) => {
  const {
    authenticate,
    isAuthenticated,
    children,
  } = props;
  const [contractAddress, setContractAddresss] = useState('');
  const handleChange = (e) => {
    setContractAddresss(e.target.value);
  };
  const onAuthenticate = () => {
    authenticate(contractAddress);
  };

  const cardStyle = {
    width: '50%',
    height: '30%',
    margin: 'auto',
    marginTop: '20%',
    padding: '5%',
  };

  return isAuthenticated ? (
    children
  ) : (
    <Card style={cardStyle}>
      <h2>Please provide the contract address</h2>
      <TextField value={contractAddress} onChange={handleChange} style={{ width: '100%', marginBottom: '2%' }} label="Contract Addresss" />
      <Button style={{ float: 'right' }} onClick={onAuthenticate} variant="contained">Submit</Button>
    </Card>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node,
};

Login.defaultProps = {
  isAuthenticated: false,
  children: null,
};

export default Login;
