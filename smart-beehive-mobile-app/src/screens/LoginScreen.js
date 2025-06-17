import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import Login from "../components/Login";

const LoginScreen = () => {
    return (
        <View>
            <Login />
        </View>
    );
};

export default LoginScreen;
