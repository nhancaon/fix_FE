import { Text, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const SaleForecast = () => {
  const [data, setData] = useState([]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cell,{width: 45}]}>{(index+1).toString()}</Text>
        <Text style={[styles.cell,{width: 45}]}>{item.DateStart}</Text>
        <Text style={[styles.cell,{width: 45}]}>{item.DateEnd}</Text>
      </View>
    )
  }
  return (
    <View style={styles.backgroundColor}>
      <View style={styles.container}>
        <ScrollView horizontal>
          <View style={styles.listContainer}>
            <View style={styles.header}>
              <Text style={[styles.headerText,{width: 45}]} class>S.No</Text>
              <Text style={[styles.headerText,{width: 150}]}>Date Start</Text>
              <Text className="text-2xl font-semibold text-white">Date End</Text>
            </View>
            <FlatList>
              data:={data}
              renderItem={renderItem}
              keyExtractor={(item,index) => index.toString()}

            </FlatList>
          </View>
        </ScrollView>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#161622',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  listContainer: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerText:{
    fontSize: 15,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0,
    marginHorizontal: 8,
    elevation:1,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  cell: {
    fontSize: 14,
    flex: 1
  }
});

export default SaleForecast;
