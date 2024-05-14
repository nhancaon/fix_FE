import { Text, View, StyleSheet } from 'react-native';
import React from 'react';

const SaleForecast = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SaleOrder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161622',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#191970',
    color: '#87CEEB',
  },
});

export default SaleForecast;
