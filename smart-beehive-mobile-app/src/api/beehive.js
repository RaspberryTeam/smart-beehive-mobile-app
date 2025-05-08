import api from "./config";

export const createBeehive = async (beehiveKey, apiaryId, beehiveName) => {
    const response = await api.post('/api/beehives', {
        beehive_key: beehiveKey,
        apiaryId: apiaryId,
        name: beehiveName
    });
    return response;
};