import { Text, View, StyleSheet, Alert } from 'react-native';
import React, { useState,useEffect,useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getAllSaleForecast,addSaleForecast } from '../../services/SaleForecastService';
import { AppLoader } from '../../components/AppLoader';
import { CustomButton } from "../../components";
import { useFocusEffect } from '@react-navigation/native';

const SaleForecast = () => {
  const { token, userLogin } = useGlobalContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Tokenqq:', token);
      const res = await getAllSaleForecast(token);
      console.log('Get all sale forecast', res);
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
    const add_res = await addSaleForecast(token, parseInt(userLogin.id));
    console.log('Add sale forecast',token);
    console.log('Add sale forecast',userLogin.id);
      if (!add_res) {
        Alert.alert("Failed", "Password or email is incorrect");
      }
  }
  //if (loading) return AppLoader;
  //if (error) return <Text>Error: {error.message}</Text>;
  console.log('Get all haha',data);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text className="flex text-lg text-center font-psemibold text-black w-20">{item.id}</Text>
        <Text className="flex text-lg font-psemi text-black w-40">{item.dateStart}</Text>
        <Text className="flex text-lg font-psemi text-black w-40">{item.dateEnd}</Text>
        
      </View>
    )
  }
  return (
    <View style={styles.backgroundColor}>
      <View style={styles.container}>
        <ScrollView horizontal>
          <View className="flex">
            <View style={styles.header}>
              <Text className="flex text-lg text-center font-psemibold text-black w-20">S.No</Text>
              <Text className="text-lg text-center font-psemibold text-black w-40">Date Start</Text>
              <Text className="text-lg text-center font-psemibold text-black w-40">Date End</Text>
            </View>
              {data.length > 0 ? (
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
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
    marginVertical: 0,
    marginHorizontal: 0,
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
