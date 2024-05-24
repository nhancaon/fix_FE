import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList,TouchableOpacity, Alert,TextInput, Button } from 'react-native';
import { deleteWorkOrder, getWorkOrderDetail, updateWorkOrder } from '../../services/WorkOrderServices';
import { updateWorkOrderDetail, createWorkOrderDetail } from '../../services/WorkOrderDetailServices';
import {getAllMPS} from '../../services/MPSServices';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card } from 'react-native-paper';
import IconButton from '../../components/IconButton';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const WorkOrderDetail = ({route}) => {
    const { token, userId } = useGlobalContext();
    const navigation = useNavigation();
    const { id } = route.params;
    const [workOrder, setWorkOrder] = useState([]);
    const [workOrderDetails, setWorkOrderDetails] = useState([]);
    const [mps, setMPS] = useState([]);

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [items, setItems] = useState([
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Finish', value: 'PMcheck' },
    ]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(workOrder.workOrderStatus);
      
    useEffect(() => {
        setValue(workOrder.workOrderStatus);
    }, [workOrder.workOrderStatus]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const response = await getWorkOrderDetail(token, id);
                setWorkOrder(response.result.workOrder);
                setWorkOrderDetails(response.result.workOrderDetails);

                const mpsResponse = await getAllMPS(token);
                setMPS(mpsResponse.result);
            };
            fetchData();
        }, [token, userId])
    );

    const handleSave  = async () => {
        try {
            console.log("workOrder: ",workOrder);
            console.log("workOrderDetails: ",workOrderDetails);
            const response = await updateWorkOrder(token,workOrder);
            const responseDT = await createWorkOrderDetail(token,workOrderDetails);
            console.log("response: ",response);
            console.log("responseDT: ",responseDT);
            Alert.alert('Success', 'Work Order updated successfully', [
                {
                   text: 'OK',
                }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Work Order update failed: ' + error, [
                {
                    text: 'OK',
                }
            ]);
        }
    }

    const handleDelete  = async () => {
        try {
            const response = await deleteWorkOrder(token,id);
            console.log("response: ",response);
            Alert.alert('Success', 'Work Order deleted successfully', [
                {
                   text: 'OK',
                   onPress: () => navigation.navigate('WorkOrderHome')
                }
            ]);
            navigation.navigate('WorkOrderHome');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Work Order delete failed: ' + error, [
                {
                    text: 'OK',
                }
            ]);
        }

    }

    return (
        <View style={{flex: 1}}>

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

            <View style={{marginBottom: 200, backgroundColor:'#fff'}}>
            <ScrollView >
                <Card style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 10 }}>Work Order Status:</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            containerStyle={{ height: 45, width: '45%' }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeValue={(value) => {
                                console.log('onChangeValue called with:', value);
                                setWorkOrder(prevState => ({ ...prevState, workOrderStatus: value }));
                            }}
                        />
                    </View>

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
                </Card>

                <View>
                    {workOrderDetails.map((detail, index) => (
                        <Card key={index} style={styles.card}>
                            <Text>Detail {index + 1}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, fontSize: 14 }}>Actual Production:</Text>
                                <TextInput
                                    style={{ fontSize: 14 }}
                                    value={String(detail.actualProduction)}
                                    onChangeText={(text) => {
                                        const newDetails = [...workOrderDetails];
                                        newDetails[index].actualProduction = Number(text);
                                        setWorkOrderDetails(newDetails);
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, fontSize: 14 }}>Actual Production Price:</Text>
                                <TextInput
                                    style={{ fontSize: 14 }}
                                    value={String(detail.actualProductionPrice)}
                                    onChangeText={(text) => {
                                        const newDetails = [...workOrderDetails];
                                        newDetails[index].actualProductionPrice = Number(text);
                                        setWorkOrderDetails(newDetails);
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, fontSize: 14 }}>Faulty Product Price:</Text>
                                <TextInput
                                    style={{ fontSize: 14 }}
                                    value={String(detail.faultyProductPrice)}
                                    onChangeText={(text) => {
                                        const newDetails = [...workOrderDetails];
                                        newDetails[index].faultyProductPrice = Number(text);
                                        setWorkOrderDetails(newDetails);
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, fontSize: 14 }}>Faulty Products:</Text>
                                <TextInput
                                    style={{ fontSize: 14 }}
                                    value={String(detail.faultyProducts)}
                                    onChangeText={(text) => {
                                        const newDetails = [...workOrderDetails];
                                        newDetails[index].faultyProducts = Number(text);
                                        setWorkOrderDetails(newDetails);
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, fontSize: 14 }}>Master Production Schedule ID:</Text>
                                <TextInput
                                    style={{ fontSize: 14 }}
                                    value={String(detail.masterProductionScheduleId)}
                                    onChangeText={(text) => {
                                        const newDetails = [...workOrderDetails];
                                        newDetails[index].masterProductionScheduleId = Number(text);
                                        setWorkOrderDetails(newDetails);
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, fontSize: 14 }}>Note:</Text>
                                <TextInput
                                    style={{ fontSize: 14 }}
                                    value={detail.note}
                                    onChangeText={(text) => {
                                        const newDetails = [...workOrderDetails];
                                        newDetails[index].note = text;
                                        setWorkOrderDetails(newDetails);
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, fontSize: 14 }}>Projected Production:</Text>
                                <TextInput
                                    style={{ fontSize: 14 }}
                                    value={String(detail.projectedProduction)}
                                    onChangeText={(text) => {
                                        const newDetails = [...workOrderDetails];
                                        newDetails[index].projectedProduction = Number(text);
                                        setWorkOrderDetails(newDetails);
                                    }}
                                />
                            </View>
                        </Card>
                    ))}
                </View>
                
                <View>
                    <IconButton
                        title="Add Detail"
                        onPress={() => setWorkOrderDetails(prevState => [...prevState, {
                            workOrderId: id,
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
                </View>
                </ScrollView>
            </View>

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
        marginBottom: 10,
        marginVertical: 10 // Add margin below each Text element
    },row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        fontSize: 12, // Adjust your text size here
    },
});

export default WorkOrderDetail;
