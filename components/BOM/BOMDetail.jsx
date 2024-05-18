import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import IconButton from '../../components/IconButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getBOMDetail, deleteMaterialOfBOM, updateBOM  } from '../../services/BOMServices';
import { Picker } from '@react-native-picker/picker';
import { Card, Title, Paragraph, List, DataTable } from 'react-native-paper';

function BOMDetail({ route }) {
  
  const navigation = useNavigation();

  const { token, userId  } = useGlobalContext();
  const { id } = route.params;
  const [bomDetail, setBomDetail] = useState([]);
  const [unit, setUnit] = useState(bomDetail.unit);
  const[materialUnit, setMaterialUnit] = useState([]);
  const [status, setStatus] = useState(bomDetail.bomstatus);
  const [materials, setMaterials] = useState(bomDetail.materials || []);
  const [newMaterialName, setNewMaterialName] = useState('');
  const [newMaterialUnit, setNewMaterialUnit] = useState('');
  const [newMaterialPrice, setNewMaterialPrice] = useState('');
  const [newMaterialQuantity, setNewMaterialQuantity] = useState('');
  const [tempDeletedMaterials, setTempDeletedMaterials] = useState([]);


  useEffect(() => {
    setNewMaterialUnit('g');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getBOMDetail( token, id);
            setBomDetail(data.result);
            setUnit(data.result.unit);
            setStatus(data.result.bomstatus);
            setMaterials(data.result.materials);
        }
        catch (error) {
            console.error(error);
        }
    };
  
    fetchData();
  }, [token]);

  const [BOMUpdate, setBOMUpdate] = useState({
    
    productManagerId: userId,
    BOMName: bomDetail.bomname,
    BOMStatus: status,
    timeProduction: bomDetail.timeProduction,
    unit: unit,
    totalPrice: bomDetail.totalPrice,
    sellPrice: bomDetail.sellPrice,
    dateCreation: bomDetail.dateCreation,
    bomDetails: [
        {
            material: {
                materialName: '',
                materialPrice: '',
                materialUnit: '',
                materialVolume: ''
            },
            quantity: '',
            totalUnitPrice: ''
        }
    ]
    });

 const handleInputChange = (name, value) => {
        setBOMUpdate(prevState => ({ ...prevState, [name]: value }));
        console.log("BOMUpdate: ", BOMUpdate);
    };

    const handleAddMaterial = () => {
        
        if (!newMaterialName || !newMaterialPrice || !newMaterialQuantity) {
            alert('All fields must be filled out to add a new material.');
            return;
          }

        const newMaterial = {
          materialId: Date.now(),
          materialName: newMaterialName,
          materialUnit: newMaterialUnit,
          materialPrice: newMaterialPrice,
          materialQuantity: newMaterialQuantity,
        };
      
        setMaterials([...materials, newMaterial]);
        setBomDetail(prevState => ({
            ...prevState,
            materials: [...prevState.materials, newMaterial]
          }));

        console.log("materials: ", materials);
        // Clear the input fields
        setNewMaterialName('');
        setNewMaterialUnit('');
        setNewMaterialPrice('');
        setNewMaterialQuantity('');
      };


      const handleDeleteMaterial = (materialId) => {
        Alert.alert(
          "Delete Material",
          "Are you sure you want to delete this material?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { 
              text: "OK", 
              onPress: () => {
                // Add the material to the tempDeletedMaterials state
                setTempDeletedMaterials([...tempDeletedMaterials, materialId]);
                // Remove the material from the materials array
                setMaterials(materials.filter(material => material.materialId !== materialId));

                // Remove the material from the bomDetail.materials array
                setBomDetail(prevState => ({
                  ...prevState,
                  materials: prevState.materials.filter(material => material.materialId !== materialId)
                }));
              } 
            }
          ]
        );
      };

      const createRequestBody = (bomDetail) => {
        const requestBody = {
          productManagerId: userId,
          BOMName: bomDetail.bomname,
          BOMStatus: bomDetail.bomstatus,
          timeProduction: bomDetail.timeProduction,
          unit: bomDetail.unit,
          totalPrice: bomDetail.totalPrice,
          sellPrice: bomDetail.sellPrice,
          bomDetails: bomDetail.materials.map(material => ({
            material: {
              materialName: material.materialName,
              materialPrice: material.materialPrice,
              materialUnit: material.materialUnit,
              materialVolume: material.materialVolume,
            },
            quantity: material.materialQuantity,
            totalUnitPrice: material.materialPrice * material.materialQuantity,
          })),
        };
      
        return requestBody;
      };

      const handleSave = async () => {
        try {
          const requestBody = createRequestBody(bomDetail);
          const updatedBOM = await updateBOM(token, id, requestBody);
          console.log('Updated BOM:', updatedBOM);
          Alert.alert(
            "Success",
            "BOM saved successfully",
            [
              { text: "OK" }
            ]
          );
        } catch (error) {
          console.log('Failed to save BOM:', error);
        }

        setTempDeletedMaterials([]);
      };

  const handleDelete = () => {
    console.log("check material: ", materials);
    console.log("unit: ", newMaterialUnit);
    console.log("request body: ", createRequestBody(bomDetail));
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
                            <Title>{bomDetail.productManager?.fullName}</Title>
                            <Title>BOM Name: {bomDetail.bomname}</Title>
                        </Card.Content>
                    </Card>

                    <Card style={{ padding: 10, margin: 10 }}>
                        <Card.Content>
                            <Title>Time Production:</Title>
                            <TextInput
                                label="Time Production"
                                defaultValue={bomDetail.timeProduction ? bomDetail.timeProduction.toString() : ''}
                                onChangeText={(value) => handleInputChange('timeProduction', value)}
                                style={{ backgroundColor: '#fff', marginBottom: 10 }}
                            />

                            <Title>Total Price:</Title>
                            <TextInput
                            label="Total Price"
                            defaultValue={bomDetail.totalPrice ? bomDetail.totalPrice.toString() : ''}
                            onChangeText={(value) => handleInputChange('totalPrice', value)}
                            style={{ backgroundColor: '#fff', marginBottom: 10 }}
                            />

                            <Title>Sell Price:</Title>
                            <TextInput
                            label="Sell Price"
                            defaultValue={bomDetail.sellPrice ? bomDetail.sellPrice.toString() : ''}
                            onChangeText={(value) => handleInputChange('sellPrice', value)}
                            style={{ backgroundColor: '#fff', marginBottom: 10 }}
                            />

                            <Title>Date Creation:</Title>
                            <TextInput
                            label="Date Creation"
                            defaultValue={bomDetail.dateCreation ? bomDetail.dateCreation.toString() : ''}
                            onChangeText={(value) => handleInputChange('dateCreation', value)}
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
                        <View style={{ flex: 1, height: 900 }}>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title><View style={{ flex: 2 }}><Text>Material</Text></View></DataTable.Title>
                                    <DataTable.Title><View style={{ flex: 4 }}><Text>Unit</Text></View></DataTable.Title>
                                    <DataTable.Title><View style={{ flex: 3 }}><Text>Price</Text></View></DataTable.Title>
                                    <DataTable.Title><View style={{ flex: 2 }}><Text>Quantity</Text></View></DataTable.Title>
                                </DataTable.Header>

                                {Array.isArray(bomDetail.materials) && bomDetail.materials.map((item, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell><View style={{ flex: 2 }}><Text>{item.materialName}</Text></View></DataTable.Cell>
                                        <DataTable.Cell><View style={{ flex: 4 }}><Text>{item.materialUnit}</Text></View></DataTable.Cell>
                                        <DataTable.Cell><View style={{ flex: 3 }}><Text>{item.materialPrice}</Text></View></DataTable.Cell>
                                        <DataTable.Cell><View style={{ flex: 2 }}><Text>{item.materialQuantity}</Text></View></DataTable.Cell>
                                        <DataTable.Cell><View style={{ flex: 0.1 }}><IconButton iconName="trash" onPress={() => handleDeleteMaterial(item.materialId)}/></View></DataTable.Cell>
                                    </DataTable.Row>
                                ))}

                                <DataTable.Row>
                                <DataTable.Cell><View style={{ flex: 2 }}><TextInput placeholder="Material" value={newMaterialName} onChangeText={setNewMaterialName} /></View></DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2 }} >
                                    <View style={{ flex: 1 }}>
                                    <Picker
                                        selectedValue={newMaterialUnit}
                                        onValueChange={setNewMaterialUnit}
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
                                <DataTable.Cell><View style={{ flex: 3 }}><TextInput placeholder="Price" value={newMaterialPrice} onChangeText={setNewMaterialPrice} /></View></DataTable.Cell>
                                <DataTable.Cell><View style={{ flex: 2 }}><TextInput placeholder="Quantity" value={newMaterialQuantity} onChangeText={setNewMaterialQuantity} /></View></DataTable.Cell>
                                <DataTable.Cell><View style={{ flex: 0.1 }}><IconButton iconName="plus" onPress={handleAddMaterial} /></View></DataTable.Cell>
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