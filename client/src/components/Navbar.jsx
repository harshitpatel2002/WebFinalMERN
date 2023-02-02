import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const Navbar = () => {
  const handleLogout = () => {};

  return (
    <>
      <Flex width={'100vw'} marginTop={'3rem'} justifyContent={'space-evenly'}>
        <Box>
          <Heading color={'#d6bcfa'}>Home Nventory</Heading>
        </Box>
        <Box>
          <Button colorScheme={'red'} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
