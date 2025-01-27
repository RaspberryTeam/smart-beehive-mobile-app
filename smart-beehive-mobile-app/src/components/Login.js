const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");



    return (
        <View>
            <Text>Enter your phone number</Text>
            <TextInput
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />

            <Text>Enter password</Text>
            <TextInput
                placeholder="Enter password"
                onChangeText={(password) => setPassword(password)}
            />
        </View>
    );
};

export default Login;