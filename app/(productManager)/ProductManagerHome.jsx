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
import { Chatbot } from "../../services/ChatbotServices";

const ProductManagerHome = () => {
	const { token, userId } = useGlobalContext();
	const navigation = useNavigation();
	const [workOrders, setWorkOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState([
		{ label: "Pending", value: "pending" },
		{ label: "Processing", value: "processing" },
		{ label: "Finish", value: "PMcheck" },
	]);

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

	const [input, setInput] = useState("");
	const [response, setResponse] = useState(null);

	const handleInputChange = (text) => {
		setInput(text);
	};

	const handleSubmit = async () => {
		try {
			console.log("input: ", input);
			const chatbotResponse = await Chatbot(input);
			setResponse(chatbotResponse);
		} catch (error) {
			console.error("handle summit error", error);
		}
	};

	return (
		<SafeAreaView style={styles.backgroundColor}>
			<View style={{ padding: 10, maxHeight: 100 * 4 }}>
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
										{items.find((i) => i.value === item.workOrderStatus)
											?.label || item.workOrderStatus}
									</Text>
								</View>
							</Card.Content>
						</Card>
					)}
				/>
			</View>
			{loading ? <AppLoader /> : null}
			<Card
				style={{
					borderColor: "#fff",
					borderWidth: 1,
					minHeight: 200,
					borderRadius: 10,
					padding: 10,
					backgroundColor: "#000",
				}}
			>
				<View>
					<Text style={{ fontWeight: "bold", marginBottom: 5, color: "white" }}>
						Chatbot:{" "}
					</Text>
					<ScrollView
						style={{
							maxHeight: 100,
							marginBottom: 10,
						}}
						contentContainerStyle={{ padding: 10 }}
						nestedScrollEnabled={true}
					>
						{response && (
							<Text
								style={{
									padding: 10,
									backgroundColor: "#000",
									borderRadius: 0,
									borderColor: "#000",
									borderWidth: 0,
									marginBottom: 10,
									color: "white",
									maxHeight: 100,
								}}
							>
								{response}
							</Text>
						)}
					</ScrollView>
				</View>
				<View
					style={{
						marginBottom: 10,
					}}
				></View>
			</Card>
			<Card
				style={{
					borderColor: "#fff",
					borderWidth: 1,
					maxHeight: 200,
					borderRadius: 10,
					padding: 10,
					backgroundColor: "#000",
				}}
			>
				<Text style={{ fontWeight: "bold", margin: 0, color: "white" }}>
					You:{" "}
				</Text>
				<TextInput
					style={{
						height: 40,
						backgroundColor: "#fff",
						borderColor: "gray",
						borderWidth: 1,
						borderRadius: 5,
						paddingHorizontal: 10,
						margin: 10,
					}}
					value={input}
					onChangeText={handleInputChange}
					placeholder="Enter chat content here..."
				/>
			</Card>
			<Button title="Submit" onPress={handleSubmit} color="orange" />
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
