import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View, Alert, Button, Touchable, useWindowDimensions } from "react-native";
import { compareByDate } from "../utils/utils";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LineChart } from "react-native-chart-kit";
import { lineCharData } from "../utils/data";

const BeehiveCardInfo = ({ beehiveId }) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const formatDate = format(new Date(), "d MMMM HH:mm", { locale: uk });
    const { width } = useWindowDimensions();

    const location = {
        latitude: 50.4501,
        longitude: 30.5247,
    };

    const fetchData = async () => {
        try {
            // const response = await fetch(`http://10.245.44.60:5000/get_data_by_id/${beehiveId}`);
            const response = await fetch('http://10.245.44.60:5000/get_data');
            if (!response.ok) {
                throw new Error("Помилка отримання даних");
            }
            const result = await response.json();
            const newObj = compareByDate(result);
            setData(newObj);

        } catch (error) {
            Alert.alert("Помилка", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchData();
        const interval = setInterval(() => {
            console.log('Оновлення даних...');
            fetchData();
        }, 600000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Завантаження даних...</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Вулик 1</Text>
                    <Text style={styles.subtitle}>Інформація</Text>
                </View>

                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{formatDate}</Text>
                </View>

                <View style={styles.dataContainer}>
                    {data ? (
                        <View style={styles.grid}>
                            <View style={styles.card}>
                                <Icon name="thermometer-half" size={30} color="#f00" />
                                <Text style={styles.cardValue}>{data.temperature}°C</Text>
                            </View>
                            <View style={styles.card}>
                                <Feather name="droplet" size={30} color="#00f" />
                                <Text style={styles.cardValue}>{data.humidity}%</Text>
                            </View>
                            <View style={styles.card}>
                                <MaterialCommunityIcons name="scale-bathroom" size={30} color="#00f" />
                                <Text style={styles.cardValue}>{data.weight} кг</Text>
                            </View>
                            <View style={styles.card}>
                                <MaterialCommunityIcons name="gauge" size={30} color="#ffa500" />
                                <Text style={styles.cardValue}>{data.pressure} hPa</Text>
                            </View>
                            <View style={styles.card}>
                                <MaterialCommunityIcons name="molecule-co2" size={30} color="#008000" />
                                <Text style={styles.cardValue}>{Number.parseFloat(data.co2_level).toFixed(2)} ppm</Text>
                            </View>
                            <View style={styles.card}>
                                <MaterialCommunityIcons name="weather-rainy" size={30} color="#00f" />
                                <Text style={styles.cardValue}>{Number.parseFloat(data.rain_percentage).toFixed(2)}%</Text>
                            </View>


                        </View>

                    ) : (
                        <Text>Дані не знайдено</Text>
                    )}
                </View>

                <View style={styles.card}>
                    <TouchableOpacity onPress={fetchData}>
                        <Icon name="redo" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
            </View >



            <View>
                <View style={styles.mapContainer}>
                    <MapView
                        style={{ width: width, height: '100%' }}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker coordinate={location} />
                    </MapView>
                </View>

                <View style={styles.chartContainer}>
                    <LineChart
                        data={lineCharData}
                        width={width}
                        height={200}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '6',
                                strokeWidth: '2',
                                stroke: '#ffa726',
                            },
                        }}
                    />
                </View>
            </View>
        </View >

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f9fa",
        padding: 20,
        alignItems: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#581",
        marginTop: 5,
    },
    dateContainer: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "#fff",
        width: "100%",
        padding: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    date: {
        fontSize: 16,
        color: "#555",
    },
    dataContainer: {
        width: "100%",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: "30%",
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: "center",
    },
    cardText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007bff",
    },
    mapContainer: {
        width: '100%',
        height: 300,
        marginTop: 20,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    chartContainer: {
        // width: '100%',
        // marginTop: 20,
        width: '100%',
        marginTop: 20,
        padding: 10,
        height: 220,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,

    },
});


export default BeehiveCardInfo;
