import React from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import styles from "./styles";
import { DATA } from "../data/const";

const Item = ({ title }) => (
	<View style={styles.item}>
		<Text style={styles.title}>{title}</Text>
	</View>
);

const Screen2 = () => {
	const renderItem = ({ item }) => <Item title={item.title} />;

	return (
		<SafeAreaView style={styles.Screen}>
			<View style={styles.TopBar}>
				<Text style={styles.BarText}>////////////</Text>
			</View>
			<FlatList data={DATA} renderItem={renderItem} />
		</SafeAreaView>
	);
};

export default Screen2;
