// import { useContext, useEffect, useState } from "react";
// import { Alert, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { register } from "../api/user";
// import { AuthContext } from "../contexts/AuthContext";

// const Register = ({ navigation }) => {
//     const [phonenumber, setPhonenumber] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const { loginUser, isAuthenticated } = useContext(AuthContext);

//     useEffect(() => {
//         if (isAuthenticated) {
//             navigation.reset({
//                 index: 0,
//                 routes: [{ name: "Home" }],
//             });
//         }
//     }, [isAuthenticated, navigation]);

//     const handleLogin = async () => {
//         const response = await register(phonenumber, password);

//         if (!response.success) {
//             Alert.alert("Error", response.error);
//             return;
//         }

//         const token = response.token;

//         await loginUser(token);
//     };

//     const handleChangeScreen = async () => {
//         console.log("Change screen");
//     };

//     return (
//         <ImageBackground source={require("../images/bg-login.jpg")} style={styles.background}>
//             <View style={styles.container}>
//                 <TextInput style={styles.input}
//                     placeholder="Enter your phone number"
//                     keyboardType="phone-pad"
//                     onChangeText={(phoneNumber) => setPhonenumber(phoneNumber)}
//                 />

//                 <View style={styles.passwordWrapper}>
//                     <TextInput
//                         style={styles.passwordInput}
//                         placeholder="Enter password"
//                         secureTextEntry={!showPassword}
//                         value={password}
//                         onChangeText={setPassword}
//                     />
//                     <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
//                         <Ionicons
//                             name={showPassword ? 'eye-off' : 'eye'}
//                             size={22}
//                             color="#865A27"
//                         />
//                     </TouchableOpacity>
//                 </View>


//                 <View style={{ flexDirection: "row", justifyContent: "center", width: "80%", paddingBottom: 5 }}>
//                     <View style={{ padding: 3, width: "80%", alignItems: "center" }}>
//                         <Pressable onPress={handleLogin} style={styles.button}><Text style={styles.buttonText}>Login</Text></Pressable>
//                     </View>
//                 </View>

//                 <View>
//                     <View>
//                         <Text>Don't have an account?</Text>
//                         <TouchableOpacity title="Register" onPress={handleChangeScreen} style={styles.buttonRegister}>
//                             <Text>Register</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//             </View>
//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         resizeMode: "cover",
//         justifyContent: "center",
//     },
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     input: {
//         width: "68%",
//         padding: 10,
//         borderWidth: 3,
//         borderColor: "#865A27",
//         borderRadius: 8,
//         marginBottom: 10,
//         backgroundColor: "#fff",
//     },
//     button: {
//         width: "80%",
//         backgroundColor: "#865A27",
//         borderWidth: 3,
//         borderColor: "#FFFFFF",
//         padding: 10,
//         borderRadius: 5,
//         alignItems: "center",
//     },
//     buttonRegister: {
//         color: "#000",
//         padding: 10,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     beeTop: {
//         position: "absolute",
//         top: 50,
//         right: 30,
//         width: 220,
//         height: 180,
//         resizeMode: "contain",
//     },
//     trackTop: {
//         position: "absolute",
//         top: 100,
//         right: 60,
//         width: 290,
//         height: 210,
//         resizeMode: "contain",
//     },
//     beeBottom: {
//         position: "absolute",
//         bottom: 50,
//         left: 30,
//         width: 240,
//         height: 200,
//         resizeMode: "contain",
//         transform: [{ scaleX: -1 }]
//     },
//     trackBottom: {
//         position: "absolute",
//         bottom: 100,
//         left: 50,
//         width: 120,
//         height: 80,
//         resizeMode: "contain",
//         transform: [{ scaleX: -1 }]
//     },
//     passwordWrapper: {
//         width: "68%",
//         flexDirection: "row",
//         alignItems: "center",
//         borderWidth: 3,
//         borderColor: "#865A27",
//         borderRadius: 8,
//         marginBottom: 10,
//         backgroundColor: "#fff",
//         paddingRight: 10,
//     },
//     passwordInput: {
//         flex: 1,
//         padding: 10,
//     },
//     eyeIcon: {
//         paddingHorizontal: 4,
//     },

// });

// export default Register;





import { useContext, useEffect, useState } from "react";
import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { register } from "../api/user";
import { AuthContext } from "../contexts/AuthContext";

const Register = ({ navigation, switchToLogin }) => {
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        }
    }, [isAuthenticated, navigation]);

    const handleRegister = async () => {
        if (!phonenumber || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        const response = await register(phonenumber, password);

        if (!response.success) {
            Alert.alert("Error", response.error);
            return;
        }

        await loginUser(response.token);
    };

    return (
        <ImageBackground source={require("../images/bg-login.jpg")} style={styles.background}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={60}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                        value={phonenumber}
                        onChangeText={setPhonenumber}
                    />

                    <View style={styles.passwordWrapper}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#865A27" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.passwordWrapper}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm password"
                            secureTextEntry={!showPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#865A27" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleRegister} style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 8 }}>
                        <Text>Already have an account?</Text>
                    </View>

                    <View style={{ alignItems: "center", marginTop: 15 }}>
                        <View style={styles.buttonRegisterContainer}>
                            <TouchableOpacity onPress={switchToLogin} style={styles.buttonRegister}>
                                <Text>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30,
    },
    input: {
        width: "68%",
        padding: 10,
        borderWidth: 3,
        borderColor: "#865A27",
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    passwordWrapper: {
        width: "68%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#865A27",
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "#fff",
        paddingRight: 10,
    },
    passwordInput: {
        flex: 1,
        padding: 10,
    },
    eyeIcon: {
        paddingHorizontal: 4,
    },
    button: {
        width: "80%",
        backgroundColor: "#865A27",
        borderWidth: 3,
        borderColor: "#FFFFFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        width: "80%",
        alignItems: "center",
    },
    buttonRegisterContainer: {
        borderRadius: 10,
        borderColor: '#865A27',
        borderWidth: 1.5,
    },
    buttonRegister: {
        padding: 10,
    },
});

export default Register;
