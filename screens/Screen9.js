import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

export default function Screen9({ navigation }) {
	return (
		<View style={styles.Screen}>
			<Image
				style={{
					width: 300,
					height: 300,
					alignSelf: "center",
					marginTop: "50%",
				}}
				source={{
					uri: "https://www.seekpng.com/png/full/236-2363135_detail-check-comments-twitter-logo-black-png.png",
				}}
			/>
			<Text style={styles.Success}>Ürün Silme İşlemi Başarılı</Text>
			<TouchableOpacity
				style={styles.BackButton}
				onPress={() => navigation.navigate("Seventh Screen")}
			>
				<Text>Ürün Ekleme Ekranına Dön</Text>
			</TouchableOpacity>
		</View>
	);
}
