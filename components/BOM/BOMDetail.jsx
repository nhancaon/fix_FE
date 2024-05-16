import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import IconButton from '../../components/IconButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getBOMDetail } from '../../services/BOMServices';
import { Picker } from '@react-native-picker/picker';
import { Card, Title, Paragraph, List, DataTable } from 'react-native-paper';
import { Table, Row } from 'react-native-table-component';

function BOMDetail({ route }) {
  const { token  } = useGlobalContext();
  const { id } = route.params;
  const navigation = useNavigation();
  const [bomDetail, setBomDetail] = useState([]);
  const [unit, setUnit] = useState(bomDetail.unit);
  const[materialUnit, setMaterialUnit] = useState([]);
  const [status, setStatus] = useState(bomDetail.bomstatus);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getBOMDetail( token, id);
            setBomDetail(data.result);
            setUnit(data.result.unit);
            setStatus(data.result.bomstatus);
        }
        catch (error) {
            console.error(error);
        }
    };
  
    fetchData();
  }, [token]);
  const handleSave = () => {
    // Implement search functionality here
  };

  const handleDelete = () => {
    // Implement search functionality here
  };
  
  if (!bomDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
        
        <View>
            <FlatList
                ListHeaderComponent={
                    <>
                    
                    <Card style={{ padding: 10, margin: 10 }}>
                        <Card.Content>
                            <Title>ID: {bomDetail.id}</Title>
                            <Paragraph>Product Manager:</Paragraph>
                            <TextInput
                            defaultValue={bomDetail.productManager?.fullName}
                            style={{ backgroundColor: '#fff', marginBottom: 10 }}
                            />
                            <Title>BOM Name: {bomDetail.bomname}</Title>
                        </Card.Content>
                    </Card>

                    <Card style={{ padding: 10, margin: 10 }}>
                        <Card.Content>
                            <Title>Time Production:</Title>
                            <TextInput
                            label="Time Production"
                            defaultValue={bomDetail.timeProduction ? bomDetail.timeProduction.toString() : ''}
                            style={{ backgroundColor: '#fff', marginBottom: 10 }}
                            />

                            <Title>Total Price:</Title>
                            <TextInput
                            label="Total Price"
                            defaultValue={bomDetail.totalPrice ? bomDetail.totalPrice.toString() : ''}
                            style={{ backgroundColor: '#fff', marginBottom: 10 }}
                            />

                            <Title>Sell Price:</Title>
                            <TextInput
                            label="Sell Price"
                            defaultValue={bomDetail.sellPrice ? bomDetail.sellPrice.toString() : ''}
                            style={{ backgroundColor: '#fff', marginBottom: 10 }}
                            />

                            <Title>Date Creation:</Title>
                            <TextInput
                            label="Date Creation"
                            defaultValue={bomDetail.dateCreation ? bomDetail.dateCreation.toString() : ''}
                            style={{ backgroundColor: '#fff', marginBottom: 10 }}
                            />
                        </Card.Content>
                    </Card>

                    <Card style={{ padding: 10, margin: 10 }}>
                        <Card.Content>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Title>Unit:</Title>
                                <Picker
                                selectedValue={unit}
                                onValueChange={(itemValue) => setUnit(itemValue)}
                                style={{ flex: 1 }}
                                >
                                <Picker.Item label="g" value="g" />
                                <Picker.Item label="kg" value="kg" />
                                <Picker.Item label="amount" value="amount" />
                                <Picker.Item label="meter" value="meter" />
                                <Picker.Item label="liter" value="liter" />
                                </Picker>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Title>Status:</Title>
                                <Picker
                                selectedValue={status}
                                onValueChange={(itemValue) => setStatus(itemValue)}
                                style={{ flex: 1 }}
                                >
                                <Picker.Item label="Pending" value="PENDING" />
                                <Picker.Item label="Check Price" value="CHECK_PRICE" />
                                <Picker.Item label="Finish" value="FINISH" />
                                </Picker>
                            </View>
                            
                        </Card.Content>
                    </Card>
                    <Card style={{ flex: 1 }}>
                        <View style={{ flex: 1, height: 500 }}>
                            <DataTable>
                            <DataTable.Header>
                                <DataTable.Title><View style={{ flex: 2 }}><Text>Material</Text></View></DataTable.Title>
                                <DataTable.Title><View style={{ flex: 4 }}><Text>Unit</Text></View></DataTable.Title>
                                <DataTable.Title><View style={{ flex: 3 }}><Text>Price</Text></View></DataTable.Title>
                                <DataTable.Title><View style={{ flex: 2 }}><Text>Volume</Text></View></DataTable.Title>
                            </DataTable.Header>

                            {Array.isArray(bomDetail.materials) && bomDetail.materials.map((item, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell><View style={{ flex: 2 }}><Text>{item.materialName}</Text></View></DataTable.Cell>
                                    <DataTable.Cell><View style={{ flex: 4 }}><Text>{item.materialUnit}</Text></View></DataTable.Cell>
                                    <DataTable.Cell><View style={{ flex: 3 }}><Text>{item.materialPrice}</Text></View></DataTable.Cell>
                                    <DataTable.Cell><View style={{ flex: 2 }}><Text>{item.materialVolume}</Text></View></DataTable.Cell>
                                </DataTable.Row>
                            ))}

                            <DataTable.Row>
                                <DataTable.Cell><View style={{ flex: 2 }}><TextInput placeholder="Material" /></View></DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2 }} >
                                    <View style={{ flex: 1 }}>
                                        <Picker
                                            selectedValue={materialUnit}
                                            onValueChange={(itemValue) => {
                                                setMaterialUnit(itemValue);
                                                console.log("Selected value: ", materialUnit);
                                            }}
                                            style={{ flex: 1 }}
                                        >
                                            <Picker.Item label="g" value="g" />
                                            <Picker.Item label="kg" value="kg" />
                                            <Picker.Item label="amount" value="amount" />
                                            <Picker.Item label="meter" value="meter" />
                                            <Picker.Item label="liter" value="liter" />
                                        </Picker>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell><View style={{ flex: 3 }}><TextInput placeholder="Price" /></View></DataTable.Cell>
                                <DataTable.Cell><View style={{ flex: 2 }}><TextInput placeholder="Volume" /></View></DataTable.Cell>
                            </DataTable.Row>
                            </DataTable>
                        </View>
                    </Card>
                    </>
                }
            />
        </View>
       
        <View style={styles.buttonContainer}>
            <IconButton onPress={() => navigation.navigate('PMBOM')} iconName="arrow-left" />
            <IconButton onPress={handleSave} iconName="save" />
            <IconButton onPress={handleDelete} iconName="trash" />
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 15,
      width: '100%',
      flexDirection: 'row', 
      justifyContent: 'space-between'
  
    },
 });

export default BOMDetail;