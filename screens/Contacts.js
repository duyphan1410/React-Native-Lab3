import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ContactListItem from '../components/ContactListItem';
import { fetchContacts } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../store';

const Contacts = ({ navigation }) => {
  // Use Redux state
  const { contacts, loading, error } = useSelector((state) => ({
    contacts: state.contacts,
    loading: state.loading,
    error: state.error
  }));
  const dispatch = useDispatch();

  // Load data
  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then(contacts => {
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch(e => {
        dispatch(fetchContactsError());
      });
  }, []);

  // Sort contacts alphabetically
  const contactsSorted = contacts.slice().sort((a, b) => a.name.localeCompare(b.name));
  
  const keyExtractor = ({ phone }) => phone;

  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  // Render list
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="blue" />}
      {error && <Text>Error loading contacts...</Text>}
      {!loading && !error && (
        <FlatList
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Contacts;