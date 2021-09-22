import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase";
import styles from "./styles";

export default function Screen11({ navigation }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState();
	const [sellerName, setSellerName] = useState("");
	const [price, setPrice] = useState("");
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const subscriber = db.collection("users").onSnapshot((querySnapshot) => {
			const users = [];

			querySnapshot.forEach((documentSnapshot) => {
				users.push({
					...documentSnapshot.data(),
					key: documentSnapshot.id,
				});
			});
			setUsers(users);
			setLoading(false);
		});

		return () => subscriber();
	}, []);

	if (loading) {
		return <ActivityIndicator />;
	}
	const getProduct = async () => {
		await db
			.collection("products")
			.doc(auth?.currentUser?.uid)
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setName(doc.get("productName"));
					setImage(doc.get("productPhotoUrl"));
					setPrice(doc.get("productPrice"));
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
		<FlatList
			style={styles.Screen}
			data={users}
			renderItem={({}) => (
				<View>
					<TouchableOpacity
						onPress={() => navigation.navigate("Eighth Screen")}
					>
						<View style={styles.Product}>
							<Image
								style={styles.ProductPhoto}
								source={{ uri: image }}
							></Image>

							<View>
								<Text style={styles.ProductInfo}>{name}</Text>
								<Text style={styles.ProductSeller}>{sellerName}</Text>
								<Text style={styles.ProductPrice}>{price}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			)}
		/>
	);
}
