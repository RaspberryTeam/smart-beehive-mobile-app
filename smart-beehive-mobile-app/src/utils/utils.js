import { jwtDecode } from "jwt-decode";

export const compareByDate = (twoLastEntries) => {
    const sortedTwoLastEntries = twoLastEntries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return sortedTwoLastEntries[0];
};

export const isTokenExpires = (token) => {
    if (!token) return true;
    try {
        const { exp } = jwtDecode(token);
        return exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};