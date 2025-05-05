import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import DetailListItem from '../components/DetailListItem';

const Options = () => {
  const handlePress = (action) => {
    Alert.alert('Option Selected', `You selected: ${action}`);
  };

  return (
    <View style={styles.container}>
      <DetailListItem title="Update Profile" onPress={() => handlePress('Update Profile')} />
      <DetailListItem title="Change Language" onPress={() => handlePress('Change Language')} />
      <DetailListItem title="Sign Out" onPress={() => handlePress('Sign Out')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Options;