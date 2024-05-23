import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SearchBar from '../../components/SearchBar';
import IconButton from '../../components/IconButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllBOMs, getBOMlikeName } from '../../services/BOMServices';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PMBOM = () => {
  const { token  } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [boms, setBoms] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Pending', value: 'PENDING' },
    { label: 'Check Price', value: 'CHECK_PRICE' },
    { label: 'Finish', value: 'FINISH' },
  ]);
 
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
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
      />
      {/* fillter */}
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
              onChangeValue={(value) => {
                console.log('onChangeValue called with:', value);
                setValue(value);
              }}
            />
      {/* get All */}
      <FlatList
        data={boms}
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
      
      {/* button */}
      <View style={styles.buttonContainer}>
        <IconButton onPress={handleInsert} iconName="plus" />
        <IconButton onPress={handleUpdate} iconName="edit" />
        <IconButton onPress={handleDelete} iconName="trash" />
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