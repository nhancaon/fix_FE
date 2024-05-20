import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const SFDUpdateModal = ({ name, price, sellPrice, quantity, visible, onUpdate, onClose }) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedPrice, setUpdatedPrice] = useState(price.toString());
  const [updatedSellPrice, setUpdatedSellPrice] = useState(sellPrice.toString());
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity.toString());

  const handleUpdatePress = () => {
    onUpdate(updatedName, parseFloat(updatedPrice), parseFloat(updatedSellPrice), parseInt(updatedQuantity));
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Sale Forecast Detail</Text>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={updatedName}
            onChangeText={setUpdatedName}
          />
          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            value={updatedPrice}
            onChangeText={setUpdatedPrice}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Sell Price:</Text>
          <TextInput
            style={styles.input}
            value={updatedSellPrice}
            onChangeText={setUpdatedSellPrice}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Quantity:</Text>
          <TextInput
            style={styles.input}
            value={updatedQuantity}
            onChangeText={setUpdatedQuantity}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleUpdatePress} style={[styles.button, { backgroundColor: 'rgb(34, 197, 94)' }]}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: 'rgb(239, 68, 68)' }]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#161622',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff9c01',
    marginBottom: 10,
  },
  label: {
    color: '#ff9c01',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SFDUpdateModal;
