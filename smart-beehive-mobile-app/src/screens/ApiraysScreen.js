import { FlatList, View } from "react-native"
import ApirayCard from "../components/ApirayCard";
import { useState } from "react";

const ApiraysScreen = ({ navigation }) => {
    const apiaries = [
        { id: '1', name: 'Пасіка 1', location: 'Село Веселе' },
        { id: '2', name: 'Пасіка 2', location: 'Місто Радісне' },
        { id: '3', name: 'Пасіка 3', location: 'Місто Радісне' },
        { id: '4', name: 'Пасіка 3', location: 'Місто Радісне' },
        { id: '5', name: 'Пасіка 4', location: 'Місто Радісне' },
        { id: '6', name: 'Пасіка 5', location: 'Місто Радісне' },
        { id: '7', name: 'Пасіка 6', location: 'Місто Радісне' },
        { id: '8', name: 'Пасіка 7', location: 'Місто Радісне' },
    ];

    // const [apiaries, setApiaries] = useState([]);

    return (
        <View>
            <FlatList
                data={apiaries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ApirayCard
                        apiary={item}
                        onPress={() => navigation.navigate('Beehives', { apiaryId: item.id })}
                    />
                )}
            />
        </View>
    )
}

export default ApiraysScreen;