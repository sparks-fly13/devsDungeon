import express from "express"
import 'dotenv/config'
import { connectDB } from "./db/db.js";
import { app } from "./App.js";

const Port=process.env.Port || 3000;

connectDB();

app.listen(Port, () => {
    console.log(`The app start on http://localhost:${Port}`);
});