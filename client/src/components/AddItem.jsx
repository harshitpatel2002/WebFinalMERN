import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItem, getCategories } from '../services/inventory';

const defItem = {
  item_name: '',
  category_name: '',
  price: '',
};

const AddItem = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(defItem);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    // console.log('Response from Categories: ', response);

    if (response) {
      if (response.data) {
        setCategories(response.data.categories);
      } else {
        navigate('/login');
      }
    }
  };
  const handleChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const handleAddItem = async () => {
    const response = await addItem(item);
    console.log(response);
  };

  return (
    <VStack align={'flex-start'} boxSize="30%">
      <Heading textAlign={'center'} size={'lg'}>
        Add an item
      </Heading>
      <FormControl>
        <HStack marginTop={'10px'}>
          <FormLabel w={'70%'}>Item name</FormLabel>
          <Input
            type="text"
            focusBorderColor="#6b46c1"
            value={item.item_name}
            onChange={handleChange}
            name="item_name"
          />
        </HStack>
        <HStack marginTop={'10px'}>
          <FormLabel w={'70%'}>Category</FormLabel>
          <Select
            placeholder="Select option"
            variant={'flushed'}
            focusBorderColor="#6b46c1"
            name="category_name"
          >
            {categories.map((category, i) => {
              return (
                <option key={i} value={category.category_name}>
                  {category.category_name}
                </option>
              );
            })}
          </Select>
        </HStack>
        <HStack marginTop={'10px'}>
          <FormLabel w={'70%'}>Price</FormLabel>
          <Input
            type="number"
            focusBorderColor="#6b46c1"
            value={item.price}
            onChange={handleChange}
            name="price"
          />
        </HStack>
        <Button marginTop={'20px'} colorScheme="purple" onClick={handleAddItem}>
          Add Item
        </Button>
      </FormControl>
    </VStack>
  );
};

export default AddItem;
