import React, { useState } from "react";
import { Modal } from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase";
import styles from "./styles";

function Screen8({ navigation, route }) {
	const [modalVisible, setModalVisible] = useState();
	const { name, image, about, key, sellerID } = route.params.item;
	const deleteProduct = async () => {
		await db.collection("products").doc(key).delete();
		navigation.navigate("Ninth Screen");
	};

	if (auth?.currentUser?.uid === sellerID) {
		return (
			<View style={styles.Screen}>
				<Modal transparent={true} visible={true}>
					<View style={styles.ProductButtons}>
						<TouchableOpacity
							style={styles.UpdateButton}
							onPress={() => navigation.push("Tenth Screen")}
						>
							<Text style={styles.Update}>Güncelle</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.DeleteButton}
							onPress={deleteProduct}
						>
							<Text style={styles.Delete}>Sil</Text>
						</TouchableOpacity>
					</View>
				</Modal>

				<View style={{ marginTop: "25%" }}>
					<Text style={styles.ProductName}>{name}</Text>
					<Image
						style={styles.Photo}
						source={{
							uri: image,
						}}
					/>
					<Text style={styles.ProductName}>{about}</Text>
					<TouchableOpacity
						style={styles.ProductsButton}
						onPress={() => navigation.push("Esadke")}
					>
						<Text style={styles.Update}>Ürünler</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	} else {
		return (
			<View style={styles.Screen}>
				<Modal transparent={true} visible={false}>
					<View style={styles.ProductButtons}>
						<TouchableOpacity
							style={styles.UpdateButton}
							onPress={() => navigation.push("Tenth Screen")}
						>
							<Text style={styles.Update}>Güncelle</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.DeleteButton}
							onPress={deleteProduct}
						>
							<Text style={styles.Delete}>Sil</Text>
						</TouchableOpacity>
					</View>
				</Modal>

				<View style={{ marginTop: "25%" }}>
					<Text style={styles.ProductName}>{name}</Text>
					<Image
						style={styles.Photo}
						source={{
							uri: image,
						}}
					/>
					<Text style={styles.ProductName}>{about}</Text>
					<TouchableOpacity
						style={styles.ProductsButton}
						onPress={() => navigation.push("Esadke")}
					>
						<Text style={styles.Update}>Ürünler</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Screen8;
