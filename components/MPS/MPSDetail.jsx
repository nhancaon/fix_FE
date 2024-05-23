import React, { useState, useEffect } from 'react';
import {  getMPSByID, createMPS, updateMPS, deleteMPS } from '../../services/MPSServices'
import { useGlobalContext } from '../../context/GlobalProvider';
import IconButton from '../../components/IconButton';
import { Card, Title, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, ScrollView, Alert,TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ProductionScheduleDetail = ({ route }) => {
    const { token, userId  } = useGlobalContext();
    const [mpsDetail, setMPSDetail] = useState({});
    const navigation = useNavigation();
    const { id } = route.params;
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();

    useEffect(() => {
        const fetchData = async () => {
        console.log("id: ",id);
        const response = await getMPSByID(token,id); // replace token with actual token
        setMPSDetail(response.result);
        setDateStart(new Date(response.result.dateStart));
        setDateEnd(new Date(response.result.dateEnd));
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

    return (
       
        <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
            <Card>
                <Card.Title title={mpsDetail?.productName} subtitle={mpsDetail?.productManagerName} titleStyle={{ color: 'orange' }}/>
                <Card.Content>
                    <Text>MPS ID: {mpsDetail?.mpsID}</Text>

                    {showStartPicker && (
                        <DateTimePicker
                            value={new Date(mpsDetail?.dateStart)}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowStartPicker(false);
                                if (selectedDate <= new Date(mpsDetail?.dateEnd)) {
                                    setMPSDetail(prevState => ({ ...prevState, dateStart: selectedDate?.toISOString() }));
                                } else {
                                    alert('Start date cannot be after end date');
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                        <Text>Start Date: {new Date(mpsDetail?.dateStart).toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    {showEndPicker && (
                        <DateTimePicker
                            value={new Date(mpsDetail?.dateEnd)}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowEndPicker(false);
                                if (selectedDate >= new Date(mpsDetail?.dateStart)) {
                                    setMPSDetail(prevState => ({ ...prevState, dateEnd: selectedDate?.toISOString() }));
                                } else {
                                    alert('End date cannot be before start date');
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                        <Text>End Date: {new Date(mpsDetail?.dateEnd).toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    <TextInput
                        label="Quantity"
                        value={mpsDetail?.quantity ? mpsDetail.quantity.toString() : ''}
                        onChangeText={text => setMPSDetail(prevState => ({ ...prevState, quantity: parseInt(text) }))}
                    />
                    <Card>
                        <Card.Title title="Additional Details" />
                        <Card.Content>
                            <TextInput
                                label="Require Time"
                                value={mpsDetail?.requireTime ? mpsDetail.requireTime.toString() : ''}
                                onChangeText={text => setMPSDetail(prevState => ({ ...prevState, requireTime: text }))}
                            />
                            <TextInput
                                label="Duration Hour"
                                value={mpsDetail?.durationHour ? mpsDetail.durationHour.toString() : ''}
                                onChangeText={text => setMPSDetail(prevState => ({ ...prevState, durationHour: text }))}
                            />
                            <TextInput
                                label="Effort Hour"
                                value={mpsDetail?.effortHour ? mpsDetail.effortHour.toString() : ''}
                                onChangeText={text => setMPSDetail(prevState => ({ ...prevState, effortHour: text }))}
                            />
                            <TextInput
                                label="In Progress"
                                value={mpsDetail?.in_progress ? mpsDetail.in_progress.toString() : ''}
                                onChangeText={text => {
                                    setMPSDetail(prevState => ({ ...prevState, in_progress: text }));
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
});

export default ProductionScheduleDetail;