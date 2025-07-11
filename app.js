import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: ["http://192.168.174.246:3000", "http://localhost:3000", "http://localhost:8080", "http://192.168.174.246:8080" ,"*"]}));

const API_KEY = process.env.GEMINI_API_KEY;

app.get('/', (req, res) => {
    res.send("Ok");    
})

app.post('/generate', async(req, res) => {
    const UserData = req.body;
    const AI = new GoogleGenAI({apiKey: API_KEY});

    const response = await AI.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: UserData.message,
    });

    return res.json({
        message: response.text
    });
})

app.listen(8080,() => {
    console.log("Server is Running......")
});

