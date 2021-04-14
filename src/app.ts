import express from 'express';
import 'reflect-metadata';
import './database/connection';

const app = express();
const port = process.env.PORT || '8080';

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
