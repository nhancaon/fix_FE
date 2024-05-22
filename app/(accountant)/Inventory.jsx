import { Text, View, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import { getAllInventories } from "../../services/InventoryServices";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useFocusEffect } from "@react-navigation/native";
import {
  CustomButton,
  AppLoader,
  ToastMessage,
  AlertWithTwoOptions,
  SFDModal,
} from "../../components";
import { FlatList, Swipeable } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const { token } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllInventories(token);
      setInventories(res.result);
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

  const leftSwipe = () => {
    return (
      <View>
        <Text>Edit</Text>
      </View>
    );
  };

  const rightSwipe = () => {
    return (
      <View>
        <Text>Delete</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {inventories.length > 0 ? (
          <View style={{ maxHeight: 7 * 80 }}>
            <FlatList
              data={inventories.slice().sort((a, b) => a.id - b.id)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Swipeable
                  renderLeftActions={leftSwipe}
                  renderRightActions={rightSwipe}
                >
                  <Card
                    style={styles.card}
                    //   onPress={() => handleNavigate(item.id)}
                  >
                    <Card.Title
                      title={"Inventory .No: " + item.id}
                      titleStyle={styles.title}
                    />
                    <Card.Content>
                      <Text className="flex text-lg font-psemi text-black">
                        Name: {item.name}
                      </Text>
                      <Text className="flex text-lg font-psemi text-black">
                        Address : {item.address}
                      </Text>
                      <Text className="flex text-lg font-psemi text-black">
                        Max Volume : {item.maxVolume}
                      </Text>
                    </Card.Content>
                  </Card>
                </Swipeable>
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
              No Inventory Available
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

export default Inventory;
