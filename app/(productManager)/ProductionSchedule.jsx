import React, { useState, useEffect } from 'react';
import {  getAllMPSofPM, createMPS, updateMPS, deleteMPS } from '../../services/MPSServices'
import { useGlobalContext } from '../../context/GlobalProvider';
import IconButton from '../../components/IconButton';
import { Card } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CustomButton } from '../../components';
import ProductionScheduleDetail from '../../components/MPS/MPSDetail';

const ProductionSchedule = () => {
  const { token, userId, searchText  } = useGlobalContext();
  const [mpsData, setMpsData] = useState([]);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const getFilteredData = () => {
    if (searchText.trim() === '') {
      return mpsData;
    }
    return mpsData.filter(item =>
      item.productName.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredData = getFilteredData();

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
      <FlatList
        data={filteredData}
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

      <View>  
        <CustomButton
          icon={"plus"}
          iconSize={28}
          containerStyles="p-0 absolute bottom-4 self-end right-4 h-12 w-12 rounded-full bg-green-500 items-center justify-center"
          isLoading={false}
          handlePress={handleInsert}
        />
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