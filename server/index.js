import express from 'express';
const app = express();
import cors from 'cors';
const port = process.env.port || 5150;
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config({});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption = {
    origin: `http://localhost:${port}`,
    credentials: true,
}
app.use(cors());








app.listen(port, () => {
    console.log(`server running on port ${port}`);
})