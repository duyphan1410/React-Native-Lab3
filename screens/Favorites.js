import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import { useSelector } from 'react-redux';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  // Use Redux state
  const { contacts, loading, error } = useSelector((state) => ({
    contacts: state.contacts,
    loading: state.loading,
    error: state.error
  }));

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar, name, phone } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        name={name}
        phone={phone}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  const favorites = contacts.filter(contact => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="blue" />}
      {error && <Text>Error loading favorites...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});

export default Favorites;