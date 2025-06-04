exports.handler = async () => {
    return{
        statusCode: 200,
        headers : {
            "Content-Type": "applications/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify([
            {
                id: '1',
                title: 'Réviser React',
                date: '2025-06-04T10:00:00',
            },
            {
                id: '2',
                title: 'Faire les courses',
                date: '2025-06-05T09:30:00',
            }
        ])
    }
}