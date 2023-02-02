import React, { useEffect, useState } from 'react';
import { authUsingToken, updateUser } from '../services/auth';
import {
  Box,
  Button,
  ButtonGroup,
  FormHelperText,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

let defUser = {
  email: '',
  fName: '',
  lName: '',
  password: '',
};

const ManageUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(defUser);

  const handleInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    let response = await updateUser(user);
    if (response.data.updatedUser.matchedCount >= 1) {
      window.alert(response.data.message);
      navigate('/home');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await authUsingToken('home/manage');
    console.log(response);

    if (response) {
      setUser(response.data);
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'flex-end'}
      marginTop={20}
    >
      <VStack boxSize="30%" padding="25px" spacing={'1rem'}>
        <HStack>
          <Heading textAlign={'center'}>Manage your account</Heading>
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
              disabled={true}
            />
          </HStack>
          <FormHelperText
            textAlign={'center'}
            color={'red'}
            marginLeft={'1.3rem'}
          >
            Note: You cannot edit the email
          </FormHelperText>
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
            onClick={handleUpdate}
          >
            Update
          </Button>
        </FormControl>
        <HStack justifyContent={'center'}>
          <Button colorScheme="green">
            <Link to={'/home/manage/inventory'}>View inventory</Link>
          </Button>
          <Button colorScheme="red">Deactivate account</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ManageUser;
