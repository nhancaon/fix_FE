import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { ToastMessage } from '../../../components';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { getSignUpRequest, acceptSignUpRequest, deleteUser } from '../../../services/UserServices';
import RNPickerSelect from 'react-native-picker-select';

const SignUpRequest = () => {
  const { setUser, setIsLogged, userLogin } = useGlobalContext();
  const navigation = useNavigation();
  const [dataResponse, setDataResponse] = useState([]);
  const successToastRef = useRef(null);
  const errorToastRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSignUpRequest(1);
        if (data && data.data) {
          setDataResponse(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleCardPress = (item) => {
    navigation.navigate('SignUpDetail', { data: item });
  };

  const handleOptionChange = (index, option) => {
    setSelectedOption((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const removeCard = (index) => {
    setDataResponse((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleDeny = (index) => {
    deleteUser(dataResponse[index].id);
      if (successToastRef.current) {
        successToastRef.current.show({
          type: 'success',
          text: 'Deny signup request',
          description: 'User has been denied.'
        });
      }
    removeCard(index);
  };

  const handleAccept = (index, option) => {
    if (!option) {
      if (errorToastRef.current) {
        errorToastRef.current.show({
          type: 'danger',
          text: 'Error',
          description: 'Please select a role before accepting.'
        });
      }
      return;
    }
    else{
      acceptSignUpRequest(dataResponse[index].email, option);
      if (successToastRef.current) {
        successToastRef.current.show({
          type: 'success',
          text: 'Accept signup request',
          description: 'User has been accepted.'
        });
      }
    }
    removeCard(index);
  };

  return (
    <View style={styles.container}>
      {dataResponse.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleCardPress(item)}>
          <View style={styles.card}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>New employee</Text>
              <View style={styles.dropdownContainer}>
                <RNPickerSelect
                  placeholder={{ label: 'Select a role...', value: null }}
                  onValueChange={(option) => handleOptionChange(index, option)}
                  items={[
                    { label: 'Chairman', value: 'CHAIRMAN' },
                    { label: 'Accountant', value: 'ACCOUNTANT' },
                    { label: 'Product Manager', value: 'PRODUCT_MANAGER' },
                  ]}
                />
              </View>
            </View>

            <View style={styles.cardContentRow}>
              <Text style={styles.title}>Fullname: {item.fullName}</Text>
            </View>
            <View style={styles.cardContentRow}>
              <Text style={styles.title}>Email: {item.email}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.denyButton]}
                onPress={() => handleDeny(index)}
              >
                <Text style={styles.buttonText}>Deny</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() => handleAccept(index, selectedOption[index])}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <ToastMessage
        type={"success"}
        ref={successToastRef}></ToastMessage>
    
      <ToastMessage
        type="danger"
        ref={errorToastRef}/>
    </View>
  );
};

export default SignUpRequest;
