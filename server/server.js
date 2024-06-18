import { chatGPTCall } from './chatGPTAPI.js';
import { findByIdGerman, findByIdEnglish, getTableByDomain } from './util.js';
import express from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { getTable, addUser, getUser, addUserDomains, createUserDomains, getUserDomains, deleteUserDomains, setVocabulary } from './database.js'
import cors from 'cors';
import session from 'express-session';
import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import { ok } from 'assert';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(session({
  name: 'auth',
  secret: 'dola',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false}
}));


app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'localhost:3000');
  // res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
});


app.post('/api/login', async function(req, res){
  const userdata = {email: req.body.email, password: req.body.password};
  let user = await getUser(userdata);
  user = user.rows[0];
  if(user.email == userdata.email && user.password == userdata.password){
    req.session.user = user;
    req.session.isLoggedIn = true;
    res.json(user);
  }
  else{
    res.json({});
  }
})

app.post('/api/auth', async function(req, res){
  if (req.session.isLoggedIn){
    res.json({user: req.session.user, isAuthenticated: req.session.isLoggedIn});
  }
  else{
    res.json({user: null, isAuthenticated: false});
  }
})

app.post('/api/logout', function (req, res) {
  req.session.destroy();
  res.sendStatus(200);
});



app.post('/api/register', async function (req, res) {
  const userdata = { email: req.body.email, password: req.body.password };
  if (getUser(userdata).rowCount > 0) {
    res.status = 200;
    res.json('Email already in use');
  }
  else {
    const user = await addUser(userdata);
    if(user){
      res.status(201).send(user.rows[0]);
    }  
  };
});

app.post('/api/setVocabulary', async function (req, res) {
  const userid = req.body.userid;
  const domain = req.body.domain;
  const input_text = `Create a vocabulary list with the most important words for the domain of ${domain}. The list should be in JSON and each entry should contain the english word and the german translation. The list should contain exactly 50 words and no duplicates. German nouns should start with an uppercase letter. An example of such a list for the domain of Computer Science would be [{english: "computer", german: "Computer},{english: "algorithm", german: "Algorithmus"}].`;
  const completion_text = await chatGPTCall(input_text);
  const completion = JSON.parse(completion_text);
  const vocab = await setVocabulary(userid, domain, completion);
  res.json(vocab);
  });

app.post('/api/addUserDomains', async function (req, res) {
  const userid = req.body.userid;
  const domain = req.body.domain;
  const query = await addUserDomains(userid, domain);
  if(query.rowCount > 0){
    let domainsList = [];
    query.rows.map((domain) => {
      domainsList.push(domain.domains);});
    res.json(domainsList);
  }
  else {
    res.send(false);
  }
});

app.post('/api/deleteUserDomains', async function (req, res) {
  const userid = req.body.userid;
  const domain = req.body.domain;
  const query = await deleteUserDomains(userid, domain);
  if(query != null){
    let domainsList = [];
    query.rows.map((domain) => {
      domainsList.push(domain.domains);});
    res.json(domainsList);
  }
  else {
    res.send(false);
  }
});

app.post('/api/createUserDomains', async function (req, res) {
  const id = req.body.userid;
  const query = await createUserDomains(id);
  if(query){
    res.json(query);
  }
  else {
    res.send(false);
  }
});

app.post('/api/getUserDomains', async function (req, res) {
  const userid = req.body.userid;
  const query = await getUserDomains(userid);
  if(query.rowCount > 1){
    let domainsList = [];
    query.rows.map((domain) => {
      domainsList.push(domain.domains);});
    res.json(domainsList);
  }
  else {
    res.send(false);
  }
});

app.get('/api/table', async (req, res) => {
  const domain = req.query.domain;
  const data = await getTableByDomain(domain);
  res.json(data);
});



app.get('/api/example', async (req, res) => {
  const vocabID = req.query.id;
  const domain = req.query.domain;
  const vocab = await findByIdGerman(domain, vocabID);
  console.log(vocab);
  const completion_text = await chatGPTCall(`Gib mir einen Satz der das Wort ${vocab} enthält`);
  res.json({ example: completion_text });
});


app.get('/api/quizz', async (req, res) => {
  const domain = req.query.domain;
  const vocabID = req.query.id;
  const vocabGerman = await findByIdGerman(domain, vocabID);
  const vocabEnglish = await findByIdEnglish(domain, vocabID);
  res.json({ german: vocabGerman, english: vocabEnglish });
});



/*app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
 });*/

const port = process.env.PORT || 8000;
app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});