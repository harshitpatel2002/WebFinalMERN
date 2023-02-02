import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/register.css';
import '../css/style.css';
import logo from '../utlis/images/logo.jpeg';

import { registerUser } from '../services/auth';

let defUser = {
  email: '',
  fName: '',
  lName: '',
  password: '',
};

const Register = () => {
  const [user, setUser] = useState(defUser);
  const handleInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitRegister = async () => {
    let response = await registerUser(user);
    console.log(response);
  };
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'flex-end'}
        marginTop={20}
      >
        <VStack
          align={'flex-start'}
          boxSize="30%"
          padding="25px"
          spacing={'1rem'}
        >
          <HStack>
            <Image src={logo} alt="Logo" boxSize={'3em'} borderRadius="50px" />
            <Heading textAlign={'center'}>Register</Heading>
          </HStack>
          <FormControl>
            <HStack marginTop={'10px'}>
              <FormLabel width={'30%'}>Email</FormLabel>
              <Input
                type="email"
                focusBorderColor="#6b46c1"
                value={user.email}
                onChange={handleInput}
                name="email"
              />
            </HStack>
            <HStack marginTop={'10px'}>
              <FormLabel width={'30%'}>First name</FormLabel>
              <Input
                type="text"
                focusBorderColor="#6b46c1"
                value={user.fName}
                onChange={handleInput}
                name="fName"
              />
            </HStack>
            <HStack marginTop={'10px'}>
              <FormLabel width={'30%'}>Last Name</FormLabel>
              <Input
                type="text"
                focusBorderColor="#6b46c1"
                value={user.lName}
                onChange={handleInput}
                name="lName"
              />
            </HStack>
            <HStack marginTop={'10px'}>
              <FormLabel width={'30%'}>Password</FormLabel>
              <Input
                type="password"
                focusBorderColor="#6b46c1"
                value={user.password}
                onChange={handleInput}
                name="password"
              />
            </HStack>
            <Button
              marginTop={'20px'}
              colorScheme="purple"
              onClick={submitRegister}
            >
              Register
            </Button>
          </FormControl>
          <HStack>
            <Text fontSize="sm">
              Already have an account.{' '}
              <Link to="/login">
                <Button variant="link" color={'#6b46c1'}>
                  Login Here
                </Button>
              </Link>
            </Text>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default Register;
