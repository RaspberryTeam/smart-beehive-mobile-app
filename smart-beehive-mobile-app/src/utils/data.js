import { format } from "date-fns"

export const formatDataset = (data) => {

    if (!data) {
        return { labels: [], datasets: [{ data: [] }] };
    }


    const labels = data.map((date) => {
        return format(new Date(date.createdAt), "HH:mm");
    }).reverse();

    const temperature = data.map((item) => item.temperature);

    return {
        labels: labels,
        datasets: [
            {
                data: temperature,
                strokeWidth: 10,
                color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`,
            }
        ]
    };
}