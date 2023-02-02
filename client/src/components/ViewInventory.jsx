import React, { useEffect } from 'react';
import { getItems } from '../services/inventory';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddItem from './AddItem';

const ViewInventory = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = async () => {
    const response = await getItems();
    // console.log(response);

    if (response) {
      if (response.data) {
        setItems(response.data.items);
      } else {
        navigate('/login');
      }
    }
  };

  return (
    <Flex
      alignItems={'center'}
      flexDir={'column'}
      justifyContent={'space-around'}
      height={'70vh'}
    >
      <TableContainer>
        <Heading size={'lg'} marginBottom={'1rem'}>
          Your inventory
        </Heading>
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Items</Th>
              <Th>Category</Th>
              <Th isNumeric>Price (in $)</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{item.item}</Td>
                  <Td>{item.category.category_name}</Td>
                  <Td isNumeric>{item.price}</Td>
                  <Td>
                    <Button colorScheme="green" variant="link">
                      <Link>Edit</Link>
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="red" variant="link">
                      <Link>Delete</Link>
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AddItem />
    </Flex>
  );
};

export default ViewInventory;
