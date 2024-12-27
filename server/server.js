import './config/instrument.js';
import * as Sentry from "@sentry/node" 
import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connetDB from './config/db.js';
import { ClerkWebHooks } from './controller/webhooks.js';

//app config 
const app = express()
const PORT = process.env.PORT || 3000

// DB connection 
connetDB()

// Middleware
app.use(cors())
app.use(express.json())

// Route
app.get('/',(req, res) => res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
app.post('/webhooks', ClerkWebHooks)

//sentry
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,() => {
    console.log(`server started on http://localhost:${PORT}`)
})