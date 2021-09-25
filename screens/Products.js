import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase";
import styles from "./styles";
import firebase from "firebase/app";
export default function Screen11({ navigation }) {
	const [products, setProducts] = useState([]);

	const onPressProduct = (item) => {
		addListenersArray(item).then(() => {
			navigation.navigate("Eighth Screen", { item });
		});
	};

	const addListenersArray = async (item) => {
		await db
			.collection("products")
			.doc(item.key)
			.update({
				products: firebase.firestore.FieldValue.arrayUnion(
					auth?.currentUser?.uid
				),
			});
	};

	const DATA = products.map(
		({
			id,
			data: { productName, productPrice, productPhotoUrl, productAdderAuthID },
		}) => {
			return {
				key: id,
				image: productPhotoUrl,
				name: productName,
				price: productPrice,
				sellerID: productAdderAuthID,
			};
		}
	);

	useEffect(() => {
		const subscriber = db.collection("products").onSnapshot((snapshot) =>
			setProducts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);

		return subscriber;
	}, []);

	return (
		<FlatList
			style={styles.Screen}
			data={DATA}
			renderItem={({ item }) => (
				<View>
					<TouchableOpacity onPress={() => onPressProduct(item)}>
						<View style={styles.Product}>
							<Image
								style={styles.ProductPhoto}
								source={{ uri: item.image }}
							></Image>
							<View>
								<Text style={styles.ProductInfo}>{item.name}</Text>

								<Text style={styles.ProductPrice}>{item.price}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			)}
		/>
	);
}
