import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";

function Screen3() {
	const [icon, setIcon] = useState(true);
	const changeIcon = () => setIcon(!icon);

	const [backgroundColor1, setbackgroundColor1] = useState("white");
	const [backgroundColor2, setbackgroundColor2] = useState("white");
	const [disabled1, setDisabled1] = useState(false);
	const [disabled2, setDisabled2] = useState(false);

	const onPress1 = () => {
		setDisabled2(false);
		disabled1 == false ? setDisabled1(true) : setDisabled1(false);
		setbackgroundColor2("white");
		backgroundColor1 == "white"
			? setbackgroundColor1("yellow")
			: setbackgroundColor1("white");
	};
	const onPress2 = () => {
		setDisabled1(false);
		disabled2 == false ? setDisabled2(true) : setDisabled2(false);
		setbackgroundColor1("white");
		backgroundColor2 == "white"
			? setbackgroundColor2("yellow")
			: setbackgroundColor2("white");
	};

	return (
		<View style={styles.Screen}>
			<View style={styles.LockButton}>
				<TouchableOpacity onPress={changeIcon}>
					<FontAwesome
						name={icon ? "lock" : "unlock"}
						size={150}
						color="white"
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.ChangeButtonView}>
				<TouchableOpacity
					onPress={onPress1}
					disabled={disabled1}
					style={{
						justifyContent: "center",
						alignItems: "center",
						borderWidth: 1,
						flex: 1,
						minWidth: "35%",
						backgroundColor: backgroundColor1,
					}}
				>
					<Text style={{ fontSize: 40 }}>1</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={onPress2}
					disabled={disabled2}
					style={{
						justifyContent: "center",
						alignItems: "center",
						borderWidth: 1,
						flex: 1,
						minWidth: "35%",
						backgroundColor: backgroundColor2,
					}}
				>
					<Text style={{ fontSize: 40 }}>2</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
export default Screen3;
