import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native"

const EmptyState = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text} >{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
});

export default EmptyState;