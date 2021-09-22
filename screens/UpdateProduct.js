import React, { useEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	RefreshControl,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db, auth } from "../firebase";

export default function Screen10({ navigation }) {
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [image, setImage] = useState();
	const [image2, setImage2] = useState();
	const [name2, setName2] = useState("");
	const [about2, setAbout2] = useState("");
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

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
	getProduct();

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
			setImage2(result.uri);
		}
	};

	const updateProduct = async () => {
		await db
			.collection("products")
			.doc(auth?.currentUser?.uid)
			.set({
				productName: name2,
				productAbout: about2,
				productPhotoUrl: image2,
				productAdderAuthID: auth?.currentUser?.uid,
			})
			.catch((error) => alert(error));
		navigation.push("Eighth Screen");
	};

	return (
		<View style={styles.Screen}>
			<SafeAreaView>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>
			</SafeAreaView>
			<View style={{ marginTop: "10%" }}></View>
			<TextInput
				style={styles.TextInput2}
				placeholder={name}
				onChangeText={(text2) => setName2(text2)}
			></TextInput>
			<TextInput
				style={styles.TextInput2}
				placeholder={about}
				onChangeText={(text2) => setAbout2(text2)}
			></TextInput>

			<View
				style={{
					alignItems: "center",
				}}
			>
				<TouchableOpacity onPress={pickImage} style={styles.AddPhotoButton}>
					<Text style={styles.Add}>Görsel Seç</Text>
				</TouchableOpacity>

				<Image
					source={{ uri: image }}
					style={{ width: "50%", height: "40%", marginTop: "5%" }}
				/>

				<TouchableOpacity style={styles.AddPhotoButton} onPress={updateProduct}>
					<Text style={styles.Add}>Ürünü Güncelle</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
