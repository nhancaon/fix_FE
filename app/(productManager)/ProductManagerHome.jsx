import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList,TouchableOpacity, Alert,TextInput, Button } from 'react-native';
import { getWorkOrderToday } from '../../services/WorkOrderServices';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card } from 'react-native-paper';
import IconButton from '../../components/IconButton';
import DropDownPicker from 'react-native-dropdown-picker';


const ProductManagerHome = () => {
  const { token, userId } = useGlobalContext();
  const navigation = useNavigation();
  const [workOrders, setWorkOrders] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
        const fetchData = async () => {
            const data = await getWorkOrderToday(token)
            setWorkOrders(data.result);
        };

        fetchData();
    }, [token, userId])
  );

  const handleCardPress = (id) => {
    try {
        navigation.navigate('ProductManagerHomeDetail', { id });
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <View style={{ padding: 10}}>
    <FlatList
        data={workOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <Card style={{margin: 1}} onPress={() => handleCardPress(item.id)}>
            <Card.Content>
            <Text>{`ID: ${item.id}`}</Text>
            <Text>{`Start Date: ${item.dateStart}`}</Text>
            <Text>{`End Date: ${item.dateEnd}`}</Text>
            <Text>{`Status: ${item.workOrderStatus}`}</Text>
            </Card.Content>
        </Card>
        )}
    />
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