import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authUsingToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const defUser = {
  email: '',
  fName: '',
  lName: '',
  password: '',
};

const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(defUser);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await authUsingToken('home');

    if (!response) {
      navigate('/login');
    } else {
      setUser(response.data);
    }
  };

  return (
    <>
      <Flex flexDir={'column'}>
        <VStack marginTop={'3rem'}>
          <Box>
            <Heading size={'lg'}>Hello, {user.fName}</Heading>
          </Box>
          <Box>
            <Button
              marginTop={'2rem'}
              variant={'outline'}
              colorScheme={'green'}
            >
              <Link to={'/home/manage'}>Manage account information</Link>
            </Button>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default UserHome;
