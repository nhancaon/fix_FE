import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList,TouchableOpacity, Alert,TextInput, Button } from 'react-native';
import { getWorkOrderToday } from '../../services/WorkOrderServices';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card } from 'react-native-paper';


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
        navigation.navigate('WorkOrderDetail', { id });
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <View className="bg-primary h-full" style={{ padding: 10}}>
      <FlatList
        data={workOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => handleCardPress(item.id)}>
            <Card.Title title={`ID: ${item.id}`} titleStyle={styles.title} />
            <Card.Content>
              <Text style={styles.text}>{`Start Date: ${item.dateStart}`}</Text>
              <Text style={styles.text}>{`End Date: ${item.dateEnd}`}</Text>
              <Text style={styles.text}>{`Status: ${item.workOrderStatus}`}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  title: {
    color: '#FFA500', // Orange color
    fontSize: 20, // Font size
    fontWeight: 'bold', // Bold font
  },
  cardContent: {
    
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProductManagerHome;