import { useState } from "react";
import {
    Alert,
    ImageBackground,
    TextInput,
    StyleSheet,
    Text,
    Modal,
    TouchableOpacity,
    View,
} from "react-native";
import { createBeehive } from "../api/beehive";

const BeehiveModal = ({ apiaryId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [beehiveKey, setBeehiveKey] = useState("");
    const [beehiveName, setBeehiveName] = useState("");

    const handleAddNewBeehive = async () => {
        try {
            const response = await createBeehive(beehiveKey, apiaryId, beehiveName);
            setModalVisible(false);
            setBeehiveKey("");
            setBeehiveName("");

            if (response.status === 201) {
                Alert.alert("Success", "Beehive added successfully");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

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
                    <View style={styles.modalWrapper}>
                        <ImageBackground
                            source={require("../images/bg-modal.png")}
                            style={styles.modalBackground}
                            imageStyle={styles.modalImage}
                        >
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Add New Beehive</Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter key"
                                    value={beehiveKey}
                                    onChangeText={setBeehiveKey}
                                    placeholderTextColor="#865A27"
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter beehive name"
                                    value={beehiveName}
                                    onChangeText={setBeehiveName}
                                    placeholderTextColor="#865A27"
                                />

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.actionButtonText}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={handleAddNewBeehive}
                                    >
                                        <Text style={styles.actionButtonText}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </Modal>
        </View>
    );
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
    modalWrapper: {
        width: 328,
        height: 285,
        borderRadius: 16,
        overflow: "hidden",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalImage: {
        resizeMode: "cover",
    },
    modalContent: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 20,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#865A27",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        backgroundColor: "#FFF1C8",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderColor: "#865A27",
        borderWidth: 1.5,
        color: "#865A27",
        fontWeight: "600",
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: "#865A27",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    cancelButton: {
        backgroundColor: "#A55B2A",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    actionButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
});

export default BeehiveModal;
