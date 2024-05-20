import { Text, View, StyleSheet, Alert, TextInput } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getSaleForecastDetail,deleteSaleForecastDetail, getProductsForSaleForecast, addSaleForecastDetail } from '../../services/SaleForecastDetailService';
import { CustomButton, AppLoader, ToastMessage, AlertWithTwoOptions, SFDUpdateModal } from "../../components";
import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-native-paper';

const SaleForecastDetail = ({ route }) => {
  const { itemId } = route.params;
  const { token, userLogin } = useGlobalContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const successToastRef = useRef(null);
  const errorToastRef = useRef(null);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [sfdModalVisible, setsfdModalVisible] = useState(false);
  const [id, setId] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formUpdate, setFormUpdate] = useState({
    name: '',
    price: 0,
    sellPrice: 0,
    quantity: 0
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getSaleForecastDetail(token,itemId);
      const resp= await getProductsForSaleForecast(token,itemId);
      setData(res.result);
      setDataProducts(resp.result)
    } catch (err) {
      if (errorToastRef.current) {
        errorToastRef.current.show({
          type: 'danger',
          text: 'Error',
          description: error.message
      });}
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  
  const handleQuantityChange = (id, quantity) => {
    setSelectedProducts(prevState => {
      console.log('***'); // Log trạng thái trước đó
      console.log('Previous State:', prevState); // Log trạng thái trước đó
      const existingProduct = prevState.find(product => product.id === id);
      if (existingProduct) {
        const updatedState = prevState.map(product =>
          product.id === id ? { ...product, quantity } : product
        );
        console.log('Updated State:', updatedState); // Log trạng thái sau khi cập nhật
        return updatedState;
      } else {
        const newState = [...prevState, { id, quantity }];
        console.log('New State:', newState); // Log trạng thái sau khi thêm mới
        return newState;
      }
    });
  };

  const handleProductSelect = (id) => {
    setSelectedProducts(prevState => {
      console.log('###'); // Log trạng thái trước đó
      console.log('Previous State:', prevState); // Log trạng thái trước đó

      if (prevState.some(product => product.id === id)) {
        const updatedState = prevState.filter(product => product.id !== id);
        console.log('Updated State (Removed):', updatedState); // Log trạng thái sau khi xóa sản phẩm
        return updatedState;
      } else {
        const newState = [...prevState, { id, quantity: 0 }];
        console.log('New State (Added):', newState); // Log trạng thái sau khi thêm sản phẩm
        return newState;
      }
    });
  };

  async function createSaleForecastDetail() {
    try {
      setLoading(true);
      if (selectedProducts.some(item => item.quantity === 0)) {
        throw new Error('Quantitity must > 0');
      }
      if (selectedProducts.length === 0) {
        throw new Error('Choose products first');
      }
      console.log(selectedProducts.length);
      let pids = [];
      let quantities = [];
      selectedProducts.forEach(item => {
        pids.push(item.id);
        quantities.push(item.quantity);
      });
      const add_res = await addSaleForecastDetail(token, itemId,pids,quantities);
      if (!add_res) {
        if (errorToastRef.current) {
          errorToastRef.current.show({
            type: 'danger',
            text: 'Error',
            description: 'Fail to add!'
          });
        }
      } else {
        if (successToastRef.current) {
          successToastRef.current.show({
            type: 'success',
            text: 'Success',
            description: 'Add successfully!'
          });
        }
        await fetchData();
        setSelectedProducts([]);
      }
    } catch (error) {
      if (errorToastRef.current) {
        errorToastRef.current.show({
          type: 'danger',
          text: 'Error',
          description: error.message
      });
    }
    } finally {
      setLoading(false);
    }
  }

  async function delSaleForecastDetail(id) {
    try {
      setLoading(true);
      const del_res = await deleteSaleForecastDetail(token, id, itemId);
      if (!del_res) {
        throw new Error('Fail to delete!');
      } else {
        if (successToastRef.current) {
          successToastRef.current.show({
            type: 'success',
            text: 'Success',
            description: 'Delete successfully!'
          });
        }
        await fetchData();
      }
    } catch (error) {
      if (errorToastRef.current) {
        errorToastRef.current.show({
          type: 'danger',
          text: 'Error',
          description: error.message
      });
    }
    } finally {
      setLoading(false);
    }
  }

  async function upSaleForecastDetail(updatedName, updatedPrice, updatedSellPrice, updatedQuantity) {
    try {
      setLoading(true);
      const up_res = await updateSaleForecastDetail(token, itemId, id, updatedName, updatedPrice, updatedSellPrice, updatedQuantity);
      if (!up_res) {
        throw new Error('Fail to update!');
      } else {
        if (successToastRef.current) {
          successToastRef.current.show({
            type: 'success',
            text: 'Success',
            description: 'Update successfully!'
          });
        }
        await fetchData();
      }
    } catch (error) {
      if (errorToastRef.current) {
          errorToastRef.current.show({
            type: 'danger',
            text: 'Error',
            description: error.ToastMessage
          });
        }
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
    <View style={styles.backgroundColor}>
      <View style={styles.container}>
          <View>
              {data.length > 0 ? (
                <View style={{ maxHeight: 4 * 77 }}>
                  <FlatList
                    data={data.slice().sort((a, b) => a.product_id - b.product_id)}
                    keyExtractor={(item) => item.product_id.toString()}
                    renderItem={({ item }) => (
                    <Card style={styles.card} >
                      <Card.Title title={"S.No: "+ item.product_id} titleStyle={styles.title}/>
                      <Card.Content>
                        <Text className="flex text-lg font-psemi text-black">Name:   {item.name}</Text>
                        <Text className="flex text-lg font-psemi text-black">Quantity:     {item.quantity}</Text>
                        <Text className="flex text-lg font-psemi text-black">Total Price:   {item.totalPrice}</Text>
                        <Text className="flex text-lg font-psemi text-black">Total Sale Price:     {item.totalSalePrice}</Text>
                      </Card.Content>

                      <View style={styles.row}>
                        <CustomButton
                          title="Update"
                          handlePress={() => {
                            setsfdModalVisible(true);
                            setId(item.product_id);
                            setFormUpdate({
                              name: item.name,
                              price: item.price,
                              sellPrice: item.sellPrice,
                              quantity: item.quantity
                            });
                          }}
                          containerStyles="flex items-center self-center w-40 mr-6 bg-green-500"
                          isLoading={false}
                        />
                        <CustomButton
                          title="Delete"
                          handlePress={() => {
                            setConfirmationModalVisible(true);
                            setId(item.product_id);
                          }}
                          containerStyles="flex items-center self-center w-40 mr-10 bg-red-500"
                          isLoading={false}
                      /></View>
                    </Card>
                    )}
                  />
                </View>
              ) : (
                <Text style={styles.noDataText}>No data available</Text>
              )}
          </View>
      </View>
      <View style={{ marginBottom: 210 }}>
        <View style={styles.header}>
                        <Text className="flex text-base text-center font-psemibold text-black py-1 pr-7">ID</Text>
                        <Text className="flex text-base text-center font-psemibold text-black py-1 pr-16">Name</Text>
                        <Text className="text-base text-center font-psemibold text-black py-1 pr-5">Price</Text>
                        <Text className="text-base text-center font-psemibold text-black p-1">Sell Price</Text>
                        <Text className="text-base text-center font-psemibold text-black p-1">Quantity</Text>
                      </View>
              {dataProducts.length > 0 ? (
                <View style={{ maxHeight: 3 * 75 }}>
                  <FlatList
                    data={dataProducts.slice().sort((a, b) => a.id - b.id)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                    <Card style={[
                      styles.cardRows,
                      selectedProducts.some(product => product.id === item.id) ? { backgroundColor: 'rgb(34, 197, 94)' } : null
                      ]} onPress={() => handleProductSelect(item.id)}>
                      <Card.Content style={[styles.cardContentRow,
                        selectedProducts.some(product => product.id === item.id) ? { backgroundColor: 'rgb(34, 197, 94)' } : null
                      ]}>
                        <Text className="flex text-lg text-center font-psemibold text-black p-1">{item.id}</Text>
                        <Text className="flex text-lg font-psemi text-black w-28 m-2">{item.name}</Text>
                        <Text className="flex text-lg font-psemi text-black mr-3">{item.price}</Text>
                        <Text className="flex text-lg font-psemi text-black mr-5">{item.sellPrice}</Text>
                        <TextInput 
                          placeholder="Quantity"
                          keyboardType="numeric"
                          onChangeText={(quantity) => handleQuantityChange(item.id, parseInt(quantity))} />
                      </Card.Content>
                    </Card>
                    )}
                  />
                </View>
              ) : (
                <Text style={styles.noDataText}>No data available</Text>
              )}
      </View>
      <CustomButton
            title="Add"
            handlePress={createSaleForecastDetail}
            containerStyles="absolute bottom-32 self-center w-20"
            isLoading={false}
          />
    </View>
    {loading ? <AppLoader/>: null}

    <ToastMessage
      type={"success"}
      ref={successToastRef}></ToastMessage>
    
    <ToastMessage
      type="danger"
      ref={errorToastRef}/>
    
    <AlertWithTwoOptions
      visible={confirmationModalVisible}
      message="Are you sure?"
      onYesPress={() => {
        delSaleForecastDetail(id);
        setConfirmationModalVisible(false);
      }}
      onNoPress={() => setConfirmationModalVisible(false)}/>

    <SFDUpdateModal
      visible={sfdModalVisible}
      id={id}
      name={formUpdate.name}
      price={formUpdate.price}
      sellPrice={formUpdate.sellPrice}
      quantity={formUpdate.quantity}
      onUpdate={(updatedName, updatedPrice, updatedSellPrice, updatedQuantity) => {
        upSaleForecastDetail(updatedName, updatedPrice, updatedSellPrice, updatedQuantity);
      }}
      onClose={() => setsfdModalVisible(false)}
    />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#161622',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#161622',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 0,
    marginHorizontal: 0,
    alignItems: 'center',
    elevation:1,
    borderRadius: 3,
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#fff'
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#aaa',
  },
  title: {
    color: '#FFA500',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: '#ff9c01',
  },
  cardRows: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 0,
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderColor: '#fff'
  },
});

export default SaleForecastDetail;
