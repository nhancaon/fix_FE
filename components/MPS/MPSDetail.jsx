import React, { useState, useEffect } from 'react';
import {  getMPSByID, updateMPS, deleteMPS } from '../../services/MPSServices'
import { useGlobalContext } from '../../context/GlobalProvider';
import IconButton from '../../components/IconButton';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { CustomButton, FormField, ToastMessage } from "../../components";

const ProductionScheduleDetail = ({ route }) => {
    const { id } = route.params;
    const { token } = useGlobalContext();
    const [ mpsDetail, setMPSDetail ] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
        console.log("id: ", id);
        const response = await getMPSByID(token, id); // replace token with actual token
        console.log("response: ",response);
        setMPSDetail(response.result);
        };
        fetchData();
    }, []);
    
    const handleSave = async () => {
        try {
            console.log("mpsDetail: ",mpsDetail);
            const response = await updateMPS(token, mpsDetail);
            console.log("response: ",response);
            Alert.alert('Success', 'MPS updated successfully', [
                {
                    text: 'OK',
                }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'MPS update failed: ' + error, [
                {
                    text: 'OK',
                }
            ]);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteMPS(token, id);
            console.log("response: ",response);
            Alert.alert('Success', 'MPS deleted successfully', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('ProductionScheduleHome')
                }
            ]);
        
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'MPS delete failed: ' + error, [
                {
                    text: 'OK',
                }
            ]);
        }
    };

    const handleStartDateChange = (selectedDate) => {
        if (selectedDate <= mpsDetail.dateEnd) {
            setMPSDetail(prevState => ({ ...prevState, dateStart: selectedDate }));
        } else {
            alert('Start date cannot be after end date');
        }
    };
    
    const handleEndDateChange = (selectedDate) => {
        if (selectedDate >= mpsDetail.dateStart) {
            setMPSDetail(prevState => ({ ...prevState, dateEnd: selectedDate }));
        } else {
            alert('End date cannot be before start date');
        }
    };    

    return (
        <View className="bg-primary h-full" style={{flex: 1}}>
            <ScrollView style={{flex: 1, margin: 20, marginBottom: 70}}>
                <Card style={styles.card}>
                    <Card.Title 
                        title={mpsDetail?.productName} 
                        subtitle={"Product manager: " + mpsDetail?.productManagerName} 
                        titleStyle={styles.title}/>

                    <Card.Content>
                        <Text style={styles.text}>MPS ID: {mpsDetail?.mpsID}</Text>
                        <FormField
                            title="Start Date"
                            placeholder={mpsDetail.dateStart}
                            value={mpsDetail.dateStart}
                            otherStyles="mt-3"
                            edit={true}
                            onPress={handleStartDateChange}
                        />

                        <FormField
                            title="End Date"
                            placeholder={mpsDetail.dateEnd}
                            value={mpsDetail.dateEnd}
                            otherStyles="mt-3"
                            edit={true}
                            onPress={handleEndDateChange}
                        />

                        <FormField
                            title="Quantity"
                            placeholder={mpsDetail?.quantity ? mpsDetail.quantity.toString() : ''}
                            value={mpsDetail?.quantity ? mpsDetail.quantity.toString() : ''}
                            otherStyles="mt-3"
                            edit={true}
                            handleChangeText={text => setMPSDetail(prevState => ({ ...prevState, quantity: parseInt(text) }))}
                        />

                        <Card.Title title="Additional Details" titleStyle={styles.title}/>
                        <Card style={styles.cardSecondContainer}>
                            <Card.Content>
                                <FormField
                                    title="Require Time"
                                    placeholder={mpsDetail?.requireTime ? mpsDetail.requireTime.toString() : ''}
                                    value={mpsDetail?.requireTime ? mpsDetail.requireTime.toString() : ''}
                                    otherStyles="mt-3"
                                    edit={true}
                                    handleChangeText={text => setMPSDetail(prevState => ({ ...prevState, requireTime: text }))}
                                />

                                <FormField
                                    title="Duration Hour"
                                    placeholder={mpsDetail?.durationHour ? mpsDetail.durationHour.toString() : ''}
                                    value={mpsDetail?.durationHour ? mpsDetail.durationHour.toString() : ''}
                                    otherStyles="mt-3"
                                    edit={true}
                                    handleChangeText={text => setMPSDetail(prevState => ({ ...prevState, durationHour: text }))}
                                />

                                <FormField
                                    title="Effort Hour"
                                    placeholder={mpsDetail?.effortHour ? mpsDetail.effortHour.toString() : ''}
                                    value={mpsDetail?.effortHour ? mpsDetail.effortHour.toString() : ''}
                                    otherStyles="mt-3"
                                    edit={true}
                                    handleChangeText={text => setMPSDetail(prevState => ({ ...prevState, effortHour: text }))}
                                />

                                <FormField
                                    // title="In Progress"
                                    placeholder="In Progress"
                                    value={mpsDetail?.in_progress ? mpsDetail.in_progress.toString() : ''}
                                    otherStyles="mt-1"
                                    edit={true}
                                    handleChangeText={text => {setMPSDetail(prevState => ({ ...prevState, in_progress: text }))}}
                                />
                            </Card.Content>
                        </Card>
                    </Card.Content>
                </Card>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <IconButton onPress={() => navigation.navigate('ProductionScheduleHome')} iconName="arrow-left" />
                <IconButton onPress = {handleDelete} iconName="trash" />
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
        margin: 10,
        padding: 10,
    },
    title: {
        color: '#FFA500', // Orange color
        fontSize: 20, // Font size
        fontWeight: 'bold', // Bold font,
        marginTop: 10
      },
    cardContent: {
        
    },
    text: {
        fontSize: 16,
    },
    cardSecondContainer: {
        // margin: 5,
    },
});

export default ProductionScheduleDetail;