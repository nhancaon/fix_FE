import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ProductManagerHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 2,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  mainContent: {
    flex: 8,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default ProductManagerHome;