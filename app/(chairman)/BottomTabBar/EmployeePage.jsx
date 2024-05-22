import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './stylesEmployee';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CustomButton, ToastMessage, AppLoader } from '../../../components';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { getAllEmployee, acceptSignUpRequest, deleteUser } from '../../../services/UserServices';

const Employee = () => {
  const { setUser, setIsLogged, userLogin } = useGlobalContext();
  const navigation = useNavigation();
  const [dataResponse, setDataResponse] = useState([]);
  const successToastRef = useRef(null);
  const errorToastRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllEmployee(userLogin.id);
      if (data && data.data) {
        setDataResponse(data.data);
      }
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userLogin.id]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const navigateEmployeeDetail = (item) => {
    navigation.navigate('EmployeeDetail', { data: item });
  };

  const navigateEmployeeCreate = (item) => {
    navigation.navigate('EmployeeCreate');
  };

  const removeCard = (index) => {
    setDataResponse((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    deleteUser(dataResponse[index].id);
    if (successToastRef.current) {
      successToastRef.current.show({
        type: 'success',
        text: 'Delete employee successfully',
        description: 'User '+ dataResponse[index].fullName + ' has been deleted.'
      });
    }
    removeCard(index);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View style={styles.container}>
        <ScrollView>
          {dataResponse.map((item, index) => (
              <View style={[styles.card, index === dataResponse.length - 1 ? { marginBottom: 20 } : {}]}>
                <View style={styles.headerContainer}>
                  <Text style={styles.header}>Role: {item.role.roleName}</Text>
                </View>
                <View style={styles.cardContentRow}>
                  <Text style={styles.title}>Fullname: {item.fullName}</Text>
                </View>
                <View style={styles.cardContentRow}>
                  <Text style={styles.title}>Email: {item.email}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(index)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.updateButton]}
                    onPress={() => navigateEmployeeDetail(item)}
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
          ))}
      </ScrollView>
      </View>
      <CustomButton
        title="Add"
        handlePress={() => navigateEmployeeCreate()}
        containerStyles="absolute bottom-32 self-center w-20"
        isLoading={false}
      />
      {loading ? <AppLoader /> : null}

      <ToastMessage
        type={"success"}
        ref={successToastRef}
      />
      <ToastMessage
        type="danger"
        ref={errorToastRef}
      />
    </SafeAreaView>
  );
};

export default Employee;
