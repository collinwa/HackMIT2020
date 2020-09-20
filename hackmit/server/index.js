const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { MongoClient } = require('mongodb');
const { allToken, chatToken, videoToken, voiceToken } = require('./tokens');
const { updateUser, insertUser, retrieveUser } = require('../src/components/querydb');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/insert', (req, res) => {
  const identity = req.body.identity;
  const data = insertUser(identity, 10);
  res.set('Content-Type', 'application/json');
  res.send(data);
});

app.post('/update', (req, res) => {
  const identity = req.body.identity;
  const data = updateUser(identity, 10);
  res.set('Content-Type', 'application/json');
  res.send(data);
});

app.post('/retrieve', (req, res) => {
  const identity = req.body.identity;
  const data = retrieveUser(identity);
  res.set('Content-Type', 'application/json');
  res.send(data);
});

app.get('/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = allToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.post('/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = allToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.get('/chat/token', (req, res) => {
  const identity = req.query.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
});

app.post('/chat/token', (req, res) => {
  const identity = req.body.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
});

app.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.get('/voice/token', (req, res) => {
  const identity = req.body.identity;
  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
});

app.post('/voice/token', (req, res) => {
  const identity = req.body.identity;
  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
