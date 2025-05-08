import { useState } from "react";
import { Alert, ImageBackground, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createApiary } from "../api/apiary";

const ApiaryModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");

    const handleAddNewApiary = async () => {
        const response = await createApiary(name);
        if (response.status === 201) {
            Alert.alert("Success", "Apiary added successfully");
        }
        setModalVisible(false);
        setName("");
    }

    return (


        <View style={styles.container}>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Add new apiary</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <ImageBackground source={require("../images/bg-modal.png")} style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add New Apiary</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Enter apiary name"
                                value={name}
                                onChangeText={setName}
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
                                    onPress={handleAddNewApiary}
                                >
                                    <Text style={styles.actionButtonText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        </View >
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
    modalBackground: {
        width: 328,
        height: 253,
        borderRadius: 16,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: '#865A27',
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
        marginBottom: 20,
    },
    input: {
        width: "80%",
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
        width: "80%",
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


export default ApiaryModal;