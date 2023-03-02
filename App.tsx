import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const image = {
	uri: "https://images.unsplash.com/photo-1554256092-96709174126a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
};

import * as Location from "expo-location";

export default function App() {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = "aguarde..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<>
			<ImageBackground source={image} style={styles.imgBackground}>
				<View style={styles.container}>
					<Image
						source={require("./assets/logo_cbmerj.png")}
						style={styles.imgLogo}
					/>
					<StatusBar style="auto" />

					<TextInput
						style={styles.input}
						placeholder="Informe o seu RG"
						placeholderTextColor="#fff"
						textAlign="center"
						keyboardType="numeric"
						maxLength={7}
					/>
					<TextInput
						style={styles.input}
						placeholder="Informe o sua Senha"
						placeholderTextColor="#fff"
						textAlign="center"
						secureTextEntry={true}
						maxLength={10}
					/>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Entrar</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	button: {
		backgroundColor: "#fff",
		width: 300,
		height: 50,
		borderRadius: 5,
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center",
	},

	buttonText: {
		color: "#000",
		fontSize: 16,
		fontWeight: "bold",
	},

	imgBackground: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
	},

	imgLogo: {
		width: 200,
		height: 200,
		marginBottom: 150,
		opacity: 0.5,
	},

	mainText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},

	input: {
		backgroundColor: "#444343",
		color: "#fff",
		width: 300,
		height: 40,
		borderRadius: 5,
		borderColor: "#fff",
		marginTop: 10,
		padding: 10,
		fontSize: 16,
		fontWeight: "bold",
		opacity: 0.7,
	},
});
