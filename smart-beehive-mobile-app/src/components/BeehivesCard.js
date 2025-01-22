import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { useEffect } from "react";

const BeehivesCard = ({ onPress, beehive }) => {


    useEffect(() => {
        // TODO: Write function to get some details about beehive and show this in card
    })

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.leftSection}>
                    <Image
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/6577/6577974.png',
                        }}
                        style={styles.beehiveIcon}
                    />
                </View>

                <View style={styles.rightSection}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.title}>{beehive.name}</Text>
                            <Text style={styles.date}>{new Date().toLocaleString()}</Text>
                        </View>
                        <TouchableOpacity style={styles.bellIcon}>
                            <Image
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/1182/1182718.png',
                                }}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Icon name="thermometer-half" size={24} color="#f00" />
                            <Text style={styles.infoText}>{beehive.temperature}°C</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Feather name="droplet" size={24} color="#00f" />
                            <Text style={styles.infoText}>{beehive.humidity}%</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Feather name="droplet" size={24} color="#FFA500" />
                            <Text style={styles.infoText}>{beehive.weight} кг</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Ionicons name="battery-full" size={24} color="#0f0" />
                            <Text style={styles.infoText}>100%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftSection: {
        marginRight: 20,
    },
    beehiveIcon: {
        width: 80,
        height: 80,
    },
    rightSection: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    bellIcon: {
        padding: 8,
        backgroundColor: '#eef5ff',
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    infoText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
});

export default BeehivesCard;
