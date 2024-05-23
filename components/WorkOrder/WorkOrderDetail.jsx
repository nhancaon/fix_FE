import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAllWorkOrdersOfPM } from '../../services/WorkOrderServices';
import {getAllMPS} from '../../services/MPSServices';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Card } from 'react-native-paper';
import IconButton from '../../components/IconButton';

const WorkOrderDetail = ({param}) => {
    const { token, userId } = useGlobalContext();
    const navigation = useNavigation();
    const [workOrders, setWorkOrders] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                
            };

            fetchData();
        }, [token, userId])
    );

    const handleSave = () => {
        // Implement save functionality here
    }

    const handleDelete = () => {
        // Implement delete functionality here
    }

    return (
        <View styles={{flex: 1}}>
            <Text>Work Order Detail</Text>

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
    }
});

export default WorkOrderDetail;
