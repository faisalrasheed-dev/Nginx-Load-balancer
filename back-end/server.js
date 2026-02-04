import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const container = process.env.CONTAINER || "Container";

app.get('/', (req, res) => {
    res.send(`Load Balancer Backend | ${container} | Port ${port}`);
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok", container });
});

app.listen(port, () => {
    console.log(`${container} started on port ${port}`);
});
