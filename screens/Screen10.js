import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db, auth } from "../firebase";

export default function Screen10({ navigation }) {
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
	const [about, setAbout] = useState("");
	const [image, setImage] = useState("productPhotoUrl");
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
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const updateProduct = async () => {
		await db
			.collection("products")
			.doc(auth?.currentUser?.uid)
			.update({
				productName: name,
				productAbout: about,
				productPhotoUrl: image,
				productAdderAuthID: auth?.currentUser?.uid,
			})
			.catch((error) => alert(error));
		navigation.navigate("Eighth Screen");
	};

	return (
		<View style={styles.Screen}>
			<TextInput
				style={styles.TextInput2}
				placeholder={name}
				value={name}
				onChangeText={(text) => setName(text)}
			></TextInput>
			<TextInput
				style={styles.TextInput2}
				placeholder={about}
				value={about}
				onChangeText={(text) => setAbout(text)}
			></TextInput>

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
				<TouchableOpacity style={styles.AddPhotoButton} onPress={updateProduct}>
					<Text style={styles.Add}>Ürünü Güncelle</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
