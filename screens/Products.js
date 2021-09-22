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
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const subscriber = db.collection("products").onSnapshot((querySnapshot) => {
			const products = [];

			querySnapshot.forEach((documentSnapshot) => {
				products.push({
					...documentSnapshot.data(),
					key: documentSnapshot.id,
				});
			});
			setProducts(products);
			setLoading(false);
		});

		return () => subscriber();
	}, []);

	if (loading) {
		return <ActivityIndicator />;
	}
	async function getProduct(db) {
		const snapshot = await db.collection("products").get();
		snapshot.forEach((doc) => {
			setName(doc.get("productName"));
			setImage(doc.get("productPhotoUrl"));
			setPrice(doc.get("productPrice"));
		});
	}

	async function getSeller(db) {
		const snapshot = await db.collection("users").get();
		snapshot.forEach((doc) => {
			setSellerName(doc.get("sellerName"));
		});
	}
	getSeller(db);
	getProduct(db);
	return (
		<FlatList
			style={styles.Screen}
			data={products}
			renderItem={({ product }) => (
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
