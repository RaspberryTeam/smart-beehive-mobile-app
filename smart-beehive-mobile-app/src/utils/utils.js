export const compareByDate = (twoLastEntries) => {
    const sortedTwoLastEntries = twoLastEntries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return sortedTwoLastEntries[0];
}