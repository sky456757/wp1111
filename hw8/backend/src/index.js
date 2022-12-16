import server from './server'
/*
import http from 'http'
import express from 'express'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import WebSocket from 'ws'
*/
import mongo from './mongo'
/*
import wsConnect from './wsConnect'
import Message from './models/message.js';
import{v4 as uuidv4} from 'uuid'
*/
mongo.connect();
/*
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection
db.once('open', () => 
{
    console.log("MongoDB connected!"); 
    wss.on('connection', (ws) => 
    {
        //ws.id = uuidv4()
        //ws.box = '';
        //wsConnect.initData(ws);
        ws.onmessage = wsConnect.onMessage(wss,ws);
        //console.log('bind')
    });
});
*/
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
