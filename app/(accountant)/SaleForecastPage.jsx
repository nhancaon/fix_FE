import { Text, View, StyleSheet, Alert } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getAllSaleForecast, addSaleForecast, deleteSaleForecast, updateSaleForecast } from '../../services/SaleForecastService';
import { CustomButton, AppLoader, ToastMessage, AlertWithTwoOptions, SFModal } from "../../components";
import { useFocusEffect } from '@react-navigation/native';



const SaleForecast = () => {
  const { token, userLogin } = useGlobalContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const successToastRef = useRef(null);
  const errorToastRef = useRef(null);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [sfModalVisible, setsfModalVisible] = useState(false);
  const [id, setId] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllSaleForecast(token);
      setData(res.result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  async function createSaleForecast() {
    try {
      setLoading(true);
      const add_res = await addSaleForecast(token, parseInt(userLogin.id));
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
      }
    } catch (error) {
      Alert.alert("Error", "Failed to create sale forecast");
    } finally {
      setLoading(false);
    }
  }

  async function delSaleForecast(id) {
    try {
      setLoading(true);
      const del_res = await deleteSaleForecast(token, id);
      if (!del_res) {
        if (errorToastRef.current) {
          errorToastRef.current.show({
            type: 'danger',
            text: 'Error',
            description: 'Fail to delete!'
          });
        }
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
      Alert.alert("Error", "Failed to delete sale forecast");
    } finally {
      setLoading(false);
    }
  }

  async function upSaleForecast(dateStart, dateEnd) {
    try {
      setLoading(true);
      const up_res = await updateSaleForecast(token,id, dateStart,dateEnd);
      if (!up_res) {
        if (errorToastRef.current) {
          errorToastRef.current.show({
            type: 'danger',
            text: 'Error',
            description: 'Fail to update!'
          });
        }
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
      Alert.alert("Error", "Failed to update sale forecast");
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text className="flex text-lg text-center font-psemibold text-black w-20 items-center">{item.id}</Text>
        <CustomButton
            title="Update"
            handlePress={() => {
              setsfModalVisible(true);
              setId(item.id);
              setStartDate(new Date(item.dateStart));
              if (item.dateEnd === null) {
                setEndDate(new Date(item.dateStart));
              }else{
                setEndDate(new Date(item.dateEnd));
              }
              
            }}
            containerStyles="flex items-center self-center w-20 mr-6 bg-green-500"
            isLoading={false}
          />
        <CustomButton
            title="Delete"
            handlePress={() => {
              setConfirmationModalVisible(true);
              setId(item.id);
            }}
            containerStyles="flex items-center self-center w-20 mr-6 bg-red-500"
            isLoading={false}
        />
        <Text className="flex text-lg font-psemi text-black w-40">{item.dateStart}</Text>
        <Text className="flex text-lg font-psemi text-black w-40">{item.dateEnd}</Text>
        
      </View>
    )
  }
  return (
    <>
    <View style={styles.backgroundColor}>
      <View style={styles.container}>
        <ScrollView horizontal>
          <View className="flex">
            <View style={styles.header}>
              <Text className="flex text-lg text-center font-psemibold text-black w-20">S.No</Text>
              <Text className="flex text-lg text-center font-psemibold text-black w-40 ml-56">Date Start</Text>
              <Text className="text-lg text-center font-psemibold text-black w-40">Date End</Text>
            </View>
              {data.length > 0 ? (
                <View style={{ maxHeight: 6 * 77 }}>
                  <FlatList
                    data={data.slice().sort((a, b) => a.id - b.id)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>
              ) : (
                <Text style={styles.noDataText}>No data available</Text>
              )}
          </View>
        </ScrollView>
      </View>
      <CustomButton
            title="Add"
            handlePress={createSaleForecast}
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
        delSaleForecast(id);
        setConfirmationModalVisible(false);
      }}
      onNoPress={() => setConfirmationModalVisible(false)}/>
    <SFModal
      visible={sfModalVisible}
      onClose={() => setsfModalVisible(false)}
      onSavePress={
        (dateStart, dateEnd) => {
          upSaleForecast(dateStart, dateEnd);
          setsfModalVisible(false)
        }
      }
      initialStartDate={startDate}
      initialEndDate={endDate}
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
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: '#ff9c01',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.3,
    marginHorizontal: 0,
    alignItems: 'center',
    elevation:1,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#aaa',
  },
});

export default SaleForecast;
