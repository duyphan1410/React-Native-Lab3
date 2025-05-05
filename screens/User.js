import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utils/colors';
import { fetchUserContact } from '../utils/api';

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load data
  useEffect(() => {
    fetchUserContact()
      .then(user => {
        setUser(user);
        setLoading(false);
        setError(false);
      })
      .catch(e => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="white" />}
      {error && <Text style={styles.error}>Error loading user data</Text>}
      {!loading && !error && (
        <ContactThumbnail avatar={user.avatar} name={user.name} phone={user.phone} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  error: {
    color: 'white',
    fontSize: 18,
  },
});

export default User;