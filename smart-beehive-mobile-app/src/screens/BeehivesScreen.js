import BeehivesCard from "../components/BeehivesCard";

import { FlatList, View } from "react-native"
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { RefreshControl } from "react-native";
import { Text } from "react-native";
import BeehiveModal from "../modal/BeehiveModal";
import { SafeAreaView } from "react-native";
import EmptyState from "../components/EmptyState";
import { ActivityIndicator } from "react-native";
import api from "../api/config";
import { getApiaryDetails } from "../api/apiary";

const BeehivesScreen = ({ navigation }) => {
    const [beehives, setBehives] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();

    const { apiaryId } = route.params;

    const fetchData = async () => {
        try {
            const response = await api.get(`/api/apiaries/${apiaryId}`);
            const result = response.data;
            result.beehives.sort((a, b) => a.id - b.id);
            setBehives(result);
        } catch (error) {
            Alert.alert("Помилка", error.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? (
                <View style={{ padding: 20, alignItems: "center" }}>
                    <ActivityIndicator size="large" color="yellow" />
                    <Text>Loading data...</Text>
                </View>
            ) : beehives === undefined ? (
                <View>
                    <EmptyState message={"You have no hives yet, add one!"} />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <BeehiveModal apiaryId={apiaryId} />
                    <FlatList
                        data={beehives.beehives}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <BeehivesCard
                                onPress={() => navigation.navigate('Hive', { beehiveId: item.id })}
                                beehive={item}
                            />
                        )}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </View>
            )}

        </SafeAreaView>
    )
}

export default BeehivesScreen;