import { Text, View, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import { getAllInventoryMaterials } from "../../services/InventoryServices";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useFocusEffect } from "@react-navigation/native";
import {
  CustomButton,
  AppLoader,
  ToastMessage,
  AlertWithTwoOptions,
  SFDModal,
} from "../../components";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

const InventoryMaterial = () => {
  const [inventoryMaterials, setInventoryMaterials] = useState([]);
  const { token } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllInventoryMaterials(token);
      setInventoryMaterials(res.result);
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

  return (
    <>
      <View style={styles.container}>
        {inventoryMaterials.length > 0 ? (
          <View style={{ maxHeight: 7 * 80 }}>
            <FlatList
              data={inventoryMaterials.slice().sort((a, b) => a.id.materialId - b.id.materialId)}
              keyExtractor={(item) => item.id.materialId.toString()}
              renderItem={({ item }) => (
                <Card
                  style={styles.card}
                //   onPress={() => handleNavigate(item.id)}
                >
                  <Card.Title
                    title={"Inventory Product.No: " + item.id.materialId}
                    titleStyle={styles.title}
                  />
                  <Card.Content>
                    <Text className="flex text-lg font-psemi text-black">
                      Inventory Name: {item.inventory.name}
                    </Text>
                    <Text className="flex text-lg font-psemi text-black">
                      Material Name : {item.material.name}
                    </Text>
                    <Text className="flex text-lg font-psemi text-black">
                      Quantity : {item.quantity}
                    </Text>
                    <Text className="flex text-lg font-psemi text-black">
                      Safety Stock Amount : {item.safetyStockAmount}
                    </Text>
                  </Card.Content>
                </Card>
              )}
            />
          </View>
        ) : (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>
              No Inventory Materials Available
            </Text>
          </View>
        )}
      </View>
      {loading ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161622",
    flex: 1,
  },
  title: {
    color: "#FFA500",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default InventoryMaterial;
