import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getAllWorkOrdersOfPM } from '../../services/WorkOrderServices';
import {getAllMPS} from '../../services/MPSServices';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card } from 'react-native-paper';
import IconButton from '../../components/IconButton';


const WorkOrder = () => {

    const { token, userId } = useGlobalContext();
    const navigation = useNavigation();
    const [workOrders, setWorkOrders] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const data = await getAllWorkOrdersOfPM(token, userId)
                setWorkOrders(data.result);
            };

            fetchData();
        }, [token, userId])
    );

    const handleInsert = () => {
        try {
            navigation.navigate('CreateWorkOrder');
        } catch (error) {
            console.error(error);
        }
    };

    const handleCardPress = (id) => {
        try {
            navigation.navigate('WorkOrderDetail', { workOrderID: id });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View styles={{flex: 1}}>
            
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

            {/* button */}
            <View style={styles.buttonContainer}>
                <IconButton onPress={handleInsert} iconName="plus" />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        elevation: 5
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardContent: {
        fontSize: 16
    }
});

export default WorkOrder;