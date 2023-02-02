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
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import '../css/style.css';
import logo from '../utlis/images/logo.jpeg';

// Importing the api call services
import { authUsingToken, userLogin } from '../services/auth';

const Login = props => {
  const [email, setEmail] = useState('hsp2810@gmail.com');
  const [password, setPassword] = useState('afafq');
  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const submitLogin = async () => {
    let userLoginCred = {
      email: email,
      password: password,
    };
    let response = await userLogin(userLoginCred);

    if (response !== null && response.status === 200) {
      window.alert(response.data.message);
      props.setIsLogin(true);
      navigate('/home');
    } else if (response !== null && response.response.status === 400) {
      window.alert(response.response.data.error);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const response = await authUsingToken('login');

    if (!response) {
      navigate('/login');
    } else {
      props.setIsLogin(true);
      navigate('/home');
    }
  };

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'flex-end'}
        marginTop={20}
      >
        <VStack align={'flex-start'} boxSize="20%" padding="25px">
          <HStack>
            <Image src={logo} alt="Logo" boxSize={'3em'} borderRadius="50px" />
            <Heading textAlign={'center'}>Login</Heading>
          </HStack>
          <FormControl>
            <HStack marginTop={'10px'}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                focusBorderColor="#6b46c1"
                value={email}
                onChange={handleEmail}
                name="email"
              />
            </HStack>
            <HStack marginTop={'10px'}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                focusBorderColor="#6b46c1"
                value={password}
                onChange={handlePassword}
                name="password"
              />
            </HStack>
            <Button
              marginTop={'20px'}
              colorScheme="purple"
              onClick={submitLogin}
            >
              Login
            </Button>
          </FormControl>
          <HStack>
            <Text fontSize="sm">
              Don't have an account.{' '}
              <Link to="/register">
                <Button variant="link" color={'#6b46c1'}>
                  Register Here
                </Button>
              </Link>
            </Text>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default Login;
