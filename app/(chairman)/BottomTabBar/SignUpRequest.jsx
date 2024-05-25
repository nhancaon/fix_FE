import React, { useState, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./stylesSignUp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ToastMessage, AppLoader } from "../../../components";
import { useGlobalContext } from "../../../context/GlobalProvider";
import {
  getSignUpRequest,
  acceptSignUpRequest,
  deleteUser,
} from "../../../services/UserServices";
import RNPickerSelect from "react-native-picker-select";

const SignUpRequest = () => {
  const { userLogin, searchText, setSearchText } = useGlobalContext();
  const navigation = useNavigation();
  const [dataResponse, setDataResponse] = useState([]);
  const successToastRef = useRef(null);
  const errorToastRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSignUpRequest(userLogin.id);
      if (data && data.data) {
        setDataResponse(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userLogin.id]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleCardPress = (item) => {
    navigation.navigate("SignUpDetail", { data: item });
  };

  const handleOptionChange = (index, option) => {
    setSelectedOption((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const removeCard = (index) => {
    console.log("This card order: ", index);
    setDataResponse((prevData) => {
      const remainingData = prevData.filter((_, i) => i !== index);
      const updatedData = remainingData.map((item, i) => {
        item.index = i; // Assigning the index property
        return item;
      });
      console.log(
        "Updated card indices:",
        updatedData.map((item) => item.index)
      );
      return updatedData;
    });
  };

  const handleDeny = async (index) => {
    try {
      await deleteUser(dataResponse[index].id);
      if (successToastRef.current) {
        successToastRef.current.show({
          type: "success",
          text: "Deny signup request",
          description: "User has been denied.",
        });
      }
      removeCard(index);
      fetchData();
    } catch (error) {
      console.error(error);
      if (errorToastRef.current) {
        errorToastRef.current.show({
          type: "danger",
          text: "Error",
          description: "Failed to deny user.",
        });
      }
    }
  };

  const handleAccept = async (index, option) => {
    if (!option) {
      if (errorToastRef.current) {
        errorToastRef.current.show({
          type: "danger",
          text: "Error",
          description: "Please select a role before accepting.",
        });
      }
      return;
    }
    try {
      await acceptSignUpRequest(dataResponse[index].email, option);
      if (successToastRef.current) {
        successToastRef.current.show({
          type: "success",
          text: "Accept signup request",
          description: "User has been accepted.",
        });
      }
      setSelectedOption((prev) => ({
        ...prev,
        [index]: null,
      }));
      removeCard(index);
      fetchData();
    } catch (error) {
      console.error(error);
      if (errorToastRef.current) {
        errorToastRef.current.show({
          type: "danger",
          text: "Error",
          description: "Failed to accept user.",
        });
      }
    }
  };

  const getFilteredData = () => {
    if (searchText.trim() === "") {
      return dataResponse;
    }
    return dataResponse.filter((item) =>
      item.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredData = getFilteredData();

  return (
    <SafeAreaView className="bg-primary h-full">
      <View style={styles.container}>
        <ScrollView>
          {filteredData.map((item, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>New employee</Text>
                <View style={styles.dropdownContainer}>
                  <RNPickerSelect
                    placeholder={{ label: "Select a role...", value: null }}
                    onValueChange={(option) =>
                      handleOptionChange(index, option)
                    }
                    items={[
                      { label: "Chairman", value: "CHAIRMAN" },
                      { label: "Accountant", value: "ACCOUNTANT" },
                      { label: "Product Manager", value: "PRODUCT_MANAGER" },
                    ]}
                    value={selectedOption[index]}
                  />
                </View>
              </View>

              <TouchableOpacity onPress={() => handleCardPress(item)}>
                <View style={styles.cardContentRow}>
                  <Text style={styles.title}>Fullname: {item.fullName}</Text>
                </View>
                <View style={styles.cardContentRow}>
                  <Text style={styles.title}>Email: {item.email}</Text>
                </View>
              </TouchableOpacity>

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
          ))}
        </ScrollView>
      </View>
      {loading && <AppLoader />}

      <ToastMessage type="success" ref={successToastRef} />
      <ToastMessage type="danger" ref={errorToastRef} />
    </SafeAreaView>
  );
};

export default SignUpRequest;
