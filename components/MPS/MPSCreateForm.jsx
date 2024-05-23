import React, { useState, useEffect } from 'react';
import {  getMPSByID, createMPS, updateMPS, deleteMPS } from '../../services/MPSServices'
import { useGlobalContext } from '../../context/GlobalProvider';
import IconButton from '../../components/IconButton';
import { Card, Title, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { getAllProduct } from '../../services/ProductServices';
import DateTimePicker from '@react-native-community/datetimepicker';

const MPSCreateForm = () => {
    const { token, userId  } = useGlobalContext();
    const [products, setProducts] = useState([]);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [mpsRequest, setMPSRequest] = useState({
        product_manager_ID: userId,
        productId: '',
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
        quantity: '',
        requireTime: '',
        durationHour: '',
        effortHour: '',
        in_progress: '0.0'
    });
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllProduct(token);
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

    return (
       
        <View style={{flex: 1}}>
            <ScrollView style={{borderWidth: 1, }} alwaysBounceVertical={true} vertical={true}>
                <View style={{ }}>
                    {products.map((product, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => setMPSRequest(prevState => ({ ...prevState, productId: product.id, productName: product.name }))}
                        >
                            <View style={{ borderBottomWidth: 1, margin: 10 }}>
                                <Text>Product ID: {product.id}</Text>
                                <Text>Product Name: {product.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={{ height: 10 }} />
            <ScrollView >
            <Card>
                <Card.Content>
                    <TextInput
                        label="Product Name"
                        value={mpsRequest?.productName}
                        onChangeText={text => setMPSRequest(prevState => ({ ...prevState, productName: text }))}
                    />

                    {showStartPicker && (
                        <DateTimePicker
                            value={dateStart}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowStartPicker(false);
                                if (selectedDate <= dateEnd) {
                                    setDateStart(selectedDate || dateStart);
                                    setMPSRequest(prevState => ({ ...prevState, dateStart: selectedDate?.toISOString() }));
                                } else {
                                    alert('Start date cannot be after end date');
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                        <Text>Start Date: {dateStart.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    {showEndPicker && (
                        <DateTimePicker
                            value={dateEnd}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowEndPicker(false);
                                if (selectedDate >= dateStart) {
                                    setDateEnd(selectedDate || dateEnd);
                                    setMPSRequest(prevState => ({ ...prevState, dateEnd: selectedDate?.toISOString() }));
                                } else {
                                    alert('End date cannot be before start date');
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                        <Text>End Date: {dateEnd.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    
                    <TextInput
                        label="Quantity"
                        value={mpsRequest?.quantity ? mpsRequest.quantity.toString() : ''}
                        onChangeText={text => setMPSRequest(prevState => ({ ...prevState, quantity: parseInt(text) }))}
                    />
                    <Card>
                        <Card.Title title="Additional Details" />
                        <Card.Content>
                            <TextInput
                                label="Require Time"
                                value={mpsRequest?.requireTime ? mpsRequest.requireTime.toString() : ''}
                                onChangeText={text => setMPSRequest(prevState => ({ ...prevState, requireTime: text }))}
                            />
                            <TextInput
                                label="Duration Hour"
                                value={mpsRequest?.durationHour ? mpsRequest.durationHour.toString() : ''}
                                onChangeText={text => setMPSRequest(prevState => ({ ...prevState, durationHour: text }))}
                            />
                            <TextInput
                                label="Effort Hour"
                                value={mpsRequest?.effortHour ? mpsRequest.effortHour.toString() : ''}
                                onChangeText={text => setMPSRequest(prevState => ({ ...prevState, effortHour: text }))}
                            />
                            <TextInput
                                label="In Progress"
                                value={mpsRequest?.in_progress ? mpsRequest.in_progress : ''}
                                onChangeText={text => {
                                    setMPSRequest(prevState => ({ ...prevState, in_progress: text }));
                                }}
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
});

export default MPSCreateForm;