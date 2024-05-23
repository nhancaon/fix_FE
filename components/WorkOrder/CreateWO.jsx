import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList,TouchableOpacity, Alert,TextInput } from 'react-native';
import { getAllWorkOrdersOfPM, creatWorkOrder } from '../../services/WorkOrderServices';
import {getAllMPS} from '../../services/MPSServices';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card, Title } from 'react-native-paper';
import IconButton from '../../components/IconButton';
import DateTimePicker from '@react-native-community/datetimepicker';


const CreateWorkOrder = () => { 
    
    const { token, userId } = useGlobalContext();
    const navigation = useNavigation();
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [workOrder, setWorkOrder] = useState({
        productManagerID: userId,
        dateStart: new Date(),
        dateEnd: new Date(),
        workOrderStatus: 'pending',
    });
    const [mps, setMPS] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [workOrderDetails, setWorkOrderDetails] = useState([]);
    const [detail, setDetail] = useState({
        workOrderId: null,
        masterProductionScheduleId: null,
        note: '',
        projectedProduction: null,
        actualProduction: null,
        faultyProducts: null,
        actualProductionPrice: null,
        faultyProductPrice: null,
      });

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const mpsData = await getAllMPS(token);
                setMPS(mpsData.result);
            };

            fetchData();
        }, [token, userId])
    );

    const handleSave = async () => {
        try {
            const WO = await creatWorkOrder(token, workOrder);
            if (WO && WO.result) {
                const WOID = WO.result.id;
                console.log(WOID);
            } else {
                console.error('API call failed, WO or WO.result is null or undefined');
            }
            // setWorkOrderDetail({...workOrderDetail, workOrderId: WOID});
            // const WOD = await createWorkOrderDetail(token, workOrderDetail);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = () => {
        console.log("WO: ", workOrder);
    }

    return (
        <View styles={{flex: 1}}>

            <ScrollView style={styles.scrollView}>
                {mps.map((item, index) => (
                    <TouchableOpacity
                        key={index.toString()}
                        style={styles.itemContainer}
                        onPress={() => setSelectedId(item.mpsID)}
                    >
                        <Text>{item.productName}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
          
              
            <Text>Work Order Detail</Text>
            <ScrollView style={styles.mainContent}>
                
                <Card containerStyle={styles.card}>
                    <Text style={styles.text}>"MPS ID:" {selectedId} </Text>

                    {showStartPicker && (
                        <DateTimePicker
                            value={workOrder.dateStart ? new Date(workOrder.dateStart) : new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowStartPicker(false);
                                if (selectedDate <= new Date(workOrder.dateEnd)) {
                                    setWorkOrder(prevState => ({ ...prevState, dateStart: selectedDate?.toISOString() }));
                                } else {
                                    alert('Start date cannot be after end date');
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity style={styles.text} onPress={() => setShowStartPicker(true)}>
                        <Text>Start Date: {workOrder.dateStart ? new Date(workOrder.dateStart).toLocaleDateString() : 'Not selected'}</Text>
                    </TouchableOpacity>

                    {showEndPicker && (
                        <DateTimePicker
                            value={workOrder.dateEnd ? new Date(workOrder.dateEnd) : new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowEndPicker(false);
                                if (selectedDate >= new Date(workOrder.dateStart)) {
                                    setWorkOrder(prevState => ({ ...prevState, dateEnd: selectedDate?.toISOString() }));
                                } else {
                                    alert('End date cannot be before start date');
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity style={styles.text} onPress={() => setShowEndPicker(true)}>
                        <Text>End Date: {workOrder.dateEnd ? new Date(workOrder.dateEnd).toLocaleDateString() : 'Not selected'}</Text>
                    </TouchableOpacity>

                    <Title>{workOrder.workOrderStatus}</Title>
              </Card>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <IconButton onPress={() => navigation.navigate('WorkOrderHome')} iconName="arrow-left" />
                <IconButton onPress = {handleDelete} iconName="trash" />
                <IconButton onPress={handleSave} iconName="save" />
            </View>
        </View>
    );
};   

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        margin: 10
    },
    scrollView: {
        maxHeight: 100, // Adjust this value as needed
        borderColor: 'gray', // Change this to the desired border color
        borderWidth: 1, // Change this to the desired border width
    },
    itemContainer: {
        padding: 10, // Add padding to each item
        height: 50, // Set a fixed height for each item
    },
    mainContent: {
        margin: 10, // Add margin around the ScrollView
    },
    card: {
        padding: 10, // Add padding inside the Card
        backgroundColor: '#f8f8f8', // Change the background color of the Card
        borderRadius: 10, // Add rounded corners to the Card
    },
    text: {
        marginBottom: 10, // Add margin below each Text element
    },
});

export default CreateWorkOrder;