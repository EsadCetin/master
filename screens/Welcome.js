import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { db, auth } from "../firebase";
import styles from "./styles";

function Screen6({ navigation }) {
	const [image, setImage] = useState();
	const [mail, setMail] = useState("");
	const [sellerName, setSellerName] = useState("");
	const getUserImage = async () => {
		await db
			.collection("users")
			.doc(auth?.currentUser?.uid)
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setImage(doc.get("userPhotoUrl"));
					setMail(doc.get("userEmail"));
					setSellerName(doc.get("userName"));
				}
			});
	};
	getUserImage();

	return (
		<View style={styles.Screen}>
			<Text style={styles.Text1}>torba</Text>
			<Image
				style={{ width: 150, height: 150, alignSelf: "center" }}
				source={{ uri: image }}
			/>

			<Text style={styles.Success}>Hoşgeldiniz </Text>
			<Text style={styles.Success}>{sellerName}</Text>
			<Text style={styles.Success}>Kayıt Başarılı!</Text>
			<TouchableOpacity
				style={styles.AddProduct}
				onPress={() => navigation.navigate("Seventh Screen")}
			>
				<Text style={styles.Add}>Ürün Ekle</Text>
			</TouchableOpacity>
		</View>
	);
}

export default Screen6;
