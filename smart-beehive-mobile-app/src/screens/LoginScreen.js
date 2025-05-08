import { useState } from "react";
import { View } from "react-native";
import Login from "../components/Login";
import Register from "../components/Register";

const LoginScreen = () => {
    const [screen, setScreen] = useState("login");

    return (
        <View style={{ flex: 1 }}>
            {screen === "login" ? (
                <Login switchToRegister={() => setScreen("register")} />
            ) : (
                <Register switchToLogin={() => setScreen("login")} />
            )}
        </View>
    );
};

export default LoginScreen;
