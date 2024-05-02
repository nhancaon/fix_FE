import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ProductManagerHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Button 1
        </Button>
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Button 2
        </Button>
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Button 3
        </Button>
      </View>
      <View style={styles.mainContent}>
        {/* Your main content goes here */}
      </View>
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