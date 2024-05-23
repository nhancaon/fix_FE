import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	getSaleForecast,
	addSaleForecast,
	deleteSaleForecast,
} from "../../services/SaleForecastService";
import {
	getAllOrder,
	addOrder,
	deleteOrder,
	updateOrder,
} from "../../services/OrderService";
import {
	CustomButton,
	AppLoader,
	ToastMessage,
	AlertWithTwoOptions,
	SFModal,
	OCModal,
} from "../../components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";

const ProduceOrder = () => {
	const { token, userLogin } = useGlobalContext();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const successToastRef = useRef(null);
	const errorToastRef = useRef(null);
	const [confirmationModalVisible, setConfirmationModalVisible] =
		useState(false);
	const [sfModalVisible, setsfModalVisible] = useState(false);
	const [ocModalVisible, setocModalVisible] = useState(false);
	const [id, setId] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const navigation = useNavigation();
	const [formCreate, setFormCreate] = useState({
		quantity: 0,
		totalPrice: 0,
		totalSalePrice: 0,
	});

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const res = await getAllOrder(token);
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

	const createPress = (item) => {
		setocModalVisible(true);
	};

	const handleNavigate = (id) => {
		navigation.navigate("OrderDetailPage", { itemId: id });
	};

	async function createOrder(name, contact, kindOrder, dateEnd) {
		try {
			setLoading(true);
			const add_res = await addOrder(
				token,
				parseInt(userLogin.id),
				name,
				contact,
				dateEnd,
				kindOrder
			);
			if (!add_res) {
				if (errorToastRef.current) {
					errorToastRef.current.show({
						type: "danger",
						text: "Error",
						description: "Fail to add!",
					});
				}
			} else {
				if (successToastRef.current) {
					successToastRef.current.show({
						type: "success",
						text: "Success",
						description: "Add successfully!",
					});
				}
				await fetchData();
			}
		} catch (error) {
			Alert.alert("Error", "Failed to create sale forecast");
		} finally {
			setLoading(false);
		}
	}

	async function delSaleForecast(id) {
		try {
			setLoading(true);
			const del_res = await deleteSaleForecast(token, id);
			if (!del_res) {
				if (errorToastRef.current) {
					errorToastRef.current.show({
						type: "danger",
						text: "Error",
						description: "Fail to delete!",
					});
				}
			} else {
				if (successToastRef.current) {
					successToastRef.current.show({
						type: "success",
						text: "Success",
						description: "Delete successfully!",
					});
				}
				await fetchData();
			}
		} catch (error) {
			Alert.alert("Error", "Failed to delete sale forecast");
		} finally {
			setLoading(false);
		}
	}

	async function upOrder(name, contact, kindOrder, dateStart, dateEnd) {
		try {
			setLoading(true);
			const up_res = await updateOrder(
				token,
				id,
				name,
				contact,
				dateStart,
				dateEnd,
				kindOrder
			);
			if (!up_res) {
				if (errorToastRef.current) {
					errorToastRef.current.show({
						type: "danger",
						text: "Error",
						description: "Fail to update!",
					});
				}
			} else {
				if (successToastRef.current) {
					successToastRef.current.show({
						type: "success",
						text: "Success",
						description: "Update successfully!",
					});
				}
				await fetchData();
			}
		} catch (error) {
			Alert.alert("Error", "Failed to update order");
		} finally {
			setLoading(false);
		}
	}
	return (
		<>
			<SafeAreaView style={styles.backgroundColor}>
				<View style={styles.container}>
					<ScrollView horizontal>
						<View className="flex">
							{data.length > 0 ? (
								<View style={{ maxHeight: 8 * 84 }}>
									<FlatList
										data={data.slice().sort((a, b) => a.id - b.id)}
										keyExtractor={(item) => item.id.toString()}
										renderItem={({ item }) => (
											<Card
												style={styles.card}
												onPress={() => handleNavigate(item.id)}
											>
												<Card.Title
													title={"Order.No: " + item.id}
													titleStyle={styles.title}
												/>
												<Card.Content>
													<Text className="flex text-lg font-psemi text-black">
														Kind Order: {item.kindOrder}
													</Text>
													<Text className="flex text-lg font-psemi text-black">
														Order Status: {item.orderStatus}
													</Text>
													<Text className="flex text-lg font-psemi text-black">
														Total Price: {item.totalPrice}
													</Text>
													<Text className="flex text-lg font-psemi text-black">
														Date Start: {item.dateStart}
													</Text>
													<Text className="flex text-lg font-psemi text-black">
														Date End: {item.dateEnd}
													</Text>
													<Text className="flex text-lg font-psemi text-black">
														Customer name: {item.customer.name}
													</Text>
													<Text className="flex text-lg font-psemi text-black">
														Customer Contact: {item.customer.contact}
													</Text>
												</Card.Content>

												<View style={styles.row}>
													<CustomButton
														title="Update"
														handlePress={() => {
															setsfModalVisible(true);
															setId(item.id);
															setStartDate(new Date(item.dateStart));
															if (item.dateEnd === null) {
																setEndDate(new Date(item.dateStart));
															} else {
																setEndDate(new Date(item.dateEnd));
															}
														}}
														containerStyles="flex w-40 bg-green-500 m-1"
														isLoading={false}
													/>
													<CustomButton
														title="Delete"
														handlePress={() => {
															setConfirmationModalVisible(true);
															setId(item.id);
														}}
														containerStyles="flex w-40 bg-red-500"
														isLoading={false}
													/>
												</View>
											</Card>
										)}
									/>
								</View>
							) : (
								<Text style={styles.noDataText}>No data available</Text>
							)}
						</View>
					</ScrollView>
				</View>
				<CustomButton
					icon={"plus"}
					iconSize={28}
					containerStyles="p-0 absolute bottom-32 self-end right-4 h-12 w-12 rounded-full bg-green-500 items-center justify-center"
					handlePress={() => {
						setocModalVisible(true);
					}}
					isLoading={false}
				/>
			</SafeAreaView>
			{loading ? <AppLoader /> : null}

			<ToastMessage type={"success"} ref={successToastRef}></ToastMessage>

			<ToastMessage type="danger" ref={errorToastRef} />

			<AlertWithTwoOptions
				visible={confirmationModalVisible}
				message="Are you sure?"
				onYesPress={() => {
					delSaleForecast(id);
					setConfirmationModalVisible(false);
				}}
				onNoPress={() => setConfirmationModalVisible(false)}
			/>
			<SFModal
				visible={sfModalVisible}
				onClose={() => setsfModalVisible(false)}
				onSavePress={(dateStart, dateEnd) => {
					upOrder(dateStart, dateEnd);
					setsfModalVisible(false);
				}}
				initialStartDate={startDate}
				initialEndDate={endDate}
			/>
			<OCModal
				visible={ocModalVisible}
				onClose={() => setocModalVisible(false)}
				onSavePress={(dateEnd, name, contact, kindOrder) => {
					createOrder(name, contact, kindOrder, dateEnd);
					setocModalVisible(false);
				}}
				initialName={""}
				initialContact={""}
				initialKindOrder={""}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	backgroundColor: {
		backgroundColor: "#161622",
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: "#161622",
		paddingVertical: 0,
		paddingHorizontal: 0,
	},
	row: {
		flexDirection: "row",
		marginVertical: 0,
		marginHorizontal: 0,
		alignItems: "center",
		elevation: 1,
		borderRadius: 3,
		paddingHorizontal: 0,
		paddingVertical: 10,
		backgroundColor: "#fff",
		borderColor: "#fff",
	},
	noDataText: {
		textAlign: "center",
		marginTop: 20,
		fontSize: 16,
		color: "#aaa",
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

export default ProduceOrder;
