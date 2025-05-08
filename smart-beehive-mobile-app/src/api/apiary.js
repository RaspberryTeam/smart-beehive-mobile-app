import api from "./config"

export const createApiary = async (name) => {
    try {
        const response = await api.post('/api/apiaries',
            {
                name: name
            }
        );

        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export const getApiariesData = async () => {
    try {
        const response = await api.get('/api/apiaries');
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const getApiaryDetails = async (apiaryId) => {
    try {
        const response = await api.get(`/api/apiaries/${apiaryId}`);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};