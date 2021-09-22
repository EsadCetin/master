import { Text, View } from "react-native";
import styles from "./styles";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

function Screen4() {
	const [text, setText] = useState("");

	return (
		<View style={styles.Screen}>
			<TextInput
				placeholder="Buraya yazın"
				onChangeText={(text) => setText(text)}
				style={{ backgroundColor: "red", marginTop: 50, height: 50 }}
			/>
			<Text style={{ backgroundColor: "red", marginTop: 50, height: 50 }}>
				{text}
			</Text>
		</View>
	);
}

export default Screen4;
