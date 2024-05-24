import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList,TouchableOpacity, Alert,TextInput, Button } from 'react-native';
import { getAllWorkOrdersOfPM, creatWorkOrder } from '../../services/WorkOrderServices';
import {createWorkOrderDetail} from '../../services/WorkOrderDetailServices';
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
                const WOID = WO.result;
                console.log("WOID: ",WOID);
                const newWorkOrderDetails = workOrderDetails.map(detail => ({
                    ...detail,
                    workOrderId: WOID
                }));
            
                setWorkOrderDetails(newWorkOrderDetails);
                console.log(newWorkOrderDetails);
                const WODetail = await createWorkOrderDetail(token, newWorkOrderDetails);
                console.log(WODetail);
                Alert.alert('Success', 'MPS created successfully', [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('WorkOrderHome')
                    }
                ]);
            } else {
                console.error('API call failed, WO or WO.result is null or undefined');
            }
            
        } catch (error) {
            console.error(error);
        }
        // console.log(workOrderDetails);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{marginBottom: 10, backgroundColor:'#fff'}}>   
                <ScrollView style={styles.scrollView}>
                    {mps.map((item, index) => (
                        <TouchableOpacity
                            key={index.toString()}
                            style={styles.itemContainer}
                            onPress={() => {
                                setWorkOrderDetails(prevDetails => {
                                    const newDetails = [...prevDetails];
                                    newDetails[newDetails.length - 1].masterProductionScheduleId = item.mpsID;
                                    return newDetails;
                                });
                            }}
                        >
                        <View style={styles.row}>
                                <Text style={styles.column}>{item.productName}</Text>
                                <Text style={styles.column}>{item.dateStart}</Text>
                                <Text style={styles.column}>{item.dateEnd}</Text>
                                <Text style={styles.column}>{item.quantity}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View> 
            
            <View style={{marginBottom: 10, backgroundColor:'#fff'}}>    
                <ScrollView>
                        <Title>Work Order</Title>
                        <Card containerStyle={styles.card}>
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
                        <Title style={{borderColor: 'orange', borderWidth: 1, fontSize: 20, margin: 10, padding: 5}}>Work Order Detail</Title>
                        <Card containerStyle={styles.card}>
                            {workOrderDetails.map((detail, index) => (
                                <View key={index}>
                                    <Text style={styles.text}>MPS ID: {detail.masterProductionScheduleId}</Text>
                                    <TextInput
                                        placeholder="Note"
                                        onChangeText={(text) => {
                                            const newDetails = [...workOrderDetails];
                                            newDetails[index].note = text;
                                            setWorkOrderDetails(newDetails);
                                        }}
                                    />
                                    <TextInput
                                        placeholder="Projected Production"
                                        onChangeText={(text) => {
                                            const newDetails = [...workOrderDetails];
                                            newDetails[index].projectedProduction = text;
                                            setWorkOrderDetails(newDetails);
                                        }}
                                    />
                                </View>
                            ))}
                        
                        </Card>
                    <View style={{height: 200 }}/>
                </ScrollView>
            </View> 

            <View style={styles.buttonContainer}>
                    <IconButton onPress={() => navigation.navigate('WorkOrderHome')} iconName="arrow-left" />
                    <IconButton
                            title="Add Detail"
                            onPress={() => setWorkOrderDetails(prevState => [...prevState, {
                                workOrderId: '',
                                masterProductionScheduleId: '',
                                note: '',
                                projectedProduction: '',
                                actualProduction: 0,
                                faultyProducts: 0,
                                actualProductionPrice: 0,
                                faultyProductPrice: 0
                            }])}
                            iconName="plus-circle"
                        />
                    <IconButton onPress={handleSave} iconName="save" />
                            
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
    scrollView: {
        padding: 10, // Add padding around the ScrollView
        maxHeight: 100, // Adjust this value as needed
        borderColor: 'gray', // Change this to the desired border color
        borderWidth: 1, // Change this to the desired border width
    },
    itemContainer: {
        padding: 10, // Add padding to each item
        height: 50, // Set a fixed height for each item
    },
    mainContent: {
        margin: 10, 
    },
    card: {
        margin: 10, // Add margin around the Card
        padding: 10, // Add padding inside the Card
        backgroundColor: '#f8f8f8', // Change the background color of the Card
        borderRadius: 10, // Add rounded corners to the Card
    },
    text: {
        marginBottom: 10, // Add margin below each Text element
    },row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        fontSize: 12, // Adjust your text size here
    },
});

export default CreateWorkOrder;