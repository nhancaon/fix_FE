import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList,TouchableOpacity, Alert,TextInput, Button } from 'react-native';
import { getWorkOrderToday } from '../../services/WorkOrderServices';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card } from 'react-native-paper';
import IconButton from '../../components/IconButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {Chatbot} from '../../services/ChatbotServices';

const ProductManagerHome = () => {
  const { token, userId } = useGlobalContext();
  const navigation = useNavigation();
  const [workOrders, setWorkOrders] = useState([]);
  const [items, setItems] = useState([
    { label: 'Pending', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Finish', value: 'PMcheck' },
  ]);
  useFocusEffect(
    React.useCallback(() => {
        const fetchData = async () => {
            const data = await getWorkOrderToday(token)
            setWorkOrders(data.result);
        };

        fetchData();
    }, [token, userId])
  );

  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (text) => {
    setInput(text);
  };

  const handleSubmit = async () => {
    try{
      console.log("input: ",input);
      const chatbotResponse = await Chatbot(input);
      setResponse(chatbotResponse);
    }catch(error){
      console.error("handle summit error",error);
    }
    
  };

  const handleCardPress = (id) => {
    try {
        navigation.navigate('ProductManagerHomeDetail', { id });
    } catch (error) {
        console.error(error);
    }
  }

  return (
      <View style={{ flex:1 ,padding: 10}}>
        <FlatList
            data={workOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <Card style={{margin: 1}} onPress={() => handleCardPress(item.id)}>
                <Card.Content>
                <Text>{`ID: ${item.id}`}</Text>
                <Text>{`Start Date: ${item.dateStart}`}</Text>
                <Text>{`End Date: ${item.dateEnd}`}</Text>
                <Text>{`Status: ${items.find(i => i.value === item.workOrderStatus)?.label || item.workOrderStatus}`}</Text>
                </Card.Content>
            </Card>
            )}
        />
        
        <Card style={{borderColor: 'blue', borderWidth: 1, minHeight: 200}}>
          <View >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>You: </Text>
              <TextInput 
                style={{height: 40, backgroundColor: '#fff', borderColor: 'gray', borderWidth: 1, flex: 1}} 
                value={input} 
                onChangeText={handleInputChange} 
                placeholder="Enter chat content here..."
              />
            </View>
            <Text>Chatbot: </Text>
            {response && <Text style={{ padding:50}}>{response}</Text>}
          </View>
          <Button title="Submit" onPress={handleSubmit} color="orange" />
        </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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