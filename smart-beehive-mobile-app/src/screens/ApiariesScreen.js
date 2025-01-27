import ApirayCard from "../components/ApiaryCard";
import axios from "axios";

import { FlatList, View } from "react-native"
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import ApiaryModal from "../modal/ApiaryModal";
import { SafeAreaView } from "react-native";
import EmptyState from "../components/EmptyState";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";

const ApiariesScreen = ({ navigation }) => {

    const [apiaries, setApiaries] = useState([]);
    const [loading, setLoading] = useState(true);

    const getApiaries = async () => {
        try {
            let userId = 1;
            const response = await axios.get(`http://localhost:3000/api/apiarys/${userId}`);
            setApiaries(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
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
            ) : apiaries.length === 0 ? (
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