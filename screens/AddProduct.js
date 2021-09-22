import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db, auth } from "../firebase";

export default function Screen7({ navigation }) {
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [image, setImage] = useState("https://i.hizliresim.com/m6abdym.jpg");
	const [price, setPrice] = useState("");
	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== "granted") {
					alert("Üzgünüz, fotoğraflarına erişmemize izin vermen gerekiyor!");
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [3, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const createProduct = async () => {
		await db
			.collection("products")
			.doc()
			.set({
				productName: name,
				productAbout: about,
				productPhotoUrl: image,
				productAdderAuthID: auth?.currentUser?.uid,
				productPrice: price,
			})
			.catch((error) => alert(error));
		navigation.navigate("Eighth Screen");
	};

	return (
		<View style={styles.Screen}>
			<View style={{ marginTop: "10%" }}>
				<TextInput
					style={styles.TextInput2}
					placeholder={"Ürün Adı"}
					value={name}
					onChangeText={(text) => setName(text)}
				></TextInput>
				<TextInput
					style={styles.TextInput2}
					placeholder={"Açıklaması"}
					value={about}
					onChangeText={(text) => setAbout(text)}
				></TextInput>
				<TextInput
					style={styles.TextInput2}
					placeholder={"Fiyatı"}
					value={price}
					onChangeText={(text) => setPrice(text)}
				></TextInput>
			</View>
			<View
				style={{
					alignItems: "center",
				}}
			>
				<TouchableOpacity onPress={pickImage} style={styles.AddPhotoButton}>
					<Text style={styles.Add}>Görsel Seç</Text>
				</TouchableOpacity>
				{image && (
					<Image
						source={{ uri: image }}
						style={{ width: "50%", height: "40%", marginTop: "5%" }}
					/>
				)}
				<TouchableOpacity style={styles.AddPhotoButton} onPress={createProduct}>
					<Text style={styles.Add}>Ürün Ekle</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
