import { FlatList, View } from "react-native"
import BeehivesCard from "../components/BeehivesCard";
import { useEffect, useState } from "react";


const BeehivesScreen = ({ navigation }) => {
    const [beehives, setBehives] = useState([]);
    const [loading, setLoading] = useState(true);

    const hives = [
        {
            id: 1,
            name: "Вулик 1",
            temperature: 24.2,
            humidity: 67,
            weight: 21.9,
            pressure: 1013,
            co2_level: 415.67,
            rain_percentage: 15.3,
        },
        {
            id: 2,
            name: "Вулик 2",
            temperature: 25.0,
            humidity: 65,
            weight: 22.5,
            pressure: 1015,
            co2_level: 420.12,
            rain_percentage: 12.7,
        },
        {
            id: 3,
            name: "Вулик 3",
            temperature: 23.8,
            humidity: 70,
            weight: 20.3,
            pressure: 1010,
            co2_level: 410.45,
            rain_percentage: 18.2,
        },
        {
            id: 4,
            name: "Вулик 4",
            temperature: 26.1,
            humidity: 68,
            weight: 19.8,
            pressure: 1012,
            co2_level: 418.23,
            rain_percentage: 10.0,
        },
        {
            id: 5,
            name: "Вулик 5",
            temperature: 24.7,
            humidity: 72,
            weight: 23.1,
            pressure: 1014,
            co2_level: 412.89,
            rain_percentage: 14.5,
        },
        {
            id: 6,
            name: "Вулик 6",
            temperature: 22.9,
            humidity: 66,
            weight: 20.7,
            pressure: 1011,
            co2_level: 417.56,
            rain_percentage: 16.8,
        },
        {
            id: 7,
            name: "Вулик 7",
            temperature: 25.4,
            humidity: 69,
            weight: 22.8,
            pressure: 1016,
            co2_level: 419.78,
            rain_percentage: 11.3,
        },
        {
            id: 8,
            name: "Вулик 8",
            temperature: 23.5,
            humidity: 71,
            weight: 21.4,
            pressure: 1010,
            co2_level: 414.34,
            rain_percentage: 17.6,
        },
    ];


    const fetchData = async () => {
        try {
            const response = await fetch("http://10.245.44.60:5000/get_beehive");
            if (!response.ok) {
                throw new Error("Помилка отримання даних");
            }
            const result = await response.json();
            // setBehives(result);
            result[0].name = "Вулик 9";
            hives.push(result[0]);
            setBehives(hives);
            console.log(beehives);

        } catch (error) {
            Alert.alert("Помилка", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <View>
            <FlatList
                // data={hives}
                data={beehives}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BeehivesCard
                        onPress={() => navigation.navigate('Hive', { beehiveId: item.id })}
                        beehive={item}
                    />
                )}
            />

        </View>
    )
}

export default BeehivesScreen;