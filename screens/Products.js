import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase";
import styles from "./styles";

export default function Screen11() {
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [image, setImage] = useState();
	const [sellerName, setSellerName] = useState("");

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
					setSellerName(doc.get("userSellerName"));
				}
			});
	};
	const getSeller = async () => {
		await db
			.collection("users")
			.doc(auth?.currentUser?.uid)
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setSellerName(doc.get("userSellerName"));
				}
			});
	};
	getSeller();
	getProduct();
	return (
		<View style={styles.Screen}>
			<View style={{ backgroundColor: "red" }}>
				<TouchableOpacity>
					<Image></Image>
					<Text>{name}</Text>
					<Text>{about}</Text>
					<Text>{sellerName}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
