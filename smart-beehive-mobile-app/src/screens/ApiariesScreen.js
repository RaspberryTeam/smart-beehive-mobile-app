import { Alert, FlatList, View } from "react-native"
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { getApiariesData } from "../api/apiary";

import ApirayCard from "../components/ApiaryCard";
import ApiaryModal from "../modal/ApiaryModal";
import EmptyState from "../components/EmptyState";

const ApiariesScreen = ({ navigation }) => {

    const [apiaries, setApiaries] = useState([]);
    const [loading, setLoading] = useState(true);

    const getApiaries = async () => {
        try {
            const response = await getApiariesData();
            setApiaries(response);
            setLoading(false);
        } catch (error) {
            Alert.alert("Помилка", error.message);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getApiaries();
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? (
                <View style={{ backgroundColor: '#f8f9fa', padding: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="yellow" />
                    <Text>Loading data...</Text>
                </View>
            ) : apiaries === 0 || apiaries === null ? (
                <EmptyState message={"You have no apiaries yet, add one!"} />
            ) : (
                <View style={{ flex: 1 }}>
                    <ApiaryModal />
                    <FlatList
                        data={apiaries}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ApirayCard
                                apiary={item}
                                onPress={() => navigation.navigate('Beehives', { apiaryId: item.id })}
                            />
                        )}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={getApiaries} />}
                        ontentContainerStyle={{ paddingBottom: 20 }}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

export default ApiariesScreen;