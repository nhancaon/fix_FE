import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SearchBar from '../../components/SearchBar';
import IconButton from '../../components/IconButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllBOMs } from '../../services/BOMServices';
import { useGlobalContext } from '../../context/GlobalProvider';

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
 
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBOMs(token);
      setBoms(data.result);
    };
  
    fetchData();
  }, [token]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleInsert = () => {
    // Implement insert functionality here
  };

  const handleUpdate = () => {
    // Implement update functionality here
  };

  const handleDelete = () => {
    // Implement delete functionality here
  };



  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
      />

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

      <FlatList
      data={boms}
      keyExtractor={item => item.bomname} // Sử dụng bomname như là key duy nhất cho mỗi item
      renderItem={({ item }) => (
        <View>
          <Text>{item.bomname}</Text>
          <Text>{item.totalPrice}</Text>
          <Text>{item.sellPrice}</Text>
          <Text>{item.dateCreation}</Text>
          {/* Hiển thị danh sách vật liệu */}
          <FlatList
            data={item.materials}
            keyExtractor={material => material.materialName} // Sử dụng materialName như là key duy nhất cho mỗi material
            renderItem={({ item: material }) => (
              <View>
                <Text>{material.materialName}</Text>
                <Text>{material.materialPrice}</Text>
                <Text>{material.materialVolume}</Text>
              </View>
            )}
          />
        </View>
      )}
    />
      
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
  

});

export default PMBOM;