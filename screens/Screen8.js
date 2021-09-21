import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase";
import styles from "./styles";

const Screen8 = ({ navigation }) => {
	const deleteProduct = async () => {
		await db.collection("products").doc(auth?.currentUser?.uid).delete();
		navigation.navigate("Ninth Screen");
	};
	const getProduct = async () => {
		await db
			.collection("products")
			.doc(auth?.currentUser?.uid)
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setName(doc.get("productName"));
					setImage(doc.get("productPhotoUrl"));
					setAbout(doc.get("productAbout"));
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	};
	getProduct();
	const [name, setName] = useState("");
	const [image, setImage] = useState();
	const [about, setAbout] = useState("");
	return (
		<View style={styles.Screen}>
			<View style={styles.ProductButtons}>
				<TouchableOpacity
					style={styles.UpdateButton}
					onPress={() => navigation.navigate("Tenth Screen")}
				>
					<Text style={styles.Update}>Güncelle</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.DeleteButton} onPress={deleteProduct}>
					<Text style={styles.Delete}>Sil</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.ProductName}>{name}</Text>
			<Image
				style={styles.Photo}
				source={{
					uri: image,
				}}
			/>
			<Text style={styles.ProductName}>{about}</Text>
		</View>
	);
};

export default Screen8;
