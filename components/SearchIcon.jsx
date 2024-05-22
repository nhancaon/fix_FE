import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchIcon = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="ios-search" size={20} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
});

export default SearchIcon;
