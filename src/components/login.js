import { useState } from 'react';

import { TextField, Card, Button } from '@material-ui/core';

const Login = (props) => {
  const [contractAddress, setContractAddresss] = useState('');
  const handleChange = (e) => {
    setContractAddresss(e.target.value);
  };
  const authenticate = () => {
    props.authenticate(contractAddress)
  }

  return props.isAuthenticated ? (
    props.children
  ) : (
    <Card style={{ width: '50%', height: '30%', margin: 'auto', marginTop: '20%', padding: '5%' }}>
      <h2>Please provide the contract address</h2>
      <TextField value={contractAddress} onChange={handleChange} style={{ width: '100%', marginBottom: '2%' }} label="Contract Addresss" />
      <Button style={{ float: 'right' }} onClick={authenticate} variant="contained">Submit</Button>
    </Card>
  );
};

export default Login;