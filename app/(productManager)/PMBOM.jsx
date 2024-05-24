import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import IconButton from '../../components/IconButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllBOMs, getBOMlikeName, getBOMsByStatus } from '../../services/BOMServices';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CustomButton } from '../../components';

const PMBOM = () => {
  const { token, searchText, setSearchText  } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [boms, setBoms] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Pending', value: 'PENDING' },
    { label: 'Check Price', value: 'CHECK_PRICE' },
    { label: 'Finish', value: 'FINISH' },
  ]);
 
  const getFilteredData = () => {
    if (searchText.trim() === '') {
      return boms;
    }
    return boms.filter(item =>
      item.bomname.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredData = getFilteredData();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const data = await getAllBOMs(token);
        setBoms(data.result);
      };
  
      fetchData();
    }, [token])
  );

  const handleSearch = () => {
    console.log(`Search for ${search}`);
    console.log(`token ${token}`)
    try {
      const fetchData = async () => {
        const data = await getBOMlikeName(token, search);
        setBoms(data.result);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInsert = () => {
    try {
      navigation.navigate('CreateBOM');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    // Implement update functionality here
  };

  const handleDelete = () => {
    // Implement delete functionality here
  };

  const navigation = useNavigation();
  
  const handleCardPress = async (id) => {
    console.log(`Card with id ${id} was pressed.`);
    try {
      navigation.navigate('BOMDetail', { id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              containerStyle={{ height: 40, width: '35%', alignSelf: 'flex-end' }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{ justifyContent: 'flex-start' }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeValue={async (value) => {
                console.log('onChangeValue called with:', value);
                setValue(value);
                try {
                  const data = await getBOMsByStatus(token, value);
                  if (data) {
                    console.log('data:', data.result);
                    setBoms(data.result);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            />
      {/* get All */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => handleCardPress(item.id)}>
            <Card.Title title={item.bomname} titleStyle={styles.title}/>
            <Card.Content>
              <Text>Total Price: {item.totalPrice}</Text>
              <Text>Sell Price: {item.sellPrice}</Text>
              <Text>Date Creation: {item.dateCreation}</Text>
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
  );
};

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

export default PMBOM;