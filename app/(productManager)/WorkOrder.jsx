import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getAllWorkOrdersOfPM } from '../../services/WorkOrderServices';
import {getAllMPS} from '../../services/MPSServices';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card } from 'react-native-paper';
import IconButton from '../../components/IconButton';
import {
    CustomButton,
  } from "../../components";

const WorkOrder = () => {

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
            navigation.navigate('WorkOrderDetail', { id });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
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
                        <Text>{`Status: ${items.find(i => i.value === item.workOrderStatus)?.label || item.workOrderStatus}`}</Text>
                        </Card.Content>
                    </Card>
                    )}
                />
            </View>
            {/* button */}

            <CustomButton
                icon={"plus"}
                iconSize={28}
                containerStyles="p-0 absolute bottom-32 self-end right-4 h-12 w-12 rounded-full bg-green-500 items-center justify-center"
                isLoading={false}
                handlePress={handleInsert}
            />

            
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