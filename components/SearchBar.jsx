import React from 'react';
import { View, TextInput,TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search BOMs"
      />
      <TouchableOpacity onPress={onSearch}>
        <FontAwesome name="search" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default SearchBar;