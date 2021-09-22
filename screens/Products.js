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
					setSellerName(doc.get("userName"));
				}
			});
	};
	getSeller();
	getProduct();
	return (
		<View style={styles.Screen}>
			<View>
				<TouchableOpacity>
					<View style={styles.Product}>
						<Image style={styles.ProductPhoto} source={{ uri: image }}></Image>
						<Text>{name}</Text>
						<Text>{about}</Text>
						<Text>{sellerName}</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
