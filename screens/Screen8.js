import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase";
import styles from "./styles";
import { Audio } from "expo-av";
function Screen8({ navigation }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState();
	const [about, setAbout] = useState("");
	const [sound, setSound] = React.useState();

	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(
			require("../assets/sevgim-yilmaz-bile-bile-yandi-yuregim.mp3")
		);
		setSound(sound);

		await sound.playAsync();
	}

	React.useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);
	const deleteProduct = async () => {
		await db.collection("products").doc(auth?.currentUser?.uid).delete();
		sound.unloadAsync();
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
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	};
	getProduct();

	return (
		<View style={styles.Screen}>
			<View style={styles.ProductButtons}>
				<TouchableOpacity
					style={styles.UpdateButton}
					onPress={() => navigation.push("Tenth Screen")}
				>
					<Text style={styles.Update}>Güncelle</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.DeleteButton}
					onPressIn={() => playSound()}
					onPressOut={deleteProduct}
				>
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
}

export default Screen8;
