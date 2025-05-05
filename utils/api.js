import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const processContact = contact => {
  const { name, picture, phone, cell, email } = contact;
  return {
    id: uuidv4(),
    name: `${name.first} ${name.last}`,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() >= 0.5, // randomly assign as favorite
  };
};

export const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
  const { results } = await response.json();
  return results.map(processContact);
};

export const fetchUserContact = async () => {
  const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
  const { results } = await response.json();
  return processContact(results[0]);
};

export const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const { results } = await response.json();
  return processContact(results[0]);
};