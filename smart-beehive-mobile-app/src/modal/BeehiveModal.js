import axios from "axios";
import { useState } from "react"
import { Button, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity, View } from "react-native";

const BeehiveModal = ({ apiaryId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [beehiveKey, setBeehiveKey] = useState("");
    const [beehiveName, setBeehiveName] = useState("");


    const handleAddNewBeehive = async () => {
        try {

            const response = await axios.post('http://localhost:3000/api/beehives/',
                {
                    beehive_key: beehiveKey,
                    apiaryId: apiaryId,
                    name: beehiveName
                }
            );
            setModalVisible(false);
            setBeehiveName("");
            setBeehiveKey("");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Add new beehive</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Beehive</Text>

                        <Text>Enter key</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter key"
                            value={beehiveKey}
                            onChangeText={setBeehiveKey}
                        />

                        <Text>Enter name</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter beehive name"
                            value={beehiveName}
                            onChangeText={setBeehiveName}
                        />

                        <View style={styles.buttonContainer}>
                            <Button title="Add" onPress={handleAddNewBeehive} />
                            <Button
                                title="Cancel"
                                onPress={() => setModalVisible(false)}
                                color="red"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    addButton: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
    },
    addButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});


export default BeehiveModal;
