import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	FlatList,
	TouchableOpacity,
	Alert,
	TextInput,
	Button,
} from "react-native";
import { getWorkOrderToday } from "../../services/WorkOrderServices";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppLoader } from "../../components";

const ProductManagerHome = () => {
	const { token, userId } = useGlobalContext();
	const navigation = useNavigation();
	const [workOrders, setWorkOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				setLoading(true);
				const data = await getWorkOrderToday(token);
				setWorkOrders(data.result);
				setLoading(false);
			};

			fetchData();
		}, [token, userId])
	);

	const handleCardPress = (id) => {
		try {
			navigation.navigate("ProductManagerHomeDetail", { id });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<SafeAreaView style={styles.backgroundColor}>
			<View style={{ padding: 10 }}>
				<FlatList
					data={workOrders}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<Card style={styles.card} onPress={() => handleCardPress(item.id)}>
							<Card.Title title={"ID: " + item.id} titleStyle={styles.title} />
							<Card.Content>
								<View className="flex-row mb-2">
									<Text className="text-lg font-semibold text-black mr-2">
										Start Date:
									</Text>
									<Text className="text-lg text-black">{item.dateStart}</Text>
								</View>
								<View className="flex-row mb-2">
									<Text className="text-lg font-semibold text-black mr-2">
										End Date:
									</Text>
									<Text className="text-lg text-black">{item.dateEnd}</Text>
								</View>
								<View className="flex-row mb-2">
									<Text className="text-lg font-semibold text-black mr-2">
										Status:
									</Text>
									<Text className="text-lg text-black">
										{item.workOrderStatus}
									</Text>
								</View>
							</Card.Content>
						</Card>
					)}
				/>
			</View>
			{loading ? <AppLoader /> : null}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
	},
	sidebar: {
		flex: 2,
		backgroundColor: "#f5f5f5",
		padding: 10,
	},
	mainContent: {
		flex: 8,
		backgroundColor: "#fff",
		padding: 10,
	},
	backgroundColor: {
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
		margin: 8, // Add margin around the Card
		padding: 10, // Add padding inside the Card
		backgroundColor: "#f8f8f8", // Change the background color of the Card
		borderRadius: 10, // Add rounded corners to the Card
	},
});

export default ProductManagerHome;
