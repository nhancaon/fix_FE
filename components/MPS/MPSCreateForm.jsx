import React, { useState, useEffect } from 'react';
import {  createMPS, updateMPS, deleteMPS } from '../../services/MPSServices'
import { useGlobalContext } from '../../context/GlobalProvider';
import IconButton from '../../components/IconButton';
import { Card, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { getAllProduct } from '../../services/ProductServices';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomButton, FormField, ToastMessage } from "../../components";

const MPSCreateForm = () => {
    const { token, userId  } = useGlobalContext();
    const [products, setProducts] = useState([]);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [dateStart, setDateStart] = useState(new Date().toISOString().split('T')[0]);
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [formattedStartDate, setFormattedStartDate] = useState('');
    const [formattedEndDate, setFormattedEndDate] = useState('');
    const [mpsRequest, setMPSRequest] = useState({
        product_manager_ID: userId,
        productId: '',
        dateStart: dateStart,
        dateEnd: dateEnd,
        quantity: '',
        requireTime: '',
        durationHour: '',
        effortHour: '',
        in_progress: '0.0'
    });
    const navigation = useNavigation();
    
    useEffect(() => {
        const fetchData = async () => {
            console.log("dateStart: ", dateStart);
            const response = await getAllProduct(token);
            console.log("response: ",response);
            const products = response.result.map(product => ({
                id: product.id,
                name: product.name
            }));
            setProducts(products);
        };
        fetchData();
        
    }, []);
    
    const handleSave = async () => {
        console.log("mpsRequest: ",mpsRequest);
        try {
            const response = await createMPS(token, mpsRequest);
            console.log("response: ",response);
            // navigation.navigate('ProductionScheduleHome');
            Alert.alert('Success', 'MPS created successfully', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('ProductionScheduleHome')
                }
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStartDateChange = (selectedDate) => {
        if (selectedDate <= dateEnd) {
            setDateStart(selectedDate || dateStart);
            setMPSRequest(prevState => ({ ...prevState, dateStart: selectedDate }));
        } else {
            alert('Start date cannot be after end date');
        }
    };
    
    const handleEndDateChange = (selectedDate) => {
        if (selectedDate >= dateStart) {
            setDateEnd(selectedDate || dateEnd);
            setMPSRequest(prevState => ({ ...prevState, dateEnd: selectedDate }));
        } else {
            alert('End date cannot be before start date');
        }
    };   

    return (
        <View className="bg-primary h-full" style={{flex: 1}}>
            <ScrollView style={{borderWidth: 1, }} alwaysBounceVertical={true} vertical={true}>
                <Card style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        {products.map((product, index) => (
                            <TouchableOpacity 
                                key={index} 
                                onPress={() => setMPSRequest(prevState => ({ ...prevState, productId: product.id, productName: product.name }))}>
                                <View style={{ borderBottomWidth: 1, margin: 10 }}>
                                    <Text>Product ID: {product.id}</Text>
                                    <Text>Product Name: {product.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Card.Content>
                </Card>
            </ScrollView>

            <ScrollView>
                <Card style={styles.cardSecond}>
                    <Card.Content>
                        <FormField
                            title="Product Name"
                            placeholder={mpsRequest?.productName}
                            value={mpsRequest?.productName}
                            otherStyles="mt-3"
                            edit={true}
                            onPress={text => setMPSRequest(prevState => ({ ...prevState, productName: text }))}
                        />

                        <FormField
                            title="Start Date"
                            placeholder={dateStart}
                            value={dateStart}
                            otherStyles="mt-3"
                            edit={true}
                            onPress={handleStartDateChange}
                        />

                        <FormField
                            title="End Date"
                            placeholder={dateEnd}
                            value={dateEnd}
                            otherStyles="mt-3"
                            edit={true}
                            onPress={handleEndDateChange}
                        />

                        <FormField
                            title="Quantity"
                            placeholder={mpsRequest?.quantity ? mpsRequest.quantity.toString() : ''}
                            value={mpsRequest?.quantity ? mpsRequest.quantity.toString() : ''}
                            otherStyles="mt-3"
                            edit={true}
                            onPress={text => setMPSRequest(prevState => ({ ...prevState, quantity: parseInt(text) }))}
                        />

                        <Card.Title title="Additional Details" titleStyle={styles.title}/>
                        <Card style={styles.cardThird}>
                            <Card.Content>
                                <FormField
                                    title="Require Time"
                                    placeholder={mpsRequest?.requireTime ? mpsRequest.requireTime.toString() : ''}
                                    value={mpsRequest?.requireTime ? mpsRequest.requireTime.toString() : ''}
                                    otherStyles="mt-3"
                                    edit={true}
                                    onPress={text => setMPSRequest(prevState => ({ ...prevState, requireTime: text }))}
                                />

                                <FormField
                                    title="Duration Hour"
                                    placeholder={mpsRequest?.durationHour ? mpsRequest.durationHour.toString() : ''}
                                    value={mpsRequest?.durationHour ? mpsRequest.durationHour.toString() : ''}
                                    otherStyles="mt-3"
                                    edit={true}
                                    onPress={text => setMPSRequest(prevState => ({ ...prevState, durationHour: text }))}
                                />

                                <FormField
                                    title="Effort Hour"
                                    placeholder={mpsRequest?.effortHour ? mpsRequest.effortHour.toString() : ''}
                                    value={mpsRequest?.effortHour ? mpsRequest.effortHour.toString() : ''}
                                    otherStyles="mt-3"
                                    edit={true}
                                    onPress={text => setMPSRequest(prevState => ({ ...prevState, effortHour: text }))}
                                />

                                <FormField
                                    // title="Require Time"
                                    placeholder="In Progress"
                                    value={mpsRequest?.in_progress ? mpsRequest.in_progress : ''}
                                    otherStyles="mt-3"
                                    edit={true}
                                    onPress={text => {setMPSRequest(prevState => ({ ...prevState, in_progress: text }));}}
                                />
                            </Card.Content>
                        </Card>
                    </Card.Content>
                </Card>

            <View style={{ height: 100 }} />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <IconButton onPress={() => navigation.navigate('ProductionScheduleHome')} iconName="arrow-left" />
                <IconButton onPress={handleSave} iconName="save" />
            </View>
        </View>
    
        
    )
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
        backgroundColor: '#FFA500',
        margin: 10,
        padding: 10,
    },
    cardContent: {
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
    },
    cardSecond: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
    },
    cardThird: {
        backgroundColor: '#FFA500',
        padding: 10,
    },
    title: {
        color: '#FFA500', // Orange color
        fontSize: 20, // Font size
        fontWeight: 'bold', // Bold font
        marginTop: 10,
    },
    text: {
        fontSize: 16,
    },
});


export default MPSCreateForm;