import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../../constants';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure you have react-native-vector-icons installed

const SignUpDetail = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  const dateOfBirth = new Date(data.dateOfBirth).toLocaleDateString('en-CA'); 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.rectangle}>
        {/* Image */}
        <Image
          source={images.accountant}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* User Information */}
        <Text style={styles.header}>Employee Profile</Text>
        <View style={styles.userInfo}>
          <View style={styles.userInfoItem}>
            <Text style={styles.label}>Full name:</Text>
            <Text style={styles.value}>{data.fullName}</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{data.email}</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.label}>Date of birth: </Text>
            {typeof dateOfBirth === 'string' ? (
              <Text style={styles.value}>{dateOfBirth}</Text>
            ) : (
              <Text style={styles.value}>Invalid date</Text>
            )}
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.label}>Phone number: </Text>
            <Text style={styles.value}>{data.phoneNumber}</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.label}>Address: </Text>
            <Text style={styles.value}>{data.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  rectangle: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '60%',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFA500',
    textAlign: 'center',
  },
  userInfo: {
    alignItems: 'flex-start',
  },
  userInfoItem: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 24,
    marginRight: 5,
  },
  value: {
    marginRight: 5,
    fontSize: 24,
  },
});

export default SignUpDetail;
