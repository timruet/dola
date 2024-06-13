import { chatGPTCall } from './chatGPTAPI.js';
import { findByIdGerman, findByIdEnglish, getTableByDomain } from './util.js';
import express from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { getTable, addUser, getUser } from './database.js'
import cors from 'cors';
import session from 'express-session';
import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import { ok } from 'assert';
import { initPassport } from './auth.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'dola',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
initPassport(app);


app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
});

// app.get('/home', function(request, response) {
// 	// If the user is loggedin
// 	if (request.session.loggedin) {
// 		// Output username
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		// Not logged in
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

app.post('/api/login', passport.authenticate('local', { failureRedirect: 'http://localhost:3000/home' }),
  async function (req, res) {
    // Capture the input fields
    if(req.user){
      res.sendStatus(200);
    }
  });
// Ensure the input fields exists and are not empty
// 	if (userdata.email && userdata.password) {
// 		// Execute SQL query that'll select the account from the database based on the specified email and password
// 		const result = await getUser(userdata);
// 		if (result.length > 0) {
// 			// Authenticate the user
// 			request.session.loggedin = true;
// 			request.session.email = email;
// 			// Redirect to profile page
// 			response.redirect('/profile');
// 		} else {
// 			response.send('Incorrect email and/or Password!');
// 		}			
// 		response.end();
//   } else {
// 		response.send('Please enter email and Password!');
// 		response.end();
// 	}
// });


app.post('/api/register', function (request, response) {
  // addUser(request.body);
  // request.session.loggedin = true;
  // response.end();
})

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