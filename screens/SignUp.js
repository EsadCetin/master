import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase";
import styles from "./styles";

function Screen5({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [photoUrl, setPhotoUrl] = useState();
	const [sellerName, setSellerName] = useState("");

	const createUser = async () => {
		await db
			.collection("users")
			.doc(auth?.currentUser?.uid)
			.set({
				userEmail: email,
				userPhotoUrl: photoUrl,
				userName: sellerName,
			})
			.catch((error) => alert(error));
		navigation.navigate("Sixth Screen");
	};

	const register = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: email,
				});
			})
			.then(() => {
				createUser();
			})
			.catch((error) => alert(error.message));
	};

	return (
		<View style={styles.Screen}>
			<Text style={styles.Text1}>torba</Text>
			<TextInput
				style={styles.TextInput}
				placeholder={"Mail"}
				value={email}
				onChangeText={(text) => setEmail(text)}
				keyboardType="email-address"
			></TextInput>
			<TextInput
				style={styles.TextInput}
				placeholder={"Şifre"}
				value={password}
				onChangeText={(text) => setPassword(text)}
				secureTextEntry={true}
			></TextInput>
			<TextInput
				style={styles.TextInput}
				placeholder={"Satıcı Adı"}
				value={sellerName}
				onChangeText={(text) => setSellerName(text)}
			></TextInput>
			<TextInput
				style={styles.TextInput}
				placeholder={"Fotoğraf"}
				value={photoUrl}
				onChangeText={(text) => setPhotoUrl(text)}
			></TextInput>
			<View style={styles.AddButtonView}>
				<TouchableOpacity onPress={register} style={styles.AddButton}>
					<Text style={styles.Add}>Kayıt Ol</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Screen5;
