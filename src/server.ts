import express from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Hello GoStack' });
});

app.listen(3333, () => {
    console.log('🚀 Server Started: http://localhost:3333');
});
