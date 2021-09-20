import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles.js";
import { FontAwesome } from "@expo/vector-icons";

function SignUpScreen({ navigation }) {
	return (
		<View style={styles.Screen}>
			<Text style={styles.Text1}>torba</Text>
			<Text style={styles.Text2}>torbada fırsat var</Text>
			<View
				style={[
					{
						marginTop: "15%",
						marginLeft: "15%",
						marginRight: "15%",
						height: "8%",
					},
				]}
			>
				<TouchableOpacity
					onPress={() => navigation.navigate("Fifth Screen")}
					style={styles.Button}
				>
					<Text
						style={[
							{
								fontFamily: "Poppins_400Regular",
								color: "#fff",
								fontSize: 18,
								marginTop: "7%",
							},
						]}
					>
						Kaydol
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={[
					{ marginTop: "4%", flexDirection: "row", justifyContent: "center" },
				]}
			>
				<Text style={styles.Text3}>Zaten bir hesabın var mı? </Text>
				<TouchableOpacity onPress={() => navigation.navigate("Second Screen")}>
					<Text style={styles.SignInText}>Giriş Yap!</Text>
				</TouchableOpacity>
			</View>
			<View
				style={[
					{
						marginTop: "15%",
						marginLeft: "15%",
						marginRight: "15%",
						height: "8%",
					},
				]}
			>
				<TouchableOpacity
					onPress={() => navigation.navigate("Fourth Screen")}
					style={styles.Facebook}
				>
					<FontAwesome
						name="facebook"
						size={35}
						color="white"
						style={styles.FacebookIcon}
					/>
					<Text style={styles.FacebookText}>Facebook ile giriş yap</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("Third Screen")}
					style={styles.Google}
				>
					<FontAwesome
						name="google"
						size={35}
						color="#EA4335"
						style={styles.GoogleIcon}
					/>
					<Text style={styles.GoogleText}>Google ile giriş yap</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.Apple}>
					<FontAwesome
						name="apple"
						size={35}
						color="white"
						style={styles.AppleIcon}
					/>
					<Text style={styles.AppleText}>Apple ile giriş yap</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.Text4}>Sosyal medyada Torba</Text>
			<View
				style={[
					{
						marginLeft: "30%",
						width: "40%",
						justifyContent: "center",
						flexDirection: "row",
					},
				]}
			>
				<FontAwesome
					name="twitter"
					size={32}
					color="#55ACEE"
					style={styles.TwitterIcon}
				/>
				<FontAwesome
					name="instagram"
					size={30}
					color="white"
					style={styles.InstagramIcon}
				/>
			</View>
		</View>
	);
}

export default SignUpScreen;
