export const lineCharData = {
    labels: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00'],
    datasets: [
        {
            data: [13, 15, 17, 19, 18, 20],  
            strokeWidth: 10,
            color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`,
        }
    ],
}