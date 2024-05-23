import React, { useState, useEffect } from 'react';
import {  getAllMPSofPM, createMPS, updateMPS, deleteMPS } from '../../services/MPSServices'
import { useGlobalContext } from '../../context/GlobalProvider';
import IconButton from '../../components/IconButton';
import { Card } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import ProductionScheduleDetail from '../../components/MPS/MPSDetail';
import SearchBar from '../../components/SearchBar';

const ProductionSchedule = () => {
  const { token, userId  } = useGlobalContext();
  const [mpsData, setMpsData] = useState([]);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const response = await getAllMPSofPM(token,userId); 
        setMpsData(response.result);
        console.log("res: ",response.result);
      };

      fetchData();
      console.log("mpsData: ",mpsData);
    }, [])
  );

  const handleCardPress = async (id) => {
    console.log(`Card with id ${id} was pressed.`);
    try {
      navigation.navigate('ProductionScheduleDetail', { id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInsert = async () => {
    try {
      navigation.navigate('MPSCreateForm');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {};

  return (
    <View styles={{flex: 1}}>
      {/* <SearchBar
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
      /> */}

      <FlatList
        data={mpsData}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        keyExtractor={item => item.mpsID.toString()}
        renderItem={({ item }) => (
          <Card key={item.mpsID} style={{
            margin: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }} onPress={() => handleCardPress(item.mpsID)}>
          
            <Card.Title title={item.productName} titleStyle={{ color: 'orange' }}/>
            <Card.Content>
              <Text>MPS ID: {item.mpsID}</Text>
              <Text>Start Date: {item.dateStart}</Text>
              <Text>End Date: {item.dateEnd}</Text>
              <Text>Quantity: {item.quantity}</Text>
            </Card.Content>
          </Card>
        )}
      />
    
      <View style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          padding: 10, // padding to keep the button from the very edge of the screen
      }}>
        <IconButton onPress={handleInsert} iconName="plus"  style={{
            borderRadius: 50, // assuming the width and height of the button is 100
            width: 100,
            height: 100,
            justifyContent: 'center', // these two lines are to keep the icon in the center of the button
            alignItems: 'center',
        }} />
      </View>

    </View>
    
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 15,
    width: '100%',

  },
  card: {
    margin: 10,
    padding: 10,
  },
  material: {
    marginTop: 10,
  },
  title: {
    color: '#FFA500', // Màu cam
    fontSize: 20, // Kích thước font
    fontWeight: 'bold', // Đặt font chữ đậm
  },

});

export default ProductionSchedule